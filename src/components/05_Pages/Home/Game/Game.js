import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
// import {fonts} from '../../../settings/fonts';
import {colors, fonts, utilities} from '../../../../settings/all_settings';
import BottomNav from '../../../02_Molecules/BottomNav/BottomNav'
import GameBar from '../../../02_Molecules/GameBar/GameBar'
import BlockButton from '../../../01_Atoms/Buttons/BlockButton/BlockButton'
import {styles} from './Game.styling'

function Game({navigation}) {
    return (
        <View style={utilities.container}>
            <View style={[utilities.container], {backgroundColor: 'black'}}>
                {/* @chelly when wins and currRound turn into double digits, the number isn't centered anymore :( */}
                <GameBar color={'white'} currRound={1} chancesLeft={35} wins={1} numRounds={10}></GameBar>
                <Image style={styles.compChoice} source={require('../../../../../assets/game/paperFlip.png')}></Image>
            </View>
            <View style={utilities.container}>
                <Image style={styles.playerChoice} source={require('../../../../../assets/game/scissors.png')}></Image>
                <Text style={styles.message}>You win this round!</Text>
                <View style={{alignItems: 'center'}}>
                    <BlockButton
                        title={"NEXT ROUND"}
                        color="secondary"
                        size="short"
                        onPress={() => navigation.navigate('PlayGame')}></BlockButton>
                </View>
            </View>
            <BottomNav navigation={navigation} active={'Home'}></BottomNav>
        </View>
    )
}

export default Game;