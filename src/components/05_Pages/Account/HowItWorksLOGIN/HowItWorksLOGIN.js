import React, {useState} from 'react';
import { ScrollView, View, Text, Image, Animated, Button, Dimensions} from 'react-native'
import {utilities, fonts, colors} from '../../../../settings/all_settings';
import styles from './HowItWorksLOGIN.styling';
import BottomNav from '../../../02_Molecules/BottomNav/BottomNav'
import BlockButton from '../../../01_Atoms/Buttons/BlockButton/BlockButton';
import { COLOR } from 'react-native-material-ui';
import { color } from 'react-native-reanimated';

export default function HowItWorksLOGINa({navigation}) {
    const images = [require('../../../../../assets/images/10-chance-lives.png'),
                    require('../../../../../assets/images/RPS-Game.png'),
                    require('../../../../../assets/images/wins-chance.png'),
                    require('../../../../../assets/images/10-chance-claim.png'),];

    const gif = require('../../../../../assets/images/vanfleet.gif');

    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height * 0.81;

    // uncomment for one image example
    // const images = [require('../../../../assets/images/dwightSchrute.jpg')]
    return (
        <View style={utilities.container}>
            <ScrollView contentContainerStyle={utilities.scrollview}>

                <View style={{width: windowWidth, height:windowHeight, backgroundColor:"white"}}>
                    <View style={styles.content}>
                        <Text style={[fonts.h1, {marginTop: windowHeight * 0.07, textAlign: "center", fontSize: 23}]}>Welcome to Off Chance Mobile! How LIVE DRAWING Works:</Text>
                        <Text style={[fonts.p, {marginTop: windowHeight * 0.15, textAlign: 'center', fontSize: 18}]}>1. Donate to receive chances for drawings and get an equal amount of Lives to play games and Win bonus chances. </Text>
                        <Image source={images[0]} style={{marginTop: windowHeight * 0.07, justifyContent: 'center', alignItems: 'center'}}></Image>
                    </View>
                </View>

                <View style={{width: windowWidth, height:windowHeight, backgroundColor:"black"}}>
                    <View style={styles.content}>
                        <Text style={[fonts.p, {marginTop: windowHeight * 0.07, textAlign: 'center', fontSize: 18, color: 'white'}]}>2. Use Lives to play Rock, Paper, Scissors against others and earn additional chances to win drawing prizes. </Text>
                        <Image source={images[1]} style={{height: windowHeight * .7, marginTop: windowHeight * 0.07, justifyContent: 'center', alignItems: 'center',}}></Image>
                    </View>
                </View>

                <View style={{width: windowWidth, height:windowHeight, backgroundColor:"white"}}>
                    <View style={styles.content}>
                        <Text style={[fonts.p, {marginTop: windowHeight * 0.15, textAlign: 'center', fontSize: 18}]}>3. At the end, the number of your wins correlates to a number of bonus chances you can use for the live drawing. </Text>
                        <Image source={images[2]} style={{marginTop: windowHeight * 0.2, justifyContent: 'center', alignItems: 'center',}}></Image>
                    </View>
                </View>

                <View style={{width: windowWidth, height:windowHeight, backgroundColor:"black"}}>
                    <View style={styles.content}>
                        <Text style={[fonts.p, {marginTop: windowHeight * 0.13, textAlign: 'center', fontSize: 18, color: 'white'}]}>4. The more chances you buy, the more likely you’ll win - whether it be the grand prize or extra chances for another raffle of your choice. </Text>
                        <Image source={images[3]} style={{marginTop: windowHeight * 0.1, justifyContent: 'center', alignItems: 'center'}}></Image>
                    </View>
                </View>

                <View style={{width: windowWidth, height:windowHeight, backgroundColor:"white"}}>
                    <View style={styles.content}>
                        <Text style={[fonts.p, {marginTop: windowHeight * 0.13, textAlign: 'center', fontSize: 18}]}>5. The most important part is to HAVE FUN and GOOD LUCK! </Text>
                        <Image source={gif} style={styles.gifStyle, {marginTop: windowHeight * 0.13, justifyContent: 'center', alignItems: 'center', width: 350, height:300}}></Image>
                    </View>
                    <View style={{marginTop: '10%', alignItems:'center'}}>
                      <BlockButton
                        title="Start Exploring!"
                        color="primary"
                        size='short'
                        onPress={() => navigation.navigate('Home')}/>
                    </View>
                </View>


            </ScrollView>
            <BottomNav navigation={navigation} active={'Home'}></BottomNav>
        </View>
    )
}