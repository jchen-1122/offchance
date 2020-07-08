import React from 'react'
import { View, Text } from 'react-native'
import {colors, fonts, utilities} from '../../../../settings/all_settings';
import BottomNav from '../../../02_Molecules/BottomNav/BottomNav'
import GameBar from '../../../02_Molecules/GameBar/GameBar'
import BlockButton from '../../../01_Atoms/Buttons/BlockButton/BlockButton'

function Likes(props) {
    return (
        <View style={utilities.container}>
            <GameBar color={'black'} currRound={props.round} tokensLeft={props.tokens} wins={props.wins} numRounds={10}></GameBar>
            <View style={{alignItems: 'center'}}>
                <Text style={fonts.h1}>THANKS FOR PLAYING!</Text>
                <Text style={fonts.h3}>Buy more chances for another chance to play!</Text>
                <BlockButton
                    title="Back to Drawing"
                    color="primary"
                    onPress={() => props.navigation.navigate('Raffle')} />
            </View>
            <BottomNav navigation={props.navigation} active={'Likes'} />
        </View>
    )
}

export default Likes;