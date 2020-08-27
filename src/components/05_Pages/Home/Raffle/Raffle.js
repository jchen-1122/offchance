import React, { useState, useContext, useRef } from 'react';
import { ScrollView, View, Text, Image, Animated, TouchableOpacity, Dimensions } from 'react-native'
import { utilities, fonts, colors } from '../../../../settings/all_settings';
import styles from './Raffle.styling';
import BottomNav from '../../../02_Molecules/BottomNav/BottomNav'
import ProgressBar from '../../../02_Molecules/ProgressBar/ProgressBar'
import HostedBy from '../../../02_Molecules/HostedBy/HostedBy'
import Top5Donors from '../../../02_Molecules/Top5Donors/Top5Donors'
import ImageCarousel from '../../../02_Molecules/ImageCarousel/ImageCarousel'
import BlockButton from '../../../01_Atoms/Buttons/BlockButton/BlockButton';
import BuyOptions from '../../../02_Molecules/BuyOptions/BuyOptions'
import CountDown from '../../../01_Atoms/Countdown/Countdown'
import SlidingSheet from '../../../04_Templates/SlidingSheet/SlidingSheet';
import OverlaySheet from '../../../04_Templates/OverlaySheet/OverlaySheet';
import SizeCarousel from '../../../01_Atoms/SizeCarousel/SizeCarousel'
import { is_expired } from '../../../../functions/convert_dates';
import { top5_raffle } from '../../../../functions/explore_functions';
import GlobalState from '../../../globalState';
import * as geolib from 'geolib';
import LikeButton from '../../../01_Atoms/Buttons/LikeButton/LikeButton'

export default function Raffle({ navigation, route }) {
    const { user, setUser } = useContext(GlobalState)
    const mapAPI = 'pk.eyJ1IjoiamNoZW4xMTIyIiwiYSI6ImNrMjZ4dXM0cDF4cnozY21sYnBwYjdzaTAifQ.ItVivcBhnM1Lz9GP5B0PSQ'
    var raffle = route.params

    // get host of raffle from db
    const [top5, setTop5] = useState([])
    const [enabled, setEnabled] = useState(true)
    const [buyOption, setBuyOption] = useState(null)

    // winner needs to be in the database when the results are calculated
    const [location, setLocation] = useState(null)
    const [winner, setWinner] = useState(null)

    // sliding sheet
    const [enableScroll, setEnableScroll] = useState(true);
    const [containerStyle, setContainerStyle] = useState(styles.Raffle);
    const [sheetController, setSheetController] = useState(false); // 0 - close, 1 - open. TODO: GLOBAL STATE

    const ip = require('../../../IP_ADDRESS.json');
    React.useEffect(() => {
        async function getCurrentRaffle() {
            route.params = await getRaffle(route.params._id)
            route.params['host'] = await getUser(route.params.hostedBy)
            route.params['top5'] = route.params.users.children.sort((a, b) => b.amountDonated - a.amountDonated).slice(0, 5)
            let temp = []
            for (var i = 0; i < route.params['top5'].length; i++) {
                const user = await getUser(route.params['top5'][i].userID)
                temp.push(user)
            }
            setTop5(temp)
            // geocode raffle address not host address (still need to change)
            let coordsUser = await getCoords(user.shippingAddress)
            let coordsHost = Object.keys(route.params).includes("address") ? await getCoords(route.params.address) : coordsUser

            let longUser = coordsUser.features[0].geometry.coordinates[0]
            let latUser = coordsUser.features[0].geometry.coordinates[1]

            let longHost = coordsHost.features[0].geometry.coordinates[0]
            let latHost = coordsHost.features[0].geometry.coordinates[1]

            if (Object.keys(route.params).includes("radius")) {
                setLocation(geolib.isPointWithinRadius({ latitude: latHost, longitude: longHost }, { latitude: latUser, longitude: longUser }, route.params.radius * 0.621371 * 1000))
            }
            
            if (route.params.winners.children.length !== 0) {
                setWinner(await getUser(route.params.winners.children[0].userID))
            }
        }
        getCurrentRaffle()
    }, [])

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <LikeButton navigation={navigation} currUser={user} setUser={setUser} raffle={raffle._id} style={{backgroundColor: 'transparent'}} color='white'/>
            )
        });
    }, [navigation]);
    // React.useEffect(() => {
    //     console.log(raffle.top5)
    // })

    // React.useEffect(() => {
    //     async function getTop5(ids) {
    //         // get top 5 donors of this raffle
    //         try {
    //             let temp = []
    //             for (var i = 0; i < ids.length; i++) {
    //                 const user = await getUser(ids[i].userID)
    //                 temp.push(user)
    //             }
    //             setTop5(temp)
    //         } catch (e) {

    //         }
    //     }
    //     getTop5(raffle.top5)
    // }, [raffle.top5])

    // const getWinners = () => {
    //     const enteredUsers = raffle.users.children
    //     const winners = []
    //     // will change based on the number of rewards
    //     // rewards[0] = grand prize (1)
    //     // rewards[1] = 50 chances (2)
    //     // rewards[2] = 20 chanes (3)
    //     // rewards[3] = 10 chances (4)
    //     let rewards = [1, 2, 3, 4]
    //     let numRewards = 10
    //     let currPrize = 0

    //     // const winners = raffle.raffle.users.children.sort((a,b)=>b.amountDonated - a.amountDonated).slice(0,numWinners)

    //     // randomly and proportionally assign rewards to users

    //     while (numRewards !== 0) {
    //         // 1. assign everyone a range of numbers based on the number of chances
    //         let ranges = {}
    //         let count = 1
    //         let numChances = 0
    //         for (var i = 0; i < enteredUsers.length; i++) {
    //             ranges[enteredUsers[i].userID] = [count, count + enteredUsers[i].chances - 1]
    //             count += enteredUsers[i].chances
    //             numChances += enteredUsers[i].chances
    //         }

    //         // 2. Generate a random number from 0 to numChances
    //         const rand = Math.floor((Math.random() * numChances) + 1)

    //         // 3. determine who's range qualifies (both ends inclusive)
    //         let winner = -1
    //         for (var i = 0; i < enteredUsers.length; i++) {
    //             if (ranges[enteredUsers[i].userID][0] <= rand && ranges[enteredUsers[i].userID][1] >= rand) {
    //                 winner = enteredUsers[i].userID
    //                 winners.push({ userID: enteredUsers[i].userID, reward: currPrize })
    //                 break
    //             }
    //         }

    //         // 4. update variables for next loop
    //         numRewards--;
    //         rewards[currPrize] -= 1
    //         if (rewards[currPrize] == 0) {
    //             currPrize += 1
    //         }

    //         // 5. delete current winner from array
    //         for (var i = enteredUsers.length - 1; i >= 0; i--) {
    //             if (enteredUsers[i].userID === winner) {
    //                 // console.log('deleted')
    //                 enteredUsers.splice(i, 1);
    //                 break
    //             }
    //         }
    //     }
    //     return winners
    // }

    // React.useEffect(() => {
    //     async function loadWinners() {
    //         // raffle.winners.children.length == 0
    //         if (raffle.startTime - Math.floor(Date.now() / 1000) <= 600) {
    //             const winners = getWinners()
    //             await postWinners(winners)
    //         }
    //     }
    //     loadWinners()
    // }, [])

    async function getRaffle(id) {
        let response = await fetch('https://8f5d9a32.us-south.apigw.appdomain.cloud/raffle/id', {
            method: "POST",
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({id : id})
        })
        response = await response.json()
        response = response.raffle
        return response
    }

    async function getCoords(query) {
        let response = await fetch('https://api.mapbox.com/geocoding/v5/mapbox.places/' + query + '.json?access_token=' + mapAPI)
        response = await response.json()
        return response
    }

    async function getUser(id) {
        let response = await fetch('https://8f5d9a32.us-south.apigw.appdomain.cloud/users/id', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id : id})
        })
        response = await response.json()
        response = response.user
        return response
    }

    // async function postWinners(winners) {
    //     let response = await fetch('http://' + ip.ipAddress + '/raffle/edit/' + raffle._id, {
    //         method: "PATCH",
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json'
    //         },
    //         body: makeJSON(winners)
    //     })
    //     const json = await response.json()
    //     return json
    // }

    const makeJSON = (winners) => {
        let res = {
            winners: {
                children: winners
            }
        }
        return JSON.stringify(res)
    }

    // stuff for follow button-----------------------------------------------------------------------
    const addFollower = async (host) => {
        if (user.following.includes(host._id)) {
            return
        }
        const response = await fetch('https://8f5d9a32.us-south.apigw.appdomain.cloud/users/edit', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: makeAddJSON(host)
        })
        let json = await response.json()
        json = json.user
        // followed user "follower" count also increases
        const response2 = await fetch('https://8f5d9a32.us-south.apigw.appdomain.cloud/users/edit', {
            method: "POST",
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
        const response = await fetch('https://8f5d9a32.us-south.apigw.appdomain.cloud/users/edit', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: makeDeleteJSON(host)
        })
        let json = await response.json()
        json = json.user
        // followed user "follower" count also decreases
        const response2 = await fetch('https://8f5d9a32.us-south.apigw.appdomain.cloud/users/edit', {
            method: "POST",
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
        res["id"] = user._id
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
        res["id"] = host._id
        return JSON.stringify(res)
    }

    const makeDeleteJSON = (host) => {
        let prevFollowing = user.following
        for (var i = prevFollowing.length - 1; i >= 0; i--) {
            if (prevFollowing[i] === host._id) {
                prevFollowing.splice(i, 1);
            }
        }
        let res = {
            following: prevFollowing
        }
        res["id"] = user._id
        return JSON.stringify(res)
    }

    const makeDeleteJSON2 = (host) => {
        let prevFollowing = host.followers
        for (var i = prevFollowing.length - 1; i >= 0; i--) {
            if (prevFollowing[i] === user._id) {
                prevFollowing.splice(i, 1);
            }
        }
        let res = {
            followers: prevFollowing
        }
        res["id"] = host._id
        return JSON.stringify(res)
    }
    // end of stuff for follow button-------------------------------------------------------------------

    // get fields of raffle from db
    let name;
    let description;
    let expired;
    let images_strs; // string rep of images for carousel
    let sizes;
    let sizeTypes;
    let donors;
    if (raffle != null) {
        name = raffle.name
        description = raffle.description
        console.log('is_expired',is_expired(raffle.startTime + 1800))
        expired = is_expired(raffle.startTime + 1800)
        images_strs = raffle.images
        sizes = raffle.sizes
        sizeTypes = raffle.sizeTypes
        donors = raffle.charityImgs
    }

    // entering states
    const [_sizeType, setSizeType] = useState((sizeTypes.length === 0) ? "" : null)
    const [_size, setSize] = useState((sizeTypes.length === 0) ? "One Size" : (sizes.length === 0) ? "" : null)

    // images for charities
    let images = [];
    for (let i in images_strs) {
        images.push({ uri: images_strs[i] })
    }
    let charities = [];
    for (let i in donors) {
        charities.push(<Image source={{ uri: donors[i] }} style={styles.Raffle__image_charity}></Image>)
    }

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

    // determine chance options based on the raffle
    let options = {}
    if (raffle.type == 1) {
        options = {
            5: { chances: 10 },
            10: { chances: 40 },
            20: { chances: 50 },
            50: { chances: 150 },
            100: { chances: 400 },
            250: { chances: 1100 }
        }
        // if the value/donation goal is > 500 add another option
        if ((raffle.valuedAt && raffle.valuedAt >= 500) || (raffle.donationGoal && raffle.donationGoal >= 500)) {
            options[250] = { chances: 1100 }
        }
    }
    if (raffle.type == 2) {
        options = {
            2: { chances: 3 }
        }
    }

    // for overlay sheet
    const trigger = () => {
        setSheetController(!sheetController);
        setEnableScroll(!enableScroll);
        setContainerStyle(!sheetController ?
            { // light on
                flex: 1,
                justifyContent: 'space-between',
                backgroundColor: "rgba(0, 0, 0, 0.5)",
            } : { // light off
                flex: 1,
                justifyContent: 'space-between',
                backgroundColor: "rgba(255, 255, 255, 1)",
            });
    }

    // tells user how many chances they have in the raffle
    let chanceText = 'ENTER DRAWING'
    if (Object.keys(user).includes('rafflesEntered')) {
        for (var raf of user.rafflesEntered.children) {
            if (raf.raffleID == raffle._id) {
                chanceText = 'YOU HAVE ' + raf.chances + ' CHANCES'
            }
        }
    }
    return ((Object.keys(route.params).includes('host')) ?
        <View style={containerStyle}>
            <ScrollView contentContainerStyle={utilities.scrollview} scrollEnabled={enableScroll} >
                {images.length > 1 ? <ImageCarousel images={images}></ImageCarousel> : <Image source={images[0]} style={styles.Raffle__image}></Image>}

                {/* raffle title */}
                <Text style={[fonts.h1, { marginLeft: '8%' }]}>{name}</Text>

                <View style={{paddingHorizontal: '8%'}}>
                    {(!location && location != null && !expired) ? <Text style={[fonts.bold, fonts.error]}>THIS RAFFLE IS OUT OF YOUR LOCATION</Text> : null}
                    <Text>{chanceText}</Text>
                    <View style={{ marginVertical: 15 }}>
                        {(expired && raffle.archived) ? <Text style={[fonts.bold, fonts.error]}>THIS DRAWING HAS EXPIRED</Text> : (raffle.archived) ? <Text style={[fonts.italic]}>LIVE DRAWING IN PROGRESS</Text> : <Text style={[fonts.italic]}>Drawing Starts:</Text>}
                        {(expired && raffle.archived) ? null : <CountDown unix_timestamp={raffle.startTime} />}
                    </View>

                    <View style={{ marginRight: '-5%', marginBottom: 20 }}>
                        <Text style={fonts.italic}>Hosted by:</Text>
                        <View style={styles.Raffle__host}>
                            <HostedBy
                                navigation={navigation}
                                data={raffle.host}
                                currUser={user}
                                follow={false}
                                />
                            {/* remove follow button if host is user self*/}
                            {typeof user._id === 'undefined' && raffle !== 'undefined' ? null : user._id === raffle.host._id ? null : user.following.includes(raffle.host._id) ?
                                <BlockButton color="secondary" size="small" title='FOLLOWING'
                                    onPress={async () => {
                                        if (enabled) {
                                            setEnabled(false)
                                            const userObj = await removeFollower(raffle.host)
                                            setUser(userObj)
                                            setEnabled(true)
                                        }
                                    }}
                                /> :
                                <BlockButton color="primary" size="small" title='FOLLOW'
                                    onPress={async () => {
                                        if (enabled) {
                                            setEnabled(false)
                                            const userObj = await addFollower(raffle.host)
                                            setUser(userObj)
                                            setEnabled(true)
                                        }
                                    }}
                                />}
                        </View>
                    </View>
                    {/* winner of raffle if expired */}
                    {(expired && raffle.archived && winner) ?
                        <View style={[styles.highlightBackground, { paddingVertical: '3%', paddingRight: '5%' }]}>
                            <Text style={fonts.italic}>Won by:</Text>
                            <View style={styles.Raffle__host}>
                                <TouchableOpacity onPress={() => navigation.navigate('OtherUser', { user: winner })}>
                                    <View style={styles.Raffle__host__profile}>
                                        <Image source={{ uri: winner.profilePicture }} style={styles.Raffle__host__image}></Image>
                                        <Text style={fonts.link}>{'@' + winner.username}</Text>
                                    </View>
                                </TouchableOpacity>
                                {typeof user._id === 'undefined' ? null : user.following.includes(winner._id) ?
                                    <BlockButton color="secondary" size="small" title='FOLLOWING'
                                        onPress={async () => {
                                            if (enabled) {
                                                setEnabled(false)
                                                const userObj = await removeFollower(winner)
                                                setUser(userObj)
                                                setEnabled(true)
                                            }
                                        }}
                                    /> :
                                    <BlockButton color="primary" size="small" title='FOLLOW'
                                        onPress={async () => {
                                            if (enabled) {
                                                setEnabled(false)
                                                const userObj = await addFollower(winner)
                                                setUser(userObj)
                                                setEnabled(true)
                                            }
                                        }}
                                    />}
                            </View>
                        </View>
                        :
                        null
                    }

                    <Text style={fonts.italic}>Description</Text  >
                    <Text style={{ marginBottom: 20 }}>{description}</Text>

                    {(raffle.type == 1 && raffle.valuedAt) ?
                        <View>
                            <Text style={fonts.italic}>Valued At</Text  >
                            <Text style={{ marginBottom: 20 }}>${raffle.valuedAt}</Text>
                        </View> :
                        <View>
                            <Text style={fonts.italic}>Buy It Now Price</Text  >
                            <Text style={{ marginBottom: 20 }}>${raffle.productPrice}</Text>
                        </View>
                    }

                    {(expired || !raffle.live) ? null :
                        <View>
                            {(raffle.type == 1) ?
                                <TouchableOpacity onPress={() => {
                                    navigation.navigate("Top5List", { users: top5 })
                                }}>
                                    <Top5Donors users={top5} />
                                </TouchableOpacity>
                                : null
                            }

                            {(raffle.sizes.length > 0 && raffle.sizes[0] !== 'One Size') ? // if there's more than just one size
                                <View style={{marginVertical: 25}}>
                                    <Text>PICK YOUR SIZE</Text>
                                    {raffle.sizeTypes.length > 0 ?
                                        <SizeCarousel sizes={sizeTypes} type='single' setSize={setSizeType} string /> : null}
                                    <SizeCarousel sizes={sizes} type='single' setSize={setSize} />
                                </View> : null
                            }

                            <BuyOptions options={options} buyOption={buyOption} setBuyOption={setBuyOption} trigger={trigger} navigation={navigation} loggedin={Object.keys(user).includes('_id')} />

                            {/* sliding sheet */}
                            <View>
                                <OverlaySheet
                                    title={(buyOption) ? "Purchase " + options[buyOption].chances + " chances" : "Purchase Chances"}
                                    type='default'
                                    sheet={sheetController}
                                    trigger={trigger}
                                    height={Dimensions.get('screen').height * 0.7}
                                    user={user}
                                    setUser={setUser}
                                    content={['Wallet Balance', 'Reload Source', 'Reload Amount']}
                                    navigation={navigation}
                                    wallet={false}
                                    amount={(buyOption) ? "$" + buyOption + " = " + options[buyOption].chances + " chances" : "$5 = 10 chances"}
                                    amountDollar={(buyOption) ? parseInt(buyOption) : 0}
                                    chances={(buyOption) ? options[buyOption].chances : 0}
                                    sizeType={(_sizeType || _sizeType === "") ? _sizeType : "notselected"}
                                    size={(_size || _size === "") ? _size : "notselected"}
                                    raffleid={route.params._id}
                                    type={route.params.type}
                                />
                            </View>
                        </View>
                    }

                    {(raffle.live && raffle.type == 1) ? // raffle should be donate to enter + live
                        <View>
                            <View style={{ zIndex: -1 }}>
                                <Text style={{ marginRight: -10 }}>*We we will never show donation amounts for any user</Text>
                            </View>
                            <View style={[styles.Raffle__highlight, { paddingVertical: '5%', marginVertical: '5%' }]}>
                                <Text style={[fonts.p, { textAlign: 'justify' }]}>Off Chance is a for-good company that hosts drawings for incredible products to raise money for charities and important causes that affect us all. All net proceeds (after hosting and platform fees) for this drawing will benefit the partners below:</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: '5%' }}>
                                {charities}
                            </View>
                        </View> : null
                    }
                    <Text style={[fonts.p, { marginBottom: 20 }]}>*All prizes are guaranteed to be 100% authentic and deadstock. You will be notified via email once donation goal is met and drawing starts.</Text>
                </View>

                <View style={{ paddingHorizontal: '8%',flex: 0, alignItems: 'center', zIndex: -1 }}>
                    <BlockButton
                        title="LIVE DRAWING EXP"
                        color="primary"
                        onPress={() => {
                            navigation.navigate('RaffleResult', { raffle: raffle })
                        }}/>
                </View>
            </ScrollView>
            <BottomNav navigation={navigation} active={'Home'}></BottomNav>
        </View> : null
    )
}
