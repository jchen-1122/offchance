import React from 'react'
import {ScrollView} from 'react-native'

import ListView from '../../04_Templates/ListView/ListView'

export default function Following({navigation, route}) {
    let usersObj = route.params.following

    // ListView takes in profilePic and our data is profilePicture :(
    // reformatting key profilePicture -> profilePic

    usersObj.forEach(user => {
        user['profilePic'] = user['profilePicture']
        delete user['profilePicture']
    })

    return (
        <ScrollView>
            <ListView users={usersObj} title="Following" navigation={navigation} currUser={route.params.user}></ListView>
        </ScrollView>
    )
}