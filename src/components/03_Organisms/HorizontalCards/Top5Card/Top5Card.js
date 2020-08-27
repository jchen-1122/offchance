import React, {useState} from 'react';
import { Text, Image, View, TouchableOpacity } from 'react-native';
import styles from './Top5Card.styling';
import BlockButton from '../../../01_Atoms/Buttons/BlockButton/BlockButton'
import { global, fonts } from '../../../../settings/all_settings'
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
        const response = await fetch('https://8f5d9a32.us-south.apigw.appdomain.cloud/users/edit',{
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: makeAddJSON(user)
        })
        let json = await response.json()
        json = json.user
        // followed user "follower" count also increases
        const response2 = await fetch('https://8f5d9a32.us-south.apigw.appdomain.cloud/users/edit',{
          method: "POST",
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
        const response = await fetch('https://8f5d9a32.us-south.apigw.appdomain.cloud/users/edit',{
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: makeDeleteJSON(user)
        })
        let json = await response.json()
        json = json.user
        // followed user "follower" count also decreases
        const response2 = await fetch('https://8f5d9a32.us-south.apigw.appdomain.cloud/users/edit',{
          method: "POST",
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
        data["id"] = currUser._id
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
        data["id"] = user._id
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
        data["id"] = currUser._id
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
        data["id"] = user._id
        return JSON.stringify(data)
    }
    
    return (
        <View style={global.exploreCard}>
            <TouchableOpacity style={styles.Top5Card__profile} onPress={() => props.navigation.navigate('OtherUser',{user: user})}>
                <Image style={styles.Top5Card__profilePicture} source={{ uri: user.profilePicture }} />
                <Text style={[fonts.h3, styles.Top5Card__username]}>@{user.username}</Text>
                {/* {(user.city) ? <Text style={styles.city}>{user.city}</Text>:null} */}
            </TouchableOpacity>
            {
                (currUser._id == user._id) ?
                <View style={{height: 25, marginVertical: 15}}/>:
                !Object.keys(currUser).includes('following') ? null : currUser.following.includes(user._id)  ? 
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
                />
            }

        </View>
    )
}

export default Top5Card;