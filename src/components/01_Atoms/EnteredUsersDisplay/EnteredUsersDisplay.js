
import React, { useState, useContext, useEffect } from 'react'
import { TouchableOpacity, Text, Image, View, ScrollView } from 'react-native';
import { fonts, utilities } from '../../../settings/all_settings';
import styles from './EnteredUsersDisplay.styling';
import GlobalState from '../../globalState';
import {user_logged_in} from '../../../functions/user_functions'

function EnteredUsersDisplay(props) {
    const ip = require('../../IP_ADDRESS.json')
    const { user, setUser } = useContext(GlobalState)
    const [countMsg, setCountMsg] = useState("No entries yet")
    const [image1, setImage1] = useState('') // uri for first profile image
    const [image2, setImage2] = useState('') // uri for second profile image
    const [user1, setUser1] = useState(null)
    const [userIds, setuserIds] = useState([])
    var enteredUsers;
    
    

    // sort entered users so the people you're following show up at the front
    const sortUsers = (users) => {
        if (!user_logged_in(user)) {
            return users
        }
        var entered = []
        // keep track of same ids
        var enteredIds = new Set([])
        for (let i = 0; i < users.length; i++) {
            if (!enteredIds.has(users[i].userID)) {
                let enteredUser = users[i]
                // if you're following them, add to the top
                if (user.following.includes(enteredUser.userID)) {
                    entered.unshift(enteredUser)
                }
                // if you're not following them, push to back
                else {
                    entered.push(enteredUser)
                }
                enteredIds.add(users[i].userID)
            }
        }
        return entered
    }

    React.useEffect(() => {
        // gets prof picture and username from db given certain use id
        const getUserInfo = async (userID, field) => {
            let response = await fetch('http://' + ip.ipAddress + '/user/id/' + userID)
            response = await response.json()
            if (field == 'profPic') {
                return response.profilePicture
            }
            else {
                return response.username
            }
        }

        // sets uri of the two profile pictures to the first two people in the list
        // also sets name of first user you see on card
        const renderImages = async (users) => {
            if (users.length > 0) {
                setImage1(await getUserInfo(enteredUsers[0].userID, 'profPic'))
                setUser1(await getUserInfo(enteredUsers[0].userID, 'username'))
            }
            if (users.length > 1) {
                setImage2(await getUserInfo(enteredUsers[1].userID, 'profPic'))
            }
        }

        const renderInfo = async () => {
            if (props.enteredUsers) {
                enteredUsers = sortUsers(props.enteredUsers)
                if (userIds.length === 0) {
                    for (var i = 0; i < enteredUsers.length; i++) {
                        let temp = userIds
                        temp.push(enteredUsers[i].userID)
                        setuserIds(temp)
                    }
                }
                await renderImages(enteredUsers)
                // changes display text if theres entered users
                if (enteredUsers.length > 0) {
                    setCountMsg("Entered by @" + user1 + ((enteredUsers.length > 1) ? " and " + (enteredUsers.length-1).toString() + " others" : ''))
                }
            }
        }
        renderInfo()

    }, [user1])

    const getUserObj = async (ids) => {
        let res = []
        for (var i = 0; i < ids.length; i++) {
            let response = await fetch('http://'+ip.ipAddress+'/user/id/'+ids[i])
            response = await response.json()
            res.push(response)
        }
        return res
    }

    // blank if no entered users
    if (!props.enteredUsers || props.enteredUsers.length == 0){
        return null
    }
    return (
        <TouchableOpacity onPress={async () => {
            const userObjs = await getUserObj(userIds)
            props.navigation.navigate('EnteredUsers', {userObjs: userObjs})}}>
            <View style={styles.container}>
                {image1 != '' ? <Image style={[styles.image,(props.enteredUsers.length > 1) ? styles.image_overlapped:{ height: 20, width: 20, marginRight: 5 }]} source={{ uri: image1 }} /> : null}
                {image2 != '' ? <Image style={[styles.image, { marginRight: 5 }]} source={{ uri: image2 }} /> : null}
                <Text style={fonts.p}>{countMsg}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default EnteredUsersDisplay;
