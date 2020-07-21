import React, {useState} from 'react'
import { View, ScrollView, Text, Image } from 'react-native'
import BottomNav from '../../../02_Molecules/BottomNav/BottomNav'
import {utilities, fonts, colors} from '../../../../settings/all_settings';
import { set } from 'react-native-reanimated';
import { get_user } from '../../../fake_users/stub-users';

export default function ReqBesAcct({navigation}) {

    return (
        <View style={utilities.container}>
            <Text>This is a placeholder for ReqBesAcct page.</Text>
            <BottomNav navigation={navigation} active={'Account'}></BottomNav>
        </View>
    )
}
