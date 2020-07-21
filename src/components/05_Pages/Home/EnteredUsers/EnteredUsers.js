// insta button + facebook button + login button

import React from 'react';
import {TouchableOpacity, Text, Image, View, ScrollView} from 'react-native';
import { utilities } from '../../../../settings/utilities';
import ListView from '../../../04_Templates/ListView/ListView';

function EnteredUsers(props){
    const data = require('../../../fake_users/stub-users.json')
    console.log(props.users)
    return (
        <View style={utilities.container}>
            <ScrollView>
                <ListView users={props.users} title="Entered Users" navigation={props.navigation} currUser={props.currUser} setUser={props.setUser}/>
            </ScrollView>
        </View>

    )
}

export default EnteredUsers;