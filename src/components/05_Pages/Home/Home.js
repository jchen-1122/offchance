import React from 'react'
import { View, Text } from 'react-native'
// import {fonts} from '../../../settings/fonts';
import {colors, fonts, utilities} from '../../../settings/all_settings';
import BlockButton from '../../01_Atoms/Buttons/BlockButton/BlockButton';
import BottomNav from '../../02_Molecules/BottomNav/BottomNav'
import TopNav from '../../02_Molecules/TopNav/TopNav'

function Home({navigation}) {
    return (
        <View style={utilities.container}>
            <TopNav navigation={navigation}></TopNav>
            <Text>this is a placeholder page for Home</Text>
            {/* @matt you can change this block button to whatever you build for the raffle preview, just use onPress={() => navigation.navigate('Raffle')} */}
            <BlockButton 
                title="Raffle Details (test)" 
                color="primary"
                onPress={() => navigation.navigate('Raffle')}/>
            <BottomNav navigation={navigation} active={'Home'}></BottomNav>
        </View>
    )
}

export default Home;