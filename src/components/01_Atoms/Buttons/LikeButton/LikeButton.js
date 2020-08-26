import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { styles } from "./LikeButton.styling";
import { Icon } from 'react-native-elements';

function LikeButton(props) {
    const ip = require('../../../IP_ADDRESS.json')
    const currUser = props.currUser
    const setUser = props.setUser
    const raffle = props.raffle
    const navigation = props.navigation
    const inLikesPage = (props.inLikesPage != null) ? props.inLikesPage : false
    const [color, setColor] = useState((typeof currUser._id === 'undefined' ? true : currUser.likedRaffles.includes(raffle)))

    // gets the raffle object
    async function getRaffle(id) {
        let response = await fetch('http://' + ip.ipAddress + '/raffle/id/' + id)
        response = await response.json()
        return response
    }

    // USER PATCH--------------------------------------------------------------------------------
    // adds raffle to user.likedRaffles
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
    // creates body for user patch request (add)
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

    // removes raffle in user.likedRaffles
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
    // creates body for user patch request (delete)
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


    // RAFFLE PATCH--------------------------------------------------------------------------------
    // for editing raffle.amountLiked field
    const editLikes = async (body) => {
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
    const incLikes = async () => {
        var raf = await getRaffle(raffle)
        var likes = raf.amountLiked
        var users = raf.likedUsers || []
        users.push(currUser._id)
        editLikes({ amountLiked: likes + 1, likedUsers: users})
    }

    // decrement number of amountLiked
    const decLikes = async () => {
        var raf = await getRaffle(raffle)
        var likes = raf.amountLiked
        var users = raf.likedUsers || []
        users.splice(users.indexOf(currUser._id),1)
        editLikes({ amountLiked: likes - 1, likedUsers: users })
    }

    // can't like a raffle thats in the likes page
    if (inLikesPage) {
        return null
    }
    // if they're not logged in, it will prompt them
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

    // const setLike = async () => {
    //     const ip = require('../../../IP_ADDRESS.json')
    //     const response = await fetch('http://' + ip.ipAddress + '/user/edit/' + currUser._id, {
    //         method: "PATCH",
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json'
    //         },
    //         body: makeAddJSON()
    //     })
    //     const json = await response.json()
    //     return json
    // }

    // const makeAddJSON = () => {
    //     let prevLikes = currUser.likedRaffles
    //     if (!prevLikes.includes(raffle)) {
    //         prevLikes.push(raffle)
    //     }
    //     let data = {
    //         likedRaffles: prevLikes
    //     }
    //     return JSON.stringify(data)
    // }

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
                <Icon name='heart-outline' type='material-community' color={props.color}/>}
        </TouchableOpacity>
    )
}

export default LikeButton;