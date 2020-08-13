import React, { useState, useContext } from 'react'
import { View, ScrollView, Text, Image, } from 'react-native'
import { Icon } from 'react-native-elements'
import { colors, fonts, utilities } from '../../../settings/all_settings'
import StatsBar from '../../02_Molecules/StatsBar/StatsBar'
import BlockButton from '../../01_Atoms/Buttons/BlockButton/BlockButton'
import { styles } from './OtherUser.styling'
import GlobalState from '../../globalState'
import Card from '../../03_Organisms/Card/Card'

export default function OtherUser({ navigation, route }) {
    const otherUser = route.params.user
    const { user, setUser } = useContext(GlobalState)
    const [follow, setFollow] = useState(user.following != null && !user.following.includes(otherUser._id))
    const [enabled, setEnabled] = useState(true)
    const [hostedRaffles, setHostedRaffles] = useState([])
    const [wonRaffles, setWonRaffles] = useState([])
    const ip = require('../../IP_ADDRESS.json')

    React.useEffect(() => {
        async function getRaffle() {
            let response = await fetch('http://' + ip.ipAddress + '/raffle/query?query=hostedBy&val=' + otherUser._id)
            response = await response.json()
            setHostedRaffles(response)
        }
        // if they're a host, get their posted raffles
        if (otherUser.isHost) {
            getRaffle()
        }
    }, [])

    React.useEffect(() => {
        async function getRaffles() {
            var wonRaffles = []
            if (otherUser.rafflesWon) {
                if (otherUser.rafflesWon.children.length > 0) {
                    for (var raf of otherUser.rafflesWon.children) {
                        let response = await fetch('http://' + ip.ipAddress + '/raffle/id/' + raf.raffleID)
                        response = await response.json()
                        wonRaffles.push({raffle: response, prize: raf.reward})
                    }
                }
            }
            setWonRaffles(wonRaffles)
        }
        getRaffles()
    },[])

    const addFollower = async () => {
        const data = require('../../IP_ADDRESS.json')
        if (user.following.includes(otherUser._id)) {
            return
        }
        const response = await fetch('http://' + data.ipAddress + '/user/edit/' + user._id, {
            method: "PATCH",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: makeAddJSON()
        })
        const json = await response.json()

        // followed user "follower" count also increases
        const response2 = await fetch('http://' + data.ipAddress + '/user/edit/' + otherUser._id, {
            method: "PATCH",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: makeAddJSON2()
        })
        return json
    }

    const removeFollower = async () => {
        const data = require('../../IP_ADDRESS.json')
        if (!user.following.includes(otherUser._id)) {
            return
        }
        const response = await fetch('http://' + data.ipAddress + '/user/edit/' + user._id, {
            method: "PATCH",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: makeDeleteJSON()
        })
        const json = await response.json()

        // followed user "follower" count also decreases
        const response2 = await fetch('http://' + data.ipAddress + '/user/edit/' + otherUser._id, {
            method: "PATCH",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: makeDeleteJSON2()
        })
        return json
    }

    const makeAddJSON = () => {
        let prevFollowing = user.following
        prevFollowing.push(otherUser._id)
        console.log(prevFollowing)
        let data = {
            following: prevFollowing
        }
        return JSON.stringify(data)
    }

    // followed user "follower" count also increases
    const makeAddJSON2 = () => {
        let prevFollowing = otherUser.followers
        if (otherUser.followers.includes(user._id)) {
            return JSON.stringify(prevFollowing)
        }
        prevFollowing.push(user._id)
        let data = {
            followers: prevFollowing
        }
        return JSON.stringify(data)
    }


    const makeDeleteJSON = () => {
        let prevFollowing = user.following
        for (var i = prevFollowing.length - 1; i >= 0; i--) {
            if (prevFollowing[i] === otherUser._id) {
                prevFollowing.splice(i, 1);
            }
        }
        let data = {
            following: prevFollowing
        }
        return JSON.stringify(data)
    }

    // followed user "follower" count also increases
    const makeDeleteJSON2 = () => {
        let prevFollowing = otherUser.followers
        for (var i = prevFollowing.length - 1; i >= 0; i--) {
            if (prevFollowing[i] === user._id) {
                prevFollowing.splice(i, 1);
            }
        }
        let data = {
            followers: prevFollowing
        }
        return JSON.stringify(data)
    }


    let feedCards;
    if (otherUser.isHost) {
        feedCards = (hostedRaffles.map((raffle, index) =>
            <Card
                cardType='feed'
                feedType='following'
                data={raffle}
                key={index}
                navigation={navigation}
                currUserG={user}
                setUserG={setUser}
            />
        ))
    }
    // if you're following each other, should see what stuff they've won
    else if (otherUser.following.includes(user._id) && user.following.includes(otherUser._id)){
        feedCards = (
            <View style={{alignItems: 'center'}}>
            {wonRaffles.map((raf, index) =>
                <Card
                    cardType='feed'
                    feedType='win'
                    userType='other'
                    otherUser={otherUser}
                    prize={raf.prize}
                    data={raf.raffle}
                    key={index}
                    navigation={navigation}
                    currUserG={user}
                    setUserG={setUser}
                />
            )}
    </View>
)

    }
    return (
        <View style={utilities.container}>
            <ScrollView>
                <Image source={{ uri: otherUser.profilePicture }} style={styles.profilePic}></Image>
                <Text style={styles.header_name}>{otherUser.name}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'center', }}>
                    <Text style={styles.header_username}>@{otherUser.username}</Text>
                    {otherUser.isHost ? <Icon name={'check-circle'}
                        type='octicons'
                        color={colors.primaryColor}
                        backgroundColor='transparent'
                        style={{ marginTop: '19%', marginLeft: '3%' }} /> : null}
                </View>

                <StatsBar currUser={user} followers={otherUser.followers} following={otherUser.following} enteredRaffles={otherUser.enteredRaffles} navigation={navigation}></StatsBar>

                {user._id == null ? null : follow ? <View style={styles.followButton}>
                    <BlockButton
                        title="FOLLOW"
                        color="primary"
                        onPress={async () => {
                            if (enabled) {
                                setEnabled(false)
                                const updatedObj = await addFollower()
                                setUser(updatedObj)
                                setFollow(false)
                                setEnabled(true)
                            }
                        }}
                    ></BlockButton>
                </View> :
                    <View style={styles.followButton}>
                        <BlockButton
                            title="FOLLOWING"
                            color="secondary"
                            onPress={async () => {
                                if (enabled) {
                                    setEnabled(false)
                                    const updatedObj = await removeFollower()
                                    setUser(updatedObj)
                                    setFollow(true)
                                    setEnabled(true)
                                }
                            }}
                        ></BlockButton>
                    </View>
                }

                <View style={{ alignItems: 'center' }}>
                    {feedCards}
                </View>

            </ScrollView>
        </View>
    )
}
