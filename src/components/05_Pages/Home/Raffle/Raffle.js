import React, { useState, useContext } from 'react';
import { ScrollView, View, Text, Image, Animated, TouchableOpacity } from 'react-native'
import { utilities, fonts, colors } from '../../../../settings/all_settings';
import styles from './Raffle.styling';
import BottomNav from '../../../02_Molecules/BottomNav/BottomNav'
import ProgressBar from '../../../02_Molecules/ProgressBar/ProgressBar'
import HostedBy from '../../../02_Molecules/HostedBy/HostedBy'
import Top5Donors from '../../../02_Molecules/Top5Donors/Top5Donors'
import DropDown from '../../../01_Atoms/DropDown/DropDown'
import ImageCarousel from '../../../02_Molecules/ImageCarousel/ImageCarousel'
import BlockButton from '../../../01_Atoms/Buttons/BlockButton/BlockButton';
import BuyOptions from '../../../02_Molecules/BuyOptions/BuyOptions'
import CountDown from '../../../01_Atoms/Countdown/Countdown'
import SlidingSheet from '../../../04_Templates/SlidingSheet/SlidingSheet';
import SizeCarousel from '../../../01_Atoms/SizeCarousel/SizeCarousel'
import { unix_to_date, is_expired } from '../../../../functions/convert_dates';
import { top5_raffle } from '../../../../functions/explore_functions';
import GlobalState from '../../../globalState';

export default function Raffle({ navigation, route }) {
    const {user, setUser} = useContext(GlobalState)
    // get host of raffle from db
    const [top5, setTop5] = useState([])
    const ip = require('../../../IP_ADDRESS.json');

    React.useEffect(() => {
        async function getTop5(ids) {
            // get top 5 donors of this raffle
            let temp = []
            for (var i = 0; i < ids.length; i++) {
                const user = await getUser(ids[i].userID)
                temp.push(user)
            }
            setTop5(temp)
        }
        getTop5(route.params.top5)
    }, [])

    async function getUser(id) {
        let response = await fetch('http://' + ip.ipAddress + '/user/id/' + id)
        response = await response.json()
        return response
    }

    const addFollower = async (host) => {
        if (user.following.includes(host._id)) {
            return
        }
        const response = await fetch('http://'+ip.ipAddress+'/user/edit/'+user._id,{
          method: "PATCH",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },  
          body: makeAddJSON(host)
        })
        const json = await response.json()
        // followed user "follower" count also increases
        const response2 = await fetch('http://'+ip.ipAddress+'/user/edit/'+host._id,{
          method: "PATCH",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },  
          body: makeAddJSON2(host)
        })
        return json
    }

    const removeFollower = async (host) => {
        if (!user.following.includes(host._id)) {
            return
        }
        const response = await fetch('http://'+ip.ipAddress+'/user/edit/'+user._id,{
        method: "PATCH",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },  
        body: makeDeleteJSON(host)
        })
        const json = await response.json()
        // followed user "follower" count also decreases
        const response2 = await fetch('http://'+ip.ipAddress+'/user/edit/'+host._id,{
        method: "PATCH",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },  
        body: makeDeleteJSON2(host)
        })
        return json
    }

    const makeAddJSON = (host) => {
        let prevFollowing = user.following
        prevFollowing.push(host._id)
        let res = {
            following: prevFollowing
        }
        return JSON.stringify(res)
    }

    const makeAddJSON2 = (host) => {
        let prevFollowing = host.followers
        if (host.followers.includes(user._id)) {
            return JSON.stringify(prevFollowing)
        }
        prevFollowing.push(user._id)
        let res = {
            followers: prevFollowing
        }
        return JSON.stringify(res)
    }

    const makeDeleteJSON = (host) => {
        let prevFollowing = user.following
        for(var i = prevFollowing.length - 1; i >= 0; i--) {
            if(prevFollowing[i] === host._id) {
                prevFollowing.splice(i, 1);
            }
        }
        let res = {
            following: prevFollowing
        }
        return JSON.stringify(res)
    }

    const makeDeleteJSON2 = (host) => {
        let prevFollowing = host.followers
        for(var i = prevFollowing.length - 1; i >= 0; i--) {
            if(prevFollowing[i] === user._id) {
                prevFollowing.splice(i, 1);
            }
        }
        let res = {
            followers: prevFollowing
        }
        return JSON.stringify(res)
    }

    // get fields of raffle from db
    let name;
    let description;
    let date;
    let expired;
    let images_strs; // string rep of images for carousel
    let sizes;
    let sizeTypes;
    if (route.params != null) {
        name = route.params.name
        description = route.params.description
        date = unix_to_date(route.params.startTime)
        expired = is_expired(route.params.startTime)
        images_strs = route.params.images
        sizes = route.params.sizes
        sizeTypes = route.params.sizeTypes
    }

    let images = [];
    for (let i in images_strs) {
        images.push({ uri: images_strs[i] })
    }
    const donors = [require('../../../../../assets/images/naacp.png'), require('../../../../../assets/images/aclu.png')]

    // for sliding sheet (payment)
    const [sheetOpen, setSheetOpen] = useState(false);
    const [bounceValue, setBounceValue] = useState(new Animated.Value(100)); // initial position of sheet

    const toggleSheet = () => {
        var toValue = 100;
        if (sheetOpen == false) {
            toValue = 0
        }

        Animated.spring(
            bounceValue, {
            toValue: toValue,
            velocity: 3,
            tension: 2,
            friction: 8,
            useNativeDriver: true
        }).start();

        setSheetOpen(!sheetOpen);
    };

    let options = {
        5: { chances: 10 },
        10: { chances: 40 },
        20: { chances: 50 },
        50: { chances: 150 },
        100: { chances: 400 },
    }

    return (
        <View style={[utilities.container, { backgroundColor: 'white' }]}>
            <ScrollView contentContainerStyle={utilities.scrollview}>
                {images.length > 1 ? <ImageCarousel images={images}></ImageCarousel> : <Image source={images[0]} style={{ width: 400, height: 300, resizeMode: 'center' }}></Image>}

                {/* raffle title */}
                <Text style={[fonts.h1, { marginLeft: '8%', marginBottom: 0 }]}>{name}</Text>

                <View style={styles.content}>
                    <View style={{ marginVertical: 15 }}>
                        {(expired) ? <Text style={[fonts.bold, fonts.error]}>THIS DRAWING HAS EXPIRED</Text> : <Text style={[fonts.italic]}>Drawing Starts:</Text>}
                        {(expired) ? null : <CountDown unix_timestamp={route.params.startTime}/>}
                    </View>

                    <View style={{ marginRight: '-5%', marginBottom: 15 }}>
                        <Text style={fonts.italic}>Hosted by:</Text>
                        <View style={styles.hostedby}>
                        <TouchableOpacity onPress={() => navigation.navigate('OtherUser',{user: route.params.host})}>
                            <View style={styles.hostedby__profile}>
                            <Image source={{ uri: route.params.host.profilePicture }} style={styles.hostedby__image}></Image>
                            <Text style={fonts.link}>{'@' + route.params.host.username}</Text>
                            </View>
                        </TouchableOpacity>
                        {typeof user._id === 'undefined' ? null : user.following.includes(route.params.host._id)  ? 
                            <BlockButton color="secondary" size="small" title='FOLLOWED'
                            onPress={async () => {
                                const userObj = await removeFollower(route.params.host)
                                setUser(userObj)
                            }}
                            /> :
                            <BlockButton color="primary" size="small" title='FOLLOW'
                            onPress={async () => {
                                const userObj = await addFollower(route.params.host)
                                setUser(userObj)
                            }}
                            />}
                        </View>
                    </View>
                    {/* !!!!!!!!!!!!! TODO: connect to db and format !!!!!!!!!!!!!!*/}
                    {/* winner of raffle if expired */}
                    {expired ?
                        <View style={{ marginRight: '-5%', marginBottom: 15, backgroundColor: colors.limeGreen }}>
                            <Text style={fonts.italic}>Won by:</Text>
                            <View style={styles.hostedby}>
                            <TouchableOpacity onPress={() => navigation.navigate('OtherUser',{user: route.params.host})}>
                                <View style={styles.hostedby__profile}>
                                <Image source={{ uri: route.params.host.profilePicture }} style={styles.hostedby__image}></Image>
                                <Text style={fonts.link}>{'@' + route.params.host.username}</Text>
                                </View>
                            </TouchableOpacity>
                            {typeof user._id === 'undefined' ? null : user.following.includes(route.params.host._id)  ? 
                                <BlockButton color="secondary" size="small" title='FOLLOWED'
                                onPress={async () => {
                                    const userObj = await removeFollower(route.params.host)
                                    setUser(userObj)
                                }}
                                /> :
                                <BlockButton color="primary" size="small" title='FOLLOW'
                                onPress={async () => {
                                    const userObj = await addFollower(route.params.host)
                                    setUser(userObj)
                                }}
                                />}
                            </View>
                        </View>
                        :
                        null
                    }

                    <Text style={fonts.italic}>Description</Text  >
                    <Text style={{ marginBottom: 15 }}>{description}</Text>

                    <Text style={fonts.italic}>Valued At</Text  >
                    <Text style={{ marginBottom: 15 }}>$200</Text>

                    {/* !!!!!!!!!!!!! TODO: top 5 donors !!!!!!!!!!!!!!*/}
                    <TouchableOpacity onPress={() => {
                        navigation.navigate("Top5List", {users: top5})
                    }}>
                        <Top5Donors users={top5} />
                    </TouchableOpacity>

                    {(expired) ? null :
                        <View>
                            {/* !!!!!!!!!!!!! TODO: conditionally show progress bar !!!!!!!!!!!!!!*/}
                            <ProgressBar progress={230 / 500} color={colors.primaryColor} raised={230} goal={500} width={315} />

                            <View style={styles.pickSizeSlide}>
                                <Text>PICK YOUR SIZE</Text>
                                <SizeCarousel sizes={sizeTypes} type='single'></SizeCarousel>
                                {/* <SizeCarousel sizes={sizes} type='multiple'></SizeCarousel> */}
                                <SizeCarousel sizes={sizes} type='single'></SizeCarousel>
                            </View> 

                            {/* dropdown disabled for now */}
                            {/* <View style={styles.pickSize}>
                                <Text>PICK YOUR SIZE</Text>
                                {(sizeTypes.length > 0) ? <DropDown options={sizeTypes} size='small' /> : null}
                                <DropDown options={sizes} size='small' />
                            </View> */}

                            <BuyOptions bonusAmount={10} bonusChances={40} bonusLimit={10} options={options} />
                            <Text style={{ marginRight: -10 }}>*We we will never show donation amounts for any user</Text>
                        </View>
                    }
                    <View style={{backgroundColor: colors.lightGreen, marginVertical: '5%',marginHorizontal: '-10%', paddingHorizontal:'10%' }}>
                    <Text style={[fonts.p, { marginTop: 20, textAlign: 'justify' }]}>Off Chance is a for-good company that hosts drawings for incredible products to raise money for charities and important causes that affect us all. All net proceeds (after hosting and platform fees) for this drawing will benefit the partners below:</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, marginBottom: 20 }}>
                        <Image source={donors[0]} />
                        <Image source={donors[1]} />
                    </View>
                    </View>
                    <Text style={[fonts.p, { textAlign: 'justify' }]}>*All prizes are guaranteed to be 100% authentic and deadstock. You will be notified via email once donation goal is met and drawing starts.</Text>
                </View>

                <View style={[styles.content, { flex: 0, alignItems: 'center', zIndex: -1 }]}>
                    <BlockButton
                        title="PLAY GAME"
                        color="primary"
                        onPress={() => navigation.navigate('GameController')}
                        disabled={expired} />
                    {/* <BlockButton
                        title="ENTER DRAWING"
                        color="highlight"
                        onPress={() => toggleSheet()}
                        disabled={expired} /> */}
                </View>

                {/* sliding sheet */}
                {/* <Animated.View
                    style={[styles.subView,
                    { transform: [{ translateY: bounceValue }] }]}>
                    <SlidingSheet title='Enter Drawing' context={['abc']} visible={sheetOpen} toggleSheet={toggleSheet} />
                </Animated.View> */}

            </ScrollView>
            <BottomNav navigation={navigation} active={'Home'}></BottomNav>
        </View>
    )
}