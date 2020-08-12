import React, { useState, useContext, useRef } from 'react';
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
import * as geolib from 'geolib';

export default function Raffle({ navigation, route }) {
    const { user, setUser } = useContext(GlobalState)
    const mapAPI = 'pk.eyJ1IjoiamNoZW4xMTIyIiwiYSI6ImNrMjZ4dXM0cDF4cnozY21sYnBwYjdzaTAifQ.ItVivcBhnM1Lz9GP5B0PSQ'
    var raffle = route.params
    const [views, setViews] = useState(null)
    // get host of raffle from db
    const [top5, setTop5] = useState([])
    const [enabled, setEnabled] = useState(true)
    const [buyOption, setBuyOption] = useState(null)
    // winner needs to be in the database when the results are calculated
    const [location, setLocation] = useState(null)
    const [winner, setWinner] = useState(Object.keys(raffle).includes('winner') ? raffle.winner : raffle['host'])
    const ip = require('../../../IP_ADDRESS.json');
    React.useEffect(() => {
        async function getCurrentRaffle() {
            route.params = await getRaffle(route.params._id)
            // addView()
            route.params['host'] = await getUser(route.params.hostedBy)
            route.params['top5'] = route.params.users.children.sort((a, b) => b.amountDonated - a.amountDonated).slice(0, 5)
            let coordsUser = await getCoords(user.shippingAddress)
            let coordsHost = await getCoords(route.params['host'].shippingAddress)

            let longUser = coordsUser.features[0].geometry.coordinates[0]
            let latUser = coordsUser.features[0].geometry.coordinates[1]

            let longHost = coordsHost.features[0].geometry.coordinates[0]
            let latHost = coordsHost.features[0].geometry.coordinates[1]

            if (Object.keys(route.params).includes("radius")) {
                setLocation(geolib.isPointWithinRadius({ latitude: latHost, longitude: longHost }, { latitude: latUser, longitude: longUser }, route.params.radius * 0.621371 * 1000))
            }
        }
        setViews(raffle.totalViews)
        addView()
        getCurrentRaffle()
    }, [])

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
        getTop5(raffle.top5)
    }, [])

    const getWinners = () => {
        const enteredUsers = raffle.users.children

        const winners = []

        // will change based on the number of rewards
        // rewards[0] = grand prize (1)
        // rewards[1] = 50 chances (2)
        // rewards[2] = 20 chanes (3)
        // rewards[3] = 10 chances (4)
        let rewards = [1, 2, 3, 4]
        let numRewards = 10
        let currPrize = 0

        // const winners = raffle.raffle.users.children.sort((a,b)=>b.amountDonated - a.amountDonated).slice(0,numWinners)

        // randomly and proportionally assign rewards to users

        while (numRewards !== 0) {
            // 1. assign everyone a range of numbers based on the number of chances
            let ranges = {}
            let count = 1
            let numChances = 0
            for (var i = 0; i < enteredUsers.length; i++) {
                ranges[enteredUsers[i].userID] = [count, count + enteredUsers[i].chances - 1]
                count += enteredUsers[i].chances
                numChances += enteredUsers[i].chances
            }

            // 2. Generate a random number from 0 to numChances
            const rand = Math.floor((Math.random() * numChances) + 1)

            // 3. determine who's range qualifies (both ends inclusive)
            let winner = -1
            for (var i = 0; i < enteredUsers.length; i++) {
                if (ranges[enteredUsers[i].userID][0] <= rand && ranges[enteredUsers[i].userID][1] >= rand) {
                    winner = enteredUsers[i].userID
                    winners.push({ userID: enteredUsers[i].userID, reward: currPrize })
                    break
                }
            }

            // 4. update variables for next loop
            numRewards--;
            rewards[currPrize] -= 1
            if (rewards[currPrize] == 0) {
                currPrize += 1
            }

            // 5. delete current winner from array
            for (var i = enteredUsers.length - 1; i >= 0; i--) {
                if (enteredUsers[i].userID === winner) {
                    // console.log('deleted')
                    enteredUsers.splice(i, 1);
                    break
                }
            }
        }
        return winners
    }

    React.useEffect(() => {
        async function loadWinners() {
            // raffle.winners.children.length == 0
            if (raffle.startTime - Math.floor(Date.now() / 1000) <= 600) {
                const winners = getWinners()
                await postWinners(winners)
            }
        }
        loadWinners()
    }, [])

    async function getRaffle(id) {
        let response = await fetch('http://' + ip.ipAddress + '/raffle/id/' + id)
        response = await response.json()
        return response
    }

    async function getCoords(query) {
        let response = await fetch('https://api.mapbox.com/geocoding/v5/mapbox.places/' + query + '.json?access_token=' + mapAPI)
        response = await response.json()
        return response
    }

    async function getUser(id) {
        let response = await fetch('http://' + ip.ipAddress + '/user/id/' + id)
        response = await response.json()
        return response
    }

    async function postWinners(winners) {
        let response = await fetch('http://' + ip.ipAddress + '/raffle/edit/' + raffle._id, {
            method: "PATCH",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: makeJSON(winners)
        })
        const json = await response.json()
        return json
    }

    const makeJSON = (winners) => {
        let res = {
            winners: {
                children: winners
            }
        }
        return JSON.stringify(res)
    }

    const addFollower = async (host) => {
        if (user.following.includes(host._id)) {
            return
        }
        const response = await fetch('http://' + ip.ipAddress + '/user/edit/' + user._id, {
            method: "PATCH",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: makeAddJSON(host)
        })
        const json = await response.json()
        // followed user "follower" count also increases
        const response2 = await fetch('http://' + ip.ipAddress + '/user/edit/' + host._id, {
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
        const response = await fetch('http://' + ip.ipAddress + '/user/edit/' + user._id, {
            method: "PATCH",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: makeDeleteJSON(host)
        })
        const json = await response.json()
        // followed user "follower" count also decreases
        const response2 = await fetch('http://' + ip.ipAddress + '/user/edit/' + host._id, {
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
        for (var i = prevFollowing.length - 1; i >= 0; i--) {
            if (prevFollowing[i] === host._id) {
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
        for (var i = prevFollowing.length - 1; i >= 0; i--) {
            if (prevFollowing[i] === user._id) {
                prevFollowing.splice(i, 1);
            }
        }
        let res = {
            followers: prevFollowing
        }
        return JSON.stringify(res)
    }

    // increment total number of views for the raffle
    const addView = async () => {
        console.log(views)
        // const response = await fetch('http://' + data.ipAddress + '/raffle/edit/' + user._id, {
        //     method: "PATCH",
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json'
        //     },
        //     body: makeJSON()
        // })
        // const json = await response.json()
        // return json
    }
    // get fields of raffle from db
    let name;
    let description;
    let expired;
    let images_strs; // string rep of images for carousel
    let sizes;
    let sizeTypes;
    if (raffle != null) {
        name = raffle.name
        description = raffle.description
        expired = is_expired(raffle.startTime)
        images_strs = raffle.images
        sizes = raffle.sizes
        sizeTypes = raffle.sizeTypes
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

    // determine chance options based on the raffle
    let options = {}
    if (raffle.type == 1) {
        options = {
            5: { chances: 10 },
            10: { chances: 40 },
            20: { chances: 50 },
            50: { chances: 150 },
            100: { chances: 400 },
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

    var userIDs = ["5f1717acfe0108ee8b5e5c0b", "5f171974fe0108ee8b5e5c11", "5f1757f7c9deeef8c14b6a40", "5f1a6bdb457f816624a7a48c"]

    const getOpponent = async () => {
        var opponentID = userIDs[Math.floor(Math.random() * userIDs.length)]
        const response = await fetch('http://' + ip.ipAddress + '/user/id/' + opponentID)
        const json = await response.json()
        return json
    }
    return (
        <View style={[utilities.container, { backgroundColor: 'white' }]}>
            <ScrollView contentContainerStyle={utilities.scrollview}>
                {images.length > 1 ? <ImageCarousel images={images}></ImageCarousel> : <Image source={images[0]} style={styles.Raffle__image}></Image>}

                {/* raffle title */}
                <Text style={[fonts.h1, { marginLeft: '8%', marginBottom: 0 }]}>{name}</Text>

                <View style={styles.content}>
                    {(!location && location != null && !expired) ? <Text style={[fonts.bold, fonts.error]}>THIS RAFFLE IS OUT OF YOUR LOCATION</Text> : null}
                    <View style={{ marginVertical: 15 }}>
                        {(expired) ? <Text style={[fonts.bold, fonts.error]}>THIS DRAWING HAS EXPIRED</Text> : <Text style={[fonts.italic]}>Drawing Starts:</Text>}
                        {(expired) ? null : <CountDown unix_timestamp={raffle.startTime} />}
                    </View>

                    <View style={{ marginRight: '-5%', marginBottom: 15 }}>
                        <Text style={fonts.italic}>Hosted by:</Text>
                        <View style={styles.hostedby}>
                            <TouchableOpacity onPress={() => navigation.navigate('OtherUser', { user: raffle.host })}>
                                <View style={styles.hostedby__profile}>
                                    <Image source={{ uri: raffle.host.profilePicture }} style={styles.hostedby__image}></Image>
                                    <Text style={fonts.link}>{'@' + raffle.host.username}</Text>
                                </View>
                            </TouchableOpacity>
                            {typeof user._id === 'undefined' ? null : user.following.includes(raffle.host._id) ?
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
                    {/* !!!!!!!!!!!!! TODO: connect to db and format !!!!!!!!!!!!!!*/}
                    {/* winner of raffle if expired */}
                    {(expired) ?
                        <View style={[styles.highlightBackground, { paddingVertical: '3%', paddingRight: '5%' }]}>
                            <Text style={fonts.italic}>Won by:</Text>
                            <View style={styles.hostedby}>
                                <TouchableOpacity onPress={() => navigation.navigate('OtherUser', { user: winner })}>
                                    <View style={styles.hostedby__profile}>
                                        <Image source={{ uri: winner.profilePicture }} style={styles.hostedby__image}></Image>
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
                    <Text style={{ marginBottom: 15 }}>{description}</Text>

                    {raffle.valuedAt ?
                        <View>
                            <Text style={fonts.italic}>Valued At</Text  >
                            <Text style={{ marginBottom: 15 }}>${raffle.valuedAt}</Text>
                        </View>
                        : null}

                    {(expired || !raffle.live) ? null :
                        <View>
                            <TouchableOpacity onPress={() => {
                                navigation.navigate("Top5List", { users: top5 })
                            }}>
                                <Top5Donors users={top5} />
                            </TouchableOpacity>
                            {/* !!!!!!!!!!!!! TODO: conditionally show progress bar !!!!!!!!!!!!!!*/}
                            <ProgressBar progress={230 / 500} color={colors.primaryColor} raised={230} goal={500} width={315} />

                            {raffle.sizes.length > 0 ?
                                <View style={styles.pickSizeSlide}>
                                    <Text>PICK YOUR SIZE</Text>
                                    <SizeCarousel sizes={sizeTypes} type='single' />
                                    <SizeCarousel sizes={sizes} type='single' />
                                </View> : null
                            }


                            <BuyOptions options={options} buyOption={buyOption} setBuyOption={setBuyOption}/>
                            <Text style={{ marginRight: -10 }}>*We we will never show donation amounts for any user</Text>
                        </View>
                    }
                    {raffle.live ?
                        <View>

                            <View style={[styles.highlightBackground, { paddingVertical: '5%', marginVertical: '5%' }]}>
                                <Text style={[fonts.p, { textAlign: 'justify' }]}>Off Chance is a for-good company that hosts drawings for incredible products to raise money for charities and important causes that affect us all. All net proceeds (after hosting and platform fees) for this drawing will benefit the partners below:</Text>

                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: '5%' }}>
                                <Image source={donors[0]} />
                                <Image source={donors[1]} />
                            </View>
                        </View> : null
                    }

                    <Text style={[fonts.p, { textAlign: 'justify' }]}>*All prizes are guaranteed to be 100% authentic and deadstock. You will be notified via email once donation goal is met and drawing starts.</Text>
                </View>

                <View style={[styles.content, { flex: 0, alignItems: 'center', zIndex: -1 }]}>
                    <BlockButton
                        title="PLAY GAME"
                        color="primary"
                        onPress={async() => navigation.navigate('GameController', await getOpponent())}
                        disabled={expired} />
                    <BlockButton
                        title="LIVE DRAWING EXP"
                        color="primary"
                        onPress={() => {
                            // navigation.navigate('RaffleResult', {raffle: route.params})
                            navigation.navigate('RaffleResult', { raffle: raffle })
                        }}
                        disabled={expired} />

                    {/* <BlockButton
                        title="ENTER DRAWING"
                        color="highlight"
                        onPress={() => toggleSheet()}
                        disabled={expired} /> */}
                </View>
                {/* disable enter drawing if a person is not within the radius (state: location) */}
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