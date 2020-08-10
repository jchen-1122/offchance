import React from 'react'
import {ScrollView, View, Text, Dimensions} from 'react-native'
import {utilities} from '../../../../settings/all_settings'

import BlockButton from '../../../01_Atoms/Buttons/BlockButton/BlockButton'
import BottomNav from '../../../02_Molecules/BottomNav/BottomNav'

export default function Success({navigation}) { 
    return (
        <View style={utilities.container}>
            <ScrollView>
            <Text style={{alignSelf: 'center', fontSize: '30', fontWeight: '500', marginTop: 250}}>Thank You.</Text>
            <Text style={{textAlign: 'center', fontSize: '18', marginTop: 40}}>Your chances have been loaded into your wallet. Play the game for bonus chances!</Text>
            <BlockButton
                title="PLAY GAME"
                color="primary"
                onPress={() => navigation.navigate('GameController')}/>
            </ScrollView>
            <BottomNav navigation={navigation} active={'Account'}></BottomNav>
        </View>
    )
}