import React, {useState, useContext, useEffect} from 'react'
import { TouchableOpacity, Text, Image, View, ScrollView } from 'react-native';
import { fonts, utilities } from '../../../settings/all_settings';
import styles from './EnteredUsersDisplay.styling';
import GlobalState from '../../globalState'

function EnteredUsersDisplay(props) {
    const {user, setUser} = useContext(GlobalState)
    // console.log(user.following.includes("5f17187efe0108ee8b5e5c0d"))
    var enteredUsers = []

    if (props.enteredUsers) {
        // sort entered users so the people you're following show up at the front
        for (let i = 0; i < props.enteredUsers.length; i++) {
            let enteredUser = props.enteredUsers[i]
            if (user.following.includes(enteredUser.userID)){
                enteredUsers.unshift(enteredUser)
            }
            else{
                enteredUsers.push(enteredUser)
            }
        }
        console.log(enteredUsers)
    }

    let enteredUsersCount = "No entries yet"
    if (props.enteredUsers && props.enteredUsers.length > 0) {
        enteredUsersCount = "Entered by user 1 and " + props.enteredUsers.length.toString() + " others"
    }
    return (
        <TouchableOpacity onPress={() => props.navigation.navigate('EnteredUsers')}>
            <View style={styles.container}>
                <Image style={[styles.image, styles.image_overlapped]} source={{ uri: "https://i.pinimg.com/originals/dc/24/88/dc2488feb2d6dc4750a95a1f715c67d8.jpg" }} />
                <Image style={styles.image} source={{ uri: "https://vignette.wikia.nocookie.net/avatar/images/7/7a/Katara_smiles_at_coronation.png/revision/latest?cb=20150104171449" }} />
                <Text style={[fonts.p, { marginLeft: 5 }]}>{enteredUsersCount}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default EnteredUsersDisplay;