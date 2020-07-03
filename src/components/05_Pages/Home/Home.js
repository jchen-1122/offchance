import React from 'react'
import { View, Text, ScrollView } from 'react-native'
// import {fonts} from '../../../settings/fonts';
import {colors, fonts, utilities} from '../../../settings/all_settings';
import BlockButton from '../../01_Atoms/Buttons/BlockButton/BlockButton';
import BottomNav from '../../02_Molecules/BottomNav/BottomNav';
import TopNav from '../../02_Molecules/TopNav/TopNav';
import Card from '../../03_Organisms/Card/Card';
import logo from '../../../../assets/images/michaelScott.jpg';

function Home({navigation}) {
    return (
        <ScrollView>
            <TopNav navigation={navigation}></TopNav>
            <View style={utilities.flexCenter}>
            {/* @matt you can change this block button to whatever you build for the raffle preview, just use onPress={() => navigation.navigate('Raffle')} */}
                <Card 
                    text="Nintendo Switch with Neon Joy-Con"
                    imageURI={logo}/>
                <BlockButton 
                    title="Raffle Details (test)" 
                    color="primary"
                    onPress={() => navigation.navigate('Raffle')}/>
            </View>
            <BottomNav navigation={navigation}></BottomNav>
        </ScrollView>
    )
}

export default Home;