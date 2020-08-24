import React, {useContext} from 'react'
import ListView from '../../../04_Templates/ListView/ListView'
import GlobalState from '../../../globalState'
import {ScrollView} from 'react-native'

export default function Top5List({navigation, route}) {
    const {user, setUser} = useContext(GlobalState)
    const users = route.params.users
    //console.log(users)
    return (
        <ScrollView>
            <ListView users={users} navigation={navigation} currUser={user} setUser={setUser}></ListView>
        </ScrollView>
    )
}