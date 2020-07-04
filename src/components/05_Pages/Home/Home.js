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
        <View style={utilities.container}>
            <ScrollView contentContainerStyle={utilities.scrollview}>
                <TopNav navigation={navigation}></TopNav>
                <View style={utilities.flexCenter}>
                <Card 
                    text="Nintendo Switch with Neon Joy-Con"
                    navigation={navigation}
                    imageURI={logo}/>
                <Card 
                    text="Nintendo Switch with Neon Joy-Con"
                    navigation={navigation}
                    imageURI={logo}/>
                <Card 
                    text="Nintendo Switch with Neon Joy-Con"
                    navigation={navigation}
                    imageURI={logo}/>
                </View>
                <BlockButton 
                title="Raffle Details (test)" 
                color="primary"
                onPress={() => navigation.navigate('Raffle')}/>
            </ScrollView>
            <BottomNav navigation={navigation} active={'Home'}></BottomNav>
        </View>

    )
}

export default Home;