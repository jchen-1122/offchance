import React, {useState, useContext, useEffect} from 'react'
import { TouchableOpacity, Text, Image, View, ScrollView } from 'react-native';
import { fonts, utilities } from '../../../settings/all_settings';
import styles from './EnteredUsersDisplay.styling';
import GlobalState from '../../globalState'

function EnteredUsersDisplay(props) {

    const getUser = async (id) => {
        const data = require('../../IP_ADDRESS.json')
        const response = await fetch('http://'+data.ipAddress+':3000/user/id/'+id)
        const json = await response.json()
        return json
    }

    const {user, setUser} = useContext(GlobalState)
    const [enteredUsers, setEnteredUsers] = useState([])

    const getUserObjs = async () => {
        var enteredUsers = []
    
        if (props.enteredUsers) {
            // sort entered users so the people you're following show up at the front
            for (let i = 0; i < props.enteredUsers.length; i++) {
                let enteredUser = await getUser(props.enteredUsers[i].userID)
                // if you're following them, add to the top
                if (user.following.includes(enteredUser.userID)){
                    enteredUsers.unshift(enteredUser)
                }
                // if you're not following them, push to back
                else{
                    enteredUsers.push(enteredUser)
                }
            }
        }
        return enteredUsers
    }

    useEffect(() => {
        async function getObjs() {
            const usersObj = await getUserObjs()
            setEnteredUsers(usersObj)
        }
        getObjs()

    })

    // conditionally display text if there's entries
    let enteredUsersCount = "No entries yet"
    if (props.enteredUsers && props.enteredUsers.length > 0) {
        enteredUsersCount = "Entered by user1 and " + enteredUsers.length.toString() + " others"
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