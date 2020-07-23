import React, {useState} from 'react'
import { View, Text } from 'react-native'
import {colors, fonts, utilities} from '../../../settings/all_settings';
import BottomNav from '../../02_Molecules/BottomNav/BottomNav'

function Social({navigation}) {
    const [state, setState] = useState('uk')
    return (
        <View style={utilities.container}>
            <Text>this is a placeholder page for Social</Text>
            <BottomNav navigation={navigation} active={'Social'}></BottomNav>
        </View>
    )
}

export default Social;