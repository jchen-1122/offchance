import React, { useState } from 'react'
import { View, ScrollView, Text, Image, Dimensions } from 'react-native'
import BottomNav from '../../../02_Molecules/BottomNav/BottomNav'
import BlockButton from '../../../01_Atoms/Buttons/BlockButton/BlockButton';
import { Icon } from 'react-native-elements'
import { utilities, fonts, colors } from '../../../../settings/all_settings';
import styles from './AskRaffleType.styling';

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
                    style={{ marginBottom: 5 }}
                    onPress={() => {
                        navigation.navigate('NewRaffle', { type: 1 })
                    }} />
                <View style={styles.description}>
                    <Icon name="currency-usd" type="material-community" style={styles.description__symbol} color={colors.darkGreen} />
                    <Text style={[styles.description__text, { marginBottom: 10 }]}>Host a drawing to raise money for a charity or cause</Text>
                </View>

                <BlockButton
                    title="ENTER TO BUY"
                    color="primary"
                    style={{ marginBottom: 5 }}
                    onPress={() => navigation.navigate('NewRaffle', { type: 2 })} />
                <View style={styles.description}>
                    <Icon name="account-multiple" type="material-community" style={styles.description__symbol} color={colors.darkGreen} />
                    <Text style={styles.description__text}>
                        Host a drawing with a buy now price for winner selected by random drawing, $2 or 3 chances entry per person
                </Text>
                </View>
                <View style={styles.description}>
                    <Icon name="percent" type="material-community" style={styles.description__symbol} color={colors.darkGreen} />
                    <Text style={[styles.description__text]}>
                        Charity partners receive All Net Proceeds - 3.5% cc processing fee + $0 Platform fee
                </Text>
                </View>
            </View>
            <BottomNav navigation={navigation} active={'Home'}></BottomNav>
        </View>
    )
}
