import React from 'react'
import { View, Text } from 'react-native'
import { utilities } from '../../../../settings/all_settings';
import TopNav from '../../../02_Molecules/TopNav/TopNav'
import BottomNav from '../../../02_Molecules/BottomNav/BottomNav'
import Card from '../../../03_Organisms/Card/Card';
import Nswitch from '../../../../../assets/images/nintendoSwitch.jpeg'

function YourFeed({navigation}) {
    return (
        <View style={utilities.container}>
            <TopNav navigation={navigation}  active='Your Feed' />
            <Card />            
            <BottomNav navigation={navigation} active={'Home'}></BottomNav>
        </View>
    )
}

export default YourFeed;