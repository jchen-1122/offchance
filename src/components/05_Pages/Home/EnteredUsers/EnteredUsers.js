// insta button + facebook button + login button

import React, {useEffect, useContext, useState} from 'react';
import {TouchableOpacity, Text, Image, View, ScrollView} from 'react-native';
import { utilities } from '../../../../settings/utilities';
import ListView from '../../../04_Templates/ListView/ListView';
import GlobalState from '../../../globalState';

function EnteredUsers({navigation, route}){
    const userObjs = route.params.userObjs
    const {user, setUser} = useContext(GlobalState)
    return (
        <View style={utilities.container}>
            <ScrollView>
                <ListView users={userObjs} title="Entered Users" navigation={navigation} currUser={user} setUser={setUser}/>
            </ScrollView>
        </View>

    )
}

export default EnteredUsers;