// insta button + facebook button + login button

import React, {useEffect, useContext, useState} from 'react';
import {TouchableOpacity, Text, Image, View, ScrollView} from 'react-native';
import { utilities } from '../../../../settings/utilities';
import ListView from '../../../04_Templates/ListView/ListView';
import GlobalState from '../../../globalState';

function EnteredUsers({navigation, route}){
    const ip = require('../../../IP_ADDRESS.json')
    const ids = route.params.userIDs
    const {user, setUser} = useContext(GlobalState)
    const [userObjs, setuserObjs] = useState([])
    useEffect(() => {
        async function getUser(id) {
            let response = await fetch('http://' + ip.ipAddress + ':3000/user/id/' + id)
            response = await response.json()
            let tempObjs = userObjs
            tempObjs.push(response)
            setuserObjs(tempObjs)
        }
        for (var i = 0; i < ids.length; i++) {
            getUser(ids[i])
        }
    }, [])
    return (
        <View style={utilities.container}>
            <ScrollView>
                <ListView users={userObjs} title="Entered Users" navigation={navigation} currUser={user} setUser={setUser}/>
            </ScrollView>
        </View>

    )
}

export default EnteredUsers;