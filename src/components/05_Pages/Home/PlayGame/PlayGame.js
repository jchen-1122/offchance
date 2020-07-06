import React, {useState} from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
// import {fonts} from '../../../settings/fonts';
import {colors, fonts, utilities} from '../../../../settings/all_settings';
import BottomNav from '../../../02_Molecules/BottomNav/BottomNav'
import GameBar from '../../../02_Molecules/GameBar/GameBar'
import BlockButton from '../../../01_Atoms/Buttons/BlockButton/BlockButton'
import {styles} from './PlayGame.styling'
import { ImageZoomProps } from 'react-native-image-pan-zoom';

function PlayGame(props,{navigation}) {
    const [state, setState] = useState('Pick Rock Paper or Scissors')
    const [opacity, setOpacity] = useState([1, 1, 1])
    return (
        <View style={[utilities.container]}>
            <GameBar color={'black'} currRound={props.round} chancesLeft={props.chances} wins={props.wins} numRounds={10}></GameBar>
            <Text style={styles.timer}>00:10</Text>

            <View style={styles.rpsView}>
                <TouchableOpacity onPress={() => {
                    setOpacity([1, 0.2, 0.2])
                    props.setChoice("rock")}}>
                    <Image style={{opacity: opacity[0]}, styles.rock} source={require('../../../../../assets/game/rock.png')}></Image>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    setOpacity([0.2, 1, 0.2])
                    props.setChoice("paper")}}>
                    <Image style={{opacity: opacity[1]}, styles.paper} source={require('../../../../../assets/game/paper.png')}></Image>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    setOpacity([0.2, 0.2, 1])
                    props.setChoice("scissors")}}>
                    <Image style={{opacity: opacity[2]}, styles.paper} source={require('../../../../../assets/game/scissors.png')}></Image>
                </TouchableOpacity>
            </View>

            <View style={styles.button}>
                <BlockButton
                    title={state}
                    color="primary"
                    onPress={() => props.setPage('Game')}></BlockButton>
                    {/* // onPress={() => navigation.navigate('Game')}></BlockButton> */}
            </View>
            <BottomNav navigation={navigation} active={'Home'}></BottomNav>
        </View>
    )
}

export default PlayGame;