import React, {useState} from 'react'
import {View, Text, TouchableOpacity} from 'react-native'
import {styles} from './StatsBar.styling'

export default function(props) {
    const [following, setFollowing] = useState([])

    const getUsers = async (users) => {
        const data = require('../../IP_ADDRESS.json')
        let res = []
        for (var i = 0; i < users.length; i++) {
            let response = await fetch('http://'+data.ipAddress+'/user/id/'+users[i])
            response = await response.json()
            res.push(response)
        }
        return res

    }

    const handleFollowing = async () => {
        let following = await getUsers(props.following)
        props.navigation.navigate('Following', {following: following , user: props.currUser})
    }

    const handleFollowers = async () => {
        let followers = await getUsers(props.followers)
        props.navigation.navigate('Followers', {followers: followers, user: props.currUser})
    }

    console.log('props: ', props)
    console.log('props followers: ', props.followers)

    return (
    <View style={styles.StatsBar}>
        <TouchableOpacity style={styles.StatsBar__item} onPress={() => handleFollowers()}>
            <Text style={styles.number}>{props.followers.length}</Text>
            <Text style={styles.title}>followers</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.StatsBar__item} onPress={() => handleFollowing()}>
            <Text style={styles.number}>{props.following.length}</Text>
            <Text style={styles.title}>following</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.StatsBar__item} >
            <Text style={styles.number}>{props.enteredRaffles.length}</Text>
            <Text style={styles.title}>entered</Text>
        </TouchableOpacity>
    </View>
    )
}
