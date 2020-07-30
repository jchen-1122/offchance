import React, {useState, useContext}from 'react'
import { View, ScrollView, Text, Image, } from 'react-native'
import { Icon } from 'react-native-elements'
import {colors, fonts, utilities} from '../../../settings/all_settings'
import StatsBar from '../../02_Molecules/StatsBar/StatsBar'
import BlockButton from '../../01_Atoms/Buttons/BlockButton/BlockButton'
import {styles} from './OtherUser.styling'
import GlobalState from '../../globalState'
import { set } from 'react-native-reanimated'

export default function OtherUser({navigation, route})  {
    const {user, setUser} = useContext(GlobalState)
    const [follow, setFollow] = useState(user.following != null && !user.following.includes(route.params.user._id))
    const [enabled, setEnabled] = useState(true)

    const addFollower = async () => {
        const data = require('../../IP_ADDRESS.json')
        if (user.following.includes(route.params.user._id)) {
            return
        }
        const response = await fetch('http://'+data.ipAddress+'/user/edit/'+user._id,{
          method: "PATCH",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: makeAddJSON()
        })
        const json = await response.json()

        // followed user "follower" count also increases
        const response2 = await fetch('http://'+data.ipAddress+'/user/edit/'+route.params.user._id,{
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
        if (!user.following.includes(route.params.user._id)) {
            return
        }
        const response = await fetch('http://'+data.ipAddress+'/user/edit/'+user._id,{
          method: "PATCH",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: makeDeleteJSON()
        })
        const json = await response.json()

        // followed user "follower" count also decreases
        const response2 = await fetch('http://'+data.ipAddress+'/user/edit/'+route.params.user._id,{
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
        prevFollowing.push(route.params.user._id)
        console.log(prevFollowing)
        let data = {
            following: prevFollowing
        }
        return JSON.stringify(data)
    }

    // followed user "follower" count also increases
    const makeAddJSON2 = () => {
        let prevFollowing = route.params.user.followers
        if (route.params.user.followers.includes(user._id)) {
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
        for(var i = prevFollowing.length - 1; i >= 0; i--) {
            if(prevFollowing[i] === route.params.user._id) {
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
        let prevFollowing = route.params.user.followers
        for(var i = prevFollowing.length - 1; i >= 0; i--) {
            if(prevFollowing[i] === user._id) {
                prevFollowing.splice(i, 1);
            }
        }
        let data = {
            followers: prevFollowing
        }
        return JSON.stringify(data)
    }

    return (
        <View style={utilities.container}>
            <ScrollView>
                <Image source={{uri:route.params.user.profilePicture}} style={styles.profilePic}></Image>
                <Text style={styles.header_name}>{route.params.user.name}</Text>
                <View style={{flexDirection:'row', justifyContent:'center', }}>
                    <Text style={styles.header_username}>@{route.params.user.username}</Text>
                    {route.params.user.isHost ? <Icon name={'check-circle'}
                          type='octicons'
                          color={colors.primaryColor}
                          backgroundColor='transparent'
                          style={{marginTop:'19%', marginLeft:'3%'}}/> : null}
                </View>

                <StatsBar currUser={user} followers={route.params.user.followers} following={route.params.user.following} enteredRaffles={route.params.user.enteredRaffles} navigation={navigation}></StatsBar>

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
                </View>}

            </ScrollView>
        </View>
    )
}
