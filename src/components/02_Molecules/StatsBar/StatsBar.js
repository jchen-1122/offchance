import React, {useState} from 'react'
import {View, Text, TouchableOpacity} from 'react-native'
import {styles} from './StatsBar.styling'

export default function(props) {
    if (props.followers === undefined || props.enteredRaffles === undefined) {
        return null
    }
    const [following, setFollowing] = useState([])

    const getUsers = async (users) => {
        const data = require('../../IP_ADDRESS.json')
        let res = []
        for (var i = 0; i < users.length; i++) {
            let response = await fetch('https://8f5d9a32.us-south.apigw.appdomain.cloud/users/id', {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({id : users[i]})
            })
            response = await response.json()
            response = response.user
            res.push(response)
        }
        return res
    }

    const handleFollowing = async () => {
        let following = await getUsers(props.following)
        if (following.length == 0){
            return
        }
        props.navigation.navigate('Following', {following: following , user: props.currUser})
    }

    const handleFollowers = async () => {
        let followers = await getUsers(props.followers)
        if (followers.length == 0){
            return
        }
        props.navigation.navigate('Followers', {followers: followers, user: props.currUser})
    }

    const handleEntered = async() => {
        // console.log(props.enteredRaffles)
        const data = require('../../IP_ADDRESS.json')
        let res = []
        //console.log(props.enteredRaffles)
        for (var raffle of props.enteredRaffles) {
            try {
                let response = await fetch('https://8f5d9a32.us-south.apigw.appdomain.cloud/raffle/id', {
                    method: "POST",
                    headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({id : raffle.raffleID})
                })
                response = await response.json()
                response = response.raffle
                res.push(response)
            } catch (e) {
                continue
            }
        }
        // console.log(res)
        props.navigation.navigate('SeeAll', { raffles: res, StatsBar__item__title: 'Entered Drawings' })
    }

    return (
    <View style={styles.StatsBar}>
        <TouchableOpacity style={styles.StatsBar__item} onPress={() => handleFollowers()}>
            <Text style={styles.StatsBar__item__number}>{props.followers.length}</Text>
            <Text style={styles.StatsBar__item__title}>followers</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.StatsBar__item} onPress={() => handleFollowing()}>
            <Text style={styles.StatsBar__item__number}>{props.following.length}</Text>
            <Text style={styles.StatsBar__item__title}>following</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.StatsBar__item} onPress={() => handleEntered()}>
            <Text style={styles.StatsBar__item__number}>{props.enteredRaffles.length}</Text>
            <Text style={styles.StatsBar__item__title}>entered</Text>
        </TouchableOpacity>
    </View>
    )
}