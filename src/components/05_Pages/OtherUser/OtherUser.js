import React, {useState, useContext}from 'react'
import { View, ScrollView, Text, Image } from 'react-native'
import {colors, fonts, utilities} from '../../../settings/all_settings'
import StatsBar from '../../02_Molecules/StatsBar/StatsBar'
import BlockButton from '../../01_Atoms/Buttons/BlockButton/BlockButton'
import {styles} from './OtherUser.styling'
import GlobalState from '../../globalState'

export default function OtherUser({navigation, route})  {
    const {user, setUser} = useContext(GlobalState)
    const [follow, setFollow] = useState(!user.following.includes(route.params.user._id))
    const addFollower = async () => {
        const data = require('../../IP_ADDRESS.json')
        if (user.following.includes(route.params.user._id)) {
            return
        }
        const response = await fetch('http://'+data.ipAddress+':3000/user/edit/'+user._id,{
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
        if (!user.following.includes(route.params.user._id)) {
            return
        }
        const response = await fetch('http://'+data.ipAddress+':3000/user/edit/'+user._id,{
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
        let prevFollowing = user.following
        prevFollowing.push(route.params.user._id)
        console.log(prevFollowing)
        let data = {
            following: prevFollowing
        }
        return JSON.stringify(data)
    }

    const makeDeleteJSON = () => {
        let prevFollowing = user.following
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
                <Image source={{uri:route.params.user.profilePicture}} style={styles.profilePic}></Image>
                <Text style={styles.header_name}>{route.params.user.name}</Text>
                <Text style={styles.header_username}>@{route.params.user.username}</Text>

                <StatsBar currUser={user} followers={route.params.user.followers} following={route.params.user.following} enteredRaffles={route.params.user.enteredRaffles} navigation={navigation}></StatsBar>
                
                {follow ? <View style={styles.followButton}>
                    <BlockButton
                    title="FOLLOW"
                    color="secondary"
                    onPress={async () => {
                        const updatedObj = await addFollower()
                        setUser(updatedObj)
                        setFollow(false)
                    }}
                    ></BlockButton>
                </View> : 
                <View style={styles.followButton}>
                    <BlockButton
                    title="FOLLOWED"
                    color="primary"
                    onPress={async () => {
                        const updatedObj = await removeFollower()
                        setUser(updatedObj)
                        setFollow(true)
                    }}
                    ></BlockButton>
                </View>}

            </ScrollView>
        </View>
    )
}