import React, {useState} from 'react'
import { View, ScrollView, Text, Image } from 'react-native'
import BottomNav from '../../../02_Molecules/BottomNav/BottomNav'
import {utilities, fonts, colors} from '../../../../settings/all_settings';
import { set } from 'react-native-reanimated';
import { get_user } from '../../../fake_users/stub-users';

export default function MyEntries({navigation}) {

    return (
        <View style={utilities.container}>
            <Text>This is a placeholder for MYENTRIES page.</Text>
            <BottomNav navigation={navigation} active={'Account'}></BottomNav>
        </View>
    )
}
