import React, {useState} from 'react';
import { Text, Image, View, TouchableOpacity } from 'react-native';
import styles from './Top5Card.styling';
import BlockButton from '../../../01_Atoms/Buttons/BlockButton/BlockButton'
import { utilities, fonts } from '../../../../settings/all_settings'
import { set } from 'react-native-reanimated';

// for small, unclickable cards like in Latest Winners
function Top5Card(props) {
    let user = props.data
    let currUser = props.currUser
    let setUser = props.setUser
    const [enabled, setEnabled] = useState(true)
    const data = require('../../../IP_ADDRESS.json')

    const addFollower = async (user) => {
        if (currUser.following.includes(user._id)) {
            return
        }
        const response = await fetch('http://'+data.ipAddress+'/user/edit/'+currUser._id,{
          method: "PATCH",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: makeAddJSON(user)
        })
        const json = await response.json()
        // followed user "follower" count also increases
        const response2 = await fetch('http://'+data.ipAddress+'/user/edit/'+user._id,{
          method: "PATCH",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: makeAddJSON2(user)
        })
        return json
    }

    const removeFollower = async (user) => {
        if (!currUser.following.includes(user._id)) {
            return
        }
        const response = await fetch('http://'+data.ipAddress+'/user/edit/'+currUser._id,{
          method: "PATCH",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: makeDeleteJSON(user)
        })
        const json = await response.json()
        // followed user "follower" count also decreases
        const response2 = await fetch('http://'+data.ipAddress+'/user/edit/'+user._id,{
          method: "PATCH",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: makeDeleteJSON2(user)
        })
        return json
    }

    const makeAddJSON = (user) => {
        let prevFollowing = currUser.following
        prevFollowing.push(user._id)
        let data = {
            following: prevFollowing
        }
        return JSON.stringify(data)
    }

    const makeAddJSON2 = (user) => {
        let prevFollowing = user.followers
        if (user.followers.includes(currUser._id)) {
            return JSON.stringify(prevFollowing)
        }
        prevFollowing.push(currUser._id)
        let data = {
            followers: prevFollowing
        }
        return JSON.stringify(data)
    }

    const makeDeleteJSON = (user) => {
        let prevFollowing = currUser.following
        for(var i = prevFollowing.length - 1; i >= 0; i--) {
            if(prevFollowing[i] === user._id) {
                prevFollowing.splice(i, 1);
            }
        }
        let data = {
            following: prevFollowing
        }
        return JSON.stringify(data)
    }

    const makeDeleteJSON2 = (user) => {
        let prevFollowing = user.followers
        for(var i = prevFollowing.length - 1; i >= 0; i--) {
            if(prevFollowing[i] === currUser._id) {
                prevFollowing.splice(i, 1);
            }
        }
        let data = {
            followers: prevFollowing
        }
        return JSON.stringify(data)
    }
    
    return (
        <View style={utilities.exploreCard}>
            <TouchableOpacity style={styles.touchable} onPress={() => props.navigation.navigate('OtherUser',{user: user})}>
                <Image style={styles.image} source={{ uri: user.profilePicture }} />
                <Text style={[fonts.h3, styles.name]}>@{user.username}</Text>
            </TouchableOpacity>
            {currUser.following.includes(user._id)  ? 
                <BlockButton color="tertiary" size="small" title='FOLLOWING'
                onPress={async () => {
                    if (enabled) {
                        setEnabled(false)
                        const userObj = await removeFollower(user)
                        setUser(userObj)
                        setEnabled(true)
                    }
                }}
                /> :
                <BlockButton color="primary" size="small" title='FOLLOW'
                onPress={async () => {
                    if (enabled) {
                        setEnabled(false)
                        const userObj = await addFollower(user)
                        setUser(userObj)
                        setEnabled(true)
                    }
                }}
                />}
        </View>
    )
}

export default Top5Card;