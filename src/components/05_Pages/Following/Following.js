import React, {useContext} from 'react'
import {ScrollView} from 'react-native'

import ListView from '../../04_Templates/ListView/ListView'
import GlobalState from '../../globalState'

export default function Following({navigation, route}) {
    let usersObj = route.params.following
    const {user, setUser} = useContext(GlobalState)
    
    // ListView takes in profilePic and our data is profilePicture :(
    // reformatting key profilePicture -> profilePic

    // usersObj.forEach(user => {
    //     user['profilePic'] = user['profilePicture']
    //     delete user['profilePicture']
    // })

    return (
        <ScrollView>
            <ListView users={usersObj} title="Following" navigation={navigation} currUser={user} setUser={setUser}></ListView>
        </ScrollView>
    )
}