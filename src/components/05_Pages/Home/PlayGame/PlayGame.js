import React, {useState, useEffect} from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
// import {fonts} from '../../../settings/fonts';
import {colors, fonts, utilities} from '../../../../settings/all_settings';
import GameBar from '../../../02_Molecules/GameBar/GameBar'
import BlockButton from '../../../01_Atoms/Buttons/BlockButton/BlockButton'
import {styles} from './PlayGame.styling'

function PlayGame(props) {
    // images
    let rockImage = {uri: 'https://oc-mobile-images.s3.us-east-2.amazonaws.com/RPS/the-rock.png'};
    let paperImage = {uri: 'https://oc-mobile-images.s3.us-east-2.amazonaws.com/RPS/paper.jpeg'};
    let scissorsImage = {uri: 'https://oc-mobile-images.s3.us-east-2.amazonaws.com/RPS/scissors.png'};

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
            if (localTime === 1 && props.choice !== 'rock' && props.choice !== 'paper' && props.choice !== 'scissors') {
                props.setChoice(compChoice)
                props.setPage("Game")
            } else if (localTime === 1 && props.choice != null) {
                props.setPage("Game")
            }
            clearInterval(interval)
        }
    }, [localTime])

    return (
        <View style={[utilities.container,{paddingBottom: 15}]}>
            <GameBar color={'black'} currRound={props.round} tokensLeft={props.tokens} wins={props.wins} numRounds={10}></GameBar>
            <Text style={[{color: (localTime <= 3) ? 'red' : 'black'},styles.timer]}>{localTime}s</Text>
            <View style={styles.rpsView}>
                <View style={styles.rpsView__row}>
                    <TouchableOpacity onPress={() => {
                        props.setOpacity([1, 0.2, 0.2])
                        props.setChoice("rock")}}>
                        <Image style={{opacity: props.opacity[0]},styles.rps__choice} source={rockImage} />
                        <Text style={[styles.label, props.choice == 'rock' ? styles.label_active : '']}>ROCK</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.rpsView__row}>
                <TouchableOpacity onPress={() => {
                    props.setOpacity([0.2, 1, 0.2])
                    props.setChoice("paper")}}>
                    <Image style={{opacity: props.opacity[1]},styles.rps__choice} source={paperImage}/>
                    <Text style={[styles.label, props.choice == 'paper' ? styles.label_active : '']}>PAPER</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    props.setOpacity([0.2, 0.2, 1])
                    props.setChoice("scissors")}}>
                    <Image style={{opacity: props.opacity[2]},styles.rps__choice} source={scissorsImage}/>
                    <Text style={[styles.label, props.choice == 'scissors' ? styles.label_active : '']}>SCISSORS</Text>
                </TouchableOpacity>
                </View>
            </View>

            <View style={styles.button}>
                <BlockButton
                    title={(props.choice).charAt(0).toUpperCase()+(props.choice).slice(1)}
                    color="primary"
                    disabled={props.choice !== 'rock' && props.choice !== 'paper' && props.choice !== 'scissors'}
                    onPress={() => {
                        if (props.choice !== 'rock' && props.choice !== 'paper' && props.choice !== 'scissors') {
                            props.setChoice('You must pick a choice or we will choose randomly')
                            return
                        } else {
                            props.setPage('Game')
                        }}} />
            </View>
        </View>
    )
}

export default PlayGame;