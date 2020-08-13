// Like button with Heart icon

import React, { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { styles } from "./LikeButton.styling";
import { Icon } from 'react-native-elements';
import Tooltip from '../../../02_Molecules/Tooltip/Tooltip';

function LikeButton(props) {
    const ip = require('../../../IP_ADDRESS.json')
    const currUser = props.currUser
    const setUser = props.setUser
    const raffle = props.raffle
    const navigation = props.navigation
    const inLikesPage = (props.inLikesPage != null) ? props.inLikesPage : false
    const [color, setColor] = useState((typeof currUser._id === 'undefined' ? true : currUser.likedRaffles.includes(raffle)))

    async function getLikes(id) {
        let response = await fetch('http://' + ip.ipAddress + '/raffle/id/' + id)
        response = await response.json()
        return response.amountLiked
    }

    const setLike = async () => {
        const ip = require('../../../IP_ADDRESS.json')
        const response = await fetch('http://' + ip.ipAddress + '/user/edit/' + currUser._id, {
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

    const setUnlike = async () => {
        const ip = require('../../../IP_ADDRESS.json')
        const response = await fetch('http://' + ip.ipAddress + '/user/edit/' + currUser._id, {
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
        let prevLikes = currUser.likedRaffles
        if (!prevLikes.includes(raffle)) {
            prevLikes.push(raffle)
        }
        let data = {
            likedRaffles: prevLikes
        }
        return JSON.stringify(data)
    }

    const makeDeleteJSON = () => {
        let prevLikes = currUser.likedRaffles
        for (var i = prevLikes.length - 1; i >= 0; i--) {
            if (prevLikes[i] === raffle) {
                prevLikes.splice(i, 1);
            }
        }
        let data = {
            likedRaffles: prevLikes
        }
        return JSON.stringify(data)
    }

    // for editing amountLiked field
    const editLikes = async(body) => {
        const response = await fetch('http://' + ip.ipAddress + '/raffle/edit/' + raffle, {
            method: "PATCH",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        const json = await response.json()
        return json

    }

    // increment number of amountLiked
    const incLikes = async() => {
        var likes = await getLikes(raffle)
        editLikes({amountLiked: likes+1})
    }

    // decrement number of amountLiked
    const decLikes = async() => {
        var likes = await getLikes(raffle)
        editLikes({amountLiked: likes-1})
    }

    if (inLikesPage) {
        return null
    }
    if (typeof currUser._id === 'undefined' || inLikesPage) {
        return (
            <TouchableOpacity style={styles.LikeButton}
                onPress={() => {
                    navigation.navigate('NotLogin')
                }}>
                <Icon name='heart-outline' type='material-community' />
            </TouchableOpacity>
        )
    }

    return (
        <TouchableOpacity style={[styles.LikeButton, props.style]}
            onPress={async () => {
                setColor(!color)
                if (!color) {
                    await setLike()
                    await incLikes()
                } else {
                    await setUnlike()
                    await decLikes()
                }
                setUser(currUser)
            }}>
            {color ? <Icon name='heart' type='material-community' color={'red'} /> :
                <Icon name='heart-outline' type='material-community' />}
        </TouchableOpacity>
    )
}

export default LikeButton;