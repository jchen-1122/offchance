import React from 'react'
import { View, Text } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { colors, utilities } from '../../../../settings/all_settings';
import TopNav from '../../../02_Molecules/TopNav/TopNav'
import BottomNav from '../../../02_Molecules/BottomNav/BottomNav';

import ListView from '../../../04_Templates/ListView/ListView';
import GridView from '../../../04_Templates/GridView/GridView';

function Explore({navigation}) {
    // gets 5 people from stub api
    const data = require('../../../fake_users/stub-users.json');
    let users = [];
    for (let i=0; i<5; i++){
        users.push(data.users[i])
    }
    return (
        <View style={utilities.container}>
            <ScrollView>
                <TopNav navigation={navigation} active='Explore'/>
                <ListView title="Top 5 Donors" users={users} currUser={{}}/>
                <GridView title="Latest Winners" bgColor="white" Gridtype="winner" navigation={navigation}/>
            </ScrollView>

            <BottomNav navigation={navigation} active={'Home'}></BottomNav>
        </View>
    )
}

export default Explore;