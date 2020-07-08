import React, {useState} from 'react'
import { View, Text } from 'react-native'
// import {fonts} from '../../../settings/fonts';
import {colors, fonts, utilities} from '../../../settings/all_settings';
import DropDownPicker from 'react-native-dropdown-picker';
import BottomNav from '../../02_Molecules/BottomNav/BottomNav'

function Likes({navigation}) {
    const [state, setState] = useState('uk')
    return (
        <View style={utilities.container}>
            <Text>this is a placeholder page for Likes</Text>
            <BottomNav navigation={navigation} active={'Likes'}></BottomNav>
        </View>
    )
}

export default Likes;