import React from 'react'
import { View, Text } from 'react-native'
// import {fonts} from '../../../settings/fonts';
import {colors, fonts, utilities} from '../../../../settings/all_settings';
import BottomNav from '../../../02_Molecules/BottomNav/BottomNav'
import GameBar from '../../../02_Molecules/GameBar/GameBar'
import BlockButton from '../../../01_Atoms/Buttons/BlockButton/BlockButton'

function Likes(props) {
    return (
        <View style={utilities.container}>
            <GameBar color={'black'} currRound={props.round} chancesLeft={props.chances} wins={props.wins} numRounds={10}></GameBar>
            <View style={{alignItems: 'center'}}>
                <Text style={{fontSize: 30, fontWeight: '800', textAlign: 'center'}}>THANKS FOR PLAYING!</Text>
                <BlockButton
                    title="Go Back Home"
                    color="primary"
                    onPress={() => props.navigation.navigate('Home')}></BlockButton>
            </View>
            <BottomNav navigation={props.navigation} active={'Likes'}></BottomNav>
        </View>
    )
}

export default Likes;