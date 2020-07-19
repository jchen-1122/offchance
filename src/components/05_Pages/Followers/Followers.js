import React from 'react'
import {ScrollView} from 'react-native'

import ListView from '../../04_Templates/ListView/ListView'
import { List } from 'native-base'

export default function Followers({navigation, route}) {
    let usersObj = route.params.followers
    let currUser = route.params.user

    // ListView takes in profilePic and our data is profilePicture :(
    // reformatting key profilePicture -> profilePic

    // following is dynamic based on if the current user follows the people following him

    usersObj.forEach(user => {
        user['profilePic'] = user['profilePicture']
        delete user['profilePicture']
        user['following'] = currUser['following'].includes(user['_id'])
    })

    return (
        <ScrollView>
            <ListView users={usersObj} title="Following"></ListView>
        </ScrollView>
    )
}