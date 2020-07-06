import React, {useState, useEffect} from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
// import {fonts} from '../../../settings/fonts';
import {colors, fonts, utilities} from '../../../../settings/all_settings';
import BottomNav from '../../../02_Molecules/BottomNav/BottomNav'
import GameBar from '../../../02_Molecules/GameBar/GameBar'
import BlockButton from '../../../01_Atoms/Buttons/BlockButton/BlockButton'
import {styles} from './PlayGame.styling'

function PlayGame(props) {
    const [localTime, localSetTime] = useState(props.time)

    let choices = ['rock', 'paper', 'scissors']
    let compChoice = choices[Math.floor(Math.random()*3)] // randomly pick rock, paper, or scissors for computer

    useEffect(() => {
        let interval = null
        if (localTime > 0) {
            interval = setInterval(() => {
                localSetTime(localTime => localTime - 1)
            }, 1000)
        }
        return () => {
            if (localTime === 1 && props.choice === "Pick Rock Paper or Scissors") {
                props.setChoice(compChoice)
                props.setPage("Game")
            } else if (localTime === 1 && props.choice != null) {
                props.setPage("Game")
            }
            clearInterval(interval)
        }
    }, [localTime])

    return (
        <View style={[utilities.container]}>
            <GameBar color={'black'} currRound={props.round} chancesLeft={props.chances} wins={props.wins} numRounds={10}></GameBar>
            <Text style={{textAlign:'center', fontWeight: '700', fontSize: 70, color: (localTime <= 3) ? 'red' : 'black'}}>{localTime}s</Text>
            <View style={styles.rpsView}>
                <TouchableOpacity onPress={() => {
                    props.setOpacity([1, 0.2, 0.2])
                    props.setChoice("rock")}}>
                    <Image style={{opacity: props.opacity[0], width:100, height:100, resizeMode: 'contain', marginLeft: 25}} source={require('../../../../../assets/game/rock.png')}></Image>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    props.setOpacity([0.2, 1, 0.2])
                    props.setChoice("paper")}}>
                    <Image style={{opacity: props.opacity[1], width:100, height:100, resizeMode: 'contain', marginLeft: 30}} source={require('../../../../../assets/game/paper.png')}></Image>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    props.setOpacity([0.2, 0.2, 1])
                    props.setChoice("scissors")}}>
                    <Image style={{opacity: props.opacity[2], width:100, height:100, resizeMode: 'contain', marginLeft: 30}} source={require('../../../../../assets/game/scissors.png')}></Image>
                </TouchableOpacity>
            </View>

            <View style={styles.button}>
                <BlockButton
                    title={props.choice}
                    color="primary"
                    onPress={() => {
                        if (props.choice !== 'rock' && props.choice !== 'paper' && props.choice !== 'scissors') {
                            props.setChoice('You must pick a choice or we will choose randomly')
                            return
                        } else {
                            props.setPage('Game')
                        }}}></BlockButton>
                    {/* // onPress={() => navigation.navigate('Game')}></BlockButton> */}
            </View>
            <BottomNav navigation={props.navigation} active={'Home'}></BottomNav>
        </View>
    )
}

export default PlayGame;