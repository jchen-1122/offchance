import React from 'react'
import { View, Text } from 'react-native'
// import {fonts} from '../../../settings/fonts';
import TopNav from '../../../02_Molecules/TopNav/TopNav'
import BottomNav from '../../../02_Molecules/BottomNav/BottomNav'

function Explore({navigation}) {
    return (
        <View>
            <TopNav navigation={navigation}></TopNav>
            <Text>this is a placeholder page for Explore</Text>
            <BottomNav navigation={navigation}></BottomNav>
        </View>
    )
}

export default Explore;