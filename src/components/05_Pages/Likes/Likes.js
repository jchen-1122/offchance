import React from 'react'
import { View, Text } from 'react-native'
// import {fonts} from '../../../settings/fonts';
import {colors, fonts, utilities} from '../../../settings/all_settings';
import BottomNav from '../../02_Molecules/BottomNav/BottomNav'

function Likes({navigation}) {
    return (
        <View>
            <Text>this is a placeholder page for Likes</Text>
            <BottomNav navigation={navigation}></BottomNav>
        </View>
    )
}

export default Likes;