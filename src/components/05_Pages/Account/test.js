import React, {useState} from 'react';
import { ScrollView, View, Text, Image, Animated, Button, Dimensions} from 'react-native'
import {utilities, fonts, colors} from '../../../settings/all_settings';
import BlockButton from '../../01_Atoms/Buttons/BlockButton/BlockButton';
import BottomNav from '../../02_Molecules/BottomNav/BottomNav'
import { COLOR } from 'react-native-material-ui';
import { color } from 'react-native-reanimated';

export default function Account({navigation}) {

    // To change height, go to BlockButton.styling.js/BlockButton_transparent:height

    return (
        <View style={utilities.container}>
            <View>
                <BlockButton
                title="Profile                                                          >"
                color="transparent"
                onPress={() => navigation.navigate('Profile')}/>
                <View
                  style={{
                    borderBottomColor: 'rgba(52, 52, 52, 0.3)',
                    borderBottomWidth: 1,
                  }}
                />
                <BlockButton
                title="Wallet                                                          >"
                color="transparent"
                onPress={() => navigation.navigate('Wallet')}/>
                <View
                  style={{
                    borderBottomColor: 'rgba(52, 52, 52, 0.3)',
                    borderBottomWidth: 1,
                  }}
                />
                <BlockButton
                title="How It Works                                            >"
                color="transparent"
                onPress={() => navigation.navigate('HowItWorks')}/>
                <View
                  style={{
                    borderBottomColor: 'rgba(52, 52, 52, 0.3)',
                    borderBottomWidth: 1,
                  }}
                />
                <BlockButton
                title="FAQ                                                             >"
                color="transparent"
                onPress={() => navigation.navigate('FAQ')}/>
                <View
                  style={{
                    borderBottomColor: 'rgba(52, 52, 52, 0.3)',
                    borderBottomWidth: 1,
                  }}
                />
                <BlockButton
                title="Request Business Account                 >"
                color="transparent"
                onPress={() => navigation.navigate('ReqBesAcct')}/>
                <View
                  style={{
                    borderBottomColor: 'rgba(52, 52, 52, 0.3)',
                    borderBottomWidth: 1,
                  }}
                />
                <BlockButton
                title="Log Out                                                     >"
                color="transparent"
                onPress={() => navigation.navigate('NotLogin')}/>
                <View
                  style={{
                    borderBottomColor: 'rgba(52, 52, 52, 0.3)',
                    borderBottomWidth: 1,
                  }}
                />
            </View>

            <BottomNav navigation={navigation} active={'Account'}></BottomNav>
        </View>
    )
}
