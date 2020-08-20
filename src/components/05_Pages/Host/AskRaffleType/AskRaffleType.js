import React, { useState } from 'react'
import { View, ScrollView, Text, Image, Dimensions } from 'react-native'
import BottomNav from '../../../02_Molecules/BottomNav/BottomNav'
import BlockButton from '../../../01_Atoms/Buttons/BlockButton/BlockButton';
import TextLink from '../../../01_Atoms/Buttons/TextLinks/TextLinks';
import { utilities, fonts, colors } from '../../../../settings/all_settings';
import styles from './AskRaffleType.styling';
import { set } from 'react-native-reanimated';
import { get_user } from '../../../fake_users/stub-users';

export default function AskRaffleType({ navigation }) {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    return (
        <View style={utilities.container}>
            <View style={styles.content}>
                <Text style={[fonts.h1, { marginTop: windowHeight * .2, textAlign: "center", fontSize: 23 }]}>What kind of drawing would you like to host?</Text>
                <BlockButton
                    title="DONATE TO ENTER"
                    color="primary"
                    style={{marginBottom: 5}}
                    onPress={() => {
                        navigation.navigate('NewRaffle', { type: 1 })
                    }} />
                <Text style={[styles.description,{marginBottom: 10}]}>Host a drawing to raise money for a charity or cause</Text>
                <BlockButton
                    title="ENTER TO BUY"
                    color="primary"
                    style={{marginBottom: 5}}
                    onPress={() => navigation.navigate('NewRaffle', { type: 2 })} />
                <Text style={styles.description}>
                    Host a drawing for a desirable product you want to sell via a random selection process
                </Text>
                <Text style={[styles.description, { marginTop: 10 }]}>
                    Charity partners receive All Net Proceeds - 3.5% cc processing fee + $0 Platform fee
                </Text>
            </View>
            <BottomNav navigation={navigation} active={'Home'}></BottomNav>
        </View>
    )
}
