import React, {useState}from 'react'
import { View, ScrollView, Text, Image } from 'react-native'
import {colors, fonts, utilities} from '../../../settings/all_settings'
import StatsBar from '../../02_Molecules/StatsBar/StatsBar'
import BlockButton from '../../01_Atoms/Buttons/BlockButton/BlockButton'
import {styles} from './OtherUser.styling'

export default function OtherUser({navigation, route})  {
    const [follow, setFollow] = useState(!route.params.currUser.following.includes(route.params.user._id))
    const addFollower = async () => {
        const data = require('../../IP_ADDRESS.json')
        if (route.params.currUser.following.includes(route.params.user._id)) {
            return
        }
        const response = await fetch('http://'+data.ipAddress+':3000/user/edit/'+route.params.currUser._id,{
          method: "PATCH",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },  
          body: makeAddJSON()
        })
        const json = await response.json()
        return json
    }

    const removeFollower = async () => {
        const data = require('../../IP_ADDRESS.json')
        if (!route.params.currUser.following.includes(route.params.user._id)) {
            return
        }
        const response = await fetch('http://'+data.ipAddress+':3000/user/edit/'+route.params.currUser._id,{
          method: "PATCH",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },  
          body: makeDeleteJSON()
        })
        const json = await response.json()
        return json
    }

    const makeAddJSON = () => {
        let prevFollowing = route.params.currUser.following
        prevFollowing.push(route.params.user._id)
        console.log(prevFollowing)
        let data = {
            following: prevFollowing
        }
        return JSON.stringify(data)
    }

    const makeDeleteJSON = () => {
        let prevFollowing = route.params.currUser.following
        for(var i = prevFollowing.length - 1; i >= 0; i--) {
            if(prevFollowing[i] === route.params.user._id) {
                prevFollowing.splice(i, 1);
            }
        }
        console.log(prevFollowing)
        let data = {
            following: prevFollowing
        }
        return JSON.stringify(data)
    }

    return (
        <View style={utilities.container}>
            <ScrollView>
                <Image source={{uri:route.params.user.profilePic}} style={styles.profilePic}></Image>
                <Text style={styles.header_name}>{route.params.user.name}</Text>
                <Text style={styles.header_username}>@{route.params.user.username}</Text>

                <StatsBar currUser={route.params.currUser} followers={route.params.user.followers} following={route.params.user.following} enteredRaffles={route.params.user.enteredRaffles} navigation={navigation}></StatsBar>
                
                {follow ? <View style={styles.followButton}>
                    <BlockButton
                    title="FOLLOW"
                    color="secondary"
                    onPress={async () => {
                        await addFollower()
                        setFollow(false)
                    }}
                    ></BlockButton>
                </View> : 
                <View style={styles.followButton}>
                    <BlockButton
                    title="FOLLOWED"
                    color="primary"
                    onPress={async () => {
                        await removeFollower()
                        setFollow(true)
                    }}
                    ></BlockButton>
                </View>}

            </ScrollView>
        </View>
    )
}