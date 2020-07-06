import React, {useState} from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
// import {fonts} from '../../../settings/fonts';
import {colors, fonts, utilities} from '../../../../settings/all_settings';
import BottomNav from '../../../02_Molecules/BottomNav/BottomNav'
import GameBar from '../../../02_Molecules/GameBar/GameBar'
import BlockButton from '../../../01_Atoms/Buttons/BlockButton/BlockButton'
import {styles} from './PlayGame.styling'

function PlayGame({navigation}) {
    const [state, setState] = useState('Pick Rock Paper or Scissors')
    const [opacity, setOpacity] = useState([1, 1, 1])
    return (
        <View style={[utilities.container]}>
            <GameBar color={'black'} currRound={1} chancesLeft={35} wins={0} numRounds={10}></GameBar>
            <Text style={styles.timer}>00:10</Text>
            <View style={styles.rpsView}>
                <TouchableOpacity onPress={() => {
                    setOpacity([1, 0.2, 0.2])
                    setState("I CHOOSE ROCK")}}>
                    <Image style={{opacity: opacity[0]}, styles.rock} source={require('../../../../../assets/game/rock.png')}></Image>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    setOpacity([0.2, 1, 0.2])
                    setState("I CHOOSE PAPER")}}>
                    <Image style={{opacity: opacity[1]}, styles.paper} source={require('../../../../../assets/game/paper.png')}></Image>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    setOpacity([0.2, 0.2, 1])
                    setState("I CHOOSE SCISSORS")}}>
                    <Image style={{opacity: opacity[2]}, styles.paper} source={require('../../../../../assets/game/scissors.png')}></Image>
                </TouchableOpacity>
            </View>
            <View style={styles.button}>
                <BlockButton
                    title={state}
                    color="primary"
                    onPress={() => navigation.navigate('Game')}></BlockButton>
            </View>
            <BottomNav navigation={navigation} active={'Home'}></BottomNav>
        </View>
    )
}

export default PlayGame;