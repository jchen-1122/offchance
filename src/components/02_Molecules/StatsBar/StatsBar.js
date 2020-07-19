import React, {useState} from 'react'
import {View, Text, TouchableOpacity} from 'react-native'
import {styles} from './StatsBar.styling'

export default function(props) {
    const [following, setFollowing] = useState([])

    const getUsers = async (users) => {
        const data = require('../../IP_ADDRESS.json')
        let res = []
        for (var i = 0; i < users.length; i++) {
            let response = await fetch('http://'+data.ipAddress+':3000/user/id/'+users[i])
            response = await response.json()
            res.push(response)
        }
        return res
        
    }

    const handleFollowing = async () => {
        let following = await getUsers(props.following)
        props.navigation.navigate('Following', following)
    }

    const handleFollowers = async () => {
        let followers = await getUsers(props.followers)
        props.navigation.navigate('Followers', {followers: followers, user: props.currUser})
    }

    return (
    <View>
        <View style={styles.row}>
            <TouchableOpacity onPress={() => handleFollowers()}><Text style={styles.follower}>{props.followers.length}</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => handleFollowing()}><Text style={styles.number}>{props.following.length}</Text></TouchableOpacity>
            <TouchableOpacity><Text style={styles.number}>{props.enteredRaffles.length}</Text></TouchableOpacity>
        </View>
        <View style={styles.row}>
            <TouchableOpacity onPress={() => handleFollowers()}><Text style={styles.followerTitle}>followers</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => handleFollowing()}><Text style={styles.title}>following</Text></TouchableOpacity>
            <TouchableOpacity><Text style={styles.title}>entered</Text></TouchableOpacity>
        </View>
    </View>
    )
}