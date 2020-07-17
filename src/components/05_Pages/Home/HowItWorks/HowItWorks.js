import React, {useState} from 'react';
import { ScrollView, View, Text, Image, Animated, Button, Dimensions} from 'react-native'
import {utilities, fonts, colors} from '../../../../settings/all_settings';
import styles from './HowItWorks.styling';
import BottomNav from '../../../02_Molecules/BottomNav/BottomNav'
import { COLOR } from 'react-native-material-ui';
import { color } from 'react-native-reanimated';

export default function HowItWorks({navigation}) {
    const images = [require('../../../../../assets/images/10-chance-lives.png'),
                    require('../../../../../assets/images/RPS-Game.png'),
                    require('../../../../../assets/images/wins-chance.png'),
                    require('../../../../../assets/images/10-chance-claim.png'),];

    const gif = require('../../../../../assets/images/vanfleet.gif');

    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height - 170;

    // uncomment for one image example
    // const images = [require('../../../../assets/images/dwightSchrute.jpg')]
    return (
        <View style={utilities.container}>
            <ScrollView contentContainerStyle={utilities.scrollview}>

                <View style={{width: windowWidth, height:windowHeight, backgroundColor:"white"}}>
                    <View style={styles.content}>
                        <Text style={[fonts.h1, {marginTop: 40, textAlign: "center", fontSize: 23}]}>Welcome to Off Chance Mobile! How LIVE DRAWING Works:</Text>
                        <Text style={[fonts.p, {marginTop: 100, textAlign: 'center', fontSize: 18}]}>1. Donate to receive chances for drawings and get an equal amount of Lives to play games and Win bonus chances. </Text>
                        <Image source={images[0]} style={{marginTop: 60, justifyContent: 'center', alignItems: 'center'}}></Image>
                    </View>
                </View>

                <View style={{width: windowWidth, height:windowHeight, backgroundColor:"black"}}>
                    <View style={styles.content}>
                        <Text style={[fonts.p, {marginTop: 40, textAlign: 'center', fontSize: 18, color: 'white'}]}>2. Use Lives to play Rock, Paper, Scissors against others and earn additional chances to win drawing prizes. </Text>
                        <Image source={images[1]} style={{marginTop: 40, justifyContent: 'center', alignItems: 'center',}}></Image>
                    </View>
                </View>

                <View style={{width: windowWidth, height:windowHeight, backgroundColor:"white"}}>
                    <View style={styles.content}>
                        <Text style={[fonts.p, {marginTop: 100, textAlign: 'center', fontSize: 18}]}>3. At the end, the number of your wins correlates to a number of bonus chances you can use for the live drawing. </Text>
                        <Image source={images[2]} style={{marginTop: 150, justifyContent: 'center', alignItems: 'center',}}></Image>
                    </View>
                </View>

                <View style={{width: windowWidth, height:windowHeight, backgroundColor:"black"}}>
                    <View style={styles.content}>
                        <Text style={[fonts.p, {marginTop: 100, textAlign: 'center', fontSize: 18, color: 'white'}]}>4. The more chances you buy, the more likely you’ll win - whether it be the grand prize or extra chances for another raffle of your choice. </Text>
                        <Image source={images[3]} style={{marginTop: 70, justifyContent: 'center', alignItems: 'center'}}></Image>
                    </View>
                </View>

                <View style={{width: windowWidth, height:windowHeight, backgroundColor:"white"}}>
                    <View style={styles.content}>
                        <Text style={[fonts.p, {marginTop: 100, textAlign: 'center', fontSize: 18}]}>5. The most important part is to HAVE FUN and GOOD LUCK! </Text>
                        <Image source={Date.now() ? gif : None} style={styles.gifStyle, {marginTop: 80, justifyContent: 'center', alignItems: 'center', width: 350, height:300}}></Image>
                    </View>
                </View>

            </ScrollView>
            <BottomNav navigation={navigation} active={'Home'}></BottomNav>
        </View>
    )
}
