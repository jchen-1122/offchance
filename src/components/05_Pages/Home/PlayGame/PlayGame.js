import React from 'react'
import { View, Text } from 'react-native'
// import {fonts} from '../../../settings/fonts';
import {colors, fonts, utilities} from '../../../../settings/all_settings';
import BottomNav from '../../../02_Molecules/BottomNav/BottomNav'

function PlayGame({navigation}) {
    return (
        <View style={utilities.container}>
            <Text>this is a placeholder page for the Game</Text>
            <BottomNav navigation={navigation} active={'Home'}></BottomNav>
        </View>
    )
}

export default PlayGame;