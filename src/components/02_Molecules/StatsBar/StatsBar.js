import React, {useState, useContext, } from 'react'
import {View, Text, TouchableOpacity} from 'react-native'
import {styles} from './StatsBar.styling'
import GlobalState from '../../globalState'

export default function(props) {
    if (props.followers === undefined) {
        return null
    }
    const [following, setFollowing] = useState([])
    const { user, setUser } = useContext(GlobalState)

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
        let following = await getUsers(user.following)
        props.navigation.navigate('Following', {following: following , user: user})
    }

    const handleFollowers = async () => {
        let followers = await getUsers(user.followers)
        props.navigation.navigate('Followers', {followers: followers, user: user})
    }

    let follower_length;
    let following_length;
    let enter_count;

    if (user._id) {
        follower_length = user.followers.length;
        following_length = user.following.length;
        enter_count = user.enteredRaffles.length;
    } else {
        follower_length = 0;
        following_length = 0;
        enter_count = 0;
    }

    // console.log('user id: ', user._id);
    // console.log('props: ', props);

    return (
    <View style={styles.StatsBar}>
        <TouchableOpacity style={styles.StatsBar__item} onPress={() => handleFollowers()}>
            <Text style={styles.number}>{follower_length}</Text>
            <Text style={styles.title}>followers</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.StatsBar__item} onPress={() => handleFollowing()}>
            <Text style={styles.number}>{following_length}</Text>
            <Text style={styles.title}>following</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.StatsBar__item} >
            <Text style={styles.number}>{enter_count}</Text>
            <Text style={styles.title}>entered</Text>
        </TouchableOpacity>
    </View>
    )
}
