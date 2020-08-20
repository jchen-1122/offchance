import React, {useContext} from 'react'
import {ScrollView} from 'react-native'

import ListView from '../../../04_Templates/ListView/ListView'
import { List } from 'native-base'
import GlobalState from '../../../globalState'

export default function Followers({navigation, route}) {
    let usersObj = route.params.followers
    const {user, setUser} = useContext(GlobalState)

    // ListView takes in profilePic and our data is profilePicture :(
    // reformatting key profilePicture -> profilePic

    // following is dynamic based on if the current user follows the people following him

    // usersObj.forEach(user => {
    //     user['profilePic'] = user['profilePicture']
    //     delete user['profilePicture']
    // })

    return (
        <ScrollView>
            <ListView users={usersObj} navigation={navigation} currUser={user} setUser={setUser}></ListView>
        </ScrollView>
    )
}