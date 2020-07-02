import * as React from 'react';
import { View, Text } from 'react-native'
// import {fonts} from '../../../settings/fonts';
import {colors, fonts, utilities} from '../../../settings/all_settings';
import BottomNav from '../../02_Molecules/BottomNav/BottomNav'


export default function Home({navigation}) {
    return (
        <View style={{justifyContent: 'center', flex: 1}}>
            <Text>this is a placeholder page for Home</Text>
            {/* change so the margin is not hardcoded */}
            <View style={{marginTop: '175%'}}>
                <BottomNav></BottomNav>
            </View> 
        </View>
    )
}