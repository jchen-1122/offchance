import React, { useState, useEffect, useContext } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
// import {fonts} from '../../../settings/fonts';
import { colors, fonts, utilities } from '../../../../settings/all_settings';
import GameBar from '../../../02_Molecules/GameBar/GameBar'
import UsernameDisplay from '../../../01_Atoms/UsernameDisplay/UsernameDisplay';
import { styles } from './PlayGame.styling'
import GlobalState from '../../../globalState'

function PlayGame(props) {
    const {user, setUser} = useContext(GlobalState)

    // images
    let rockImage = { uri: 'https://oc-mobile-images.s3.us-east-2.amazonaws.com/RPS/the-rock.png' };
    let paperImage = { uri: 'https://oc-mobile-images.s3.us-east-2.amazonaws.com/RPS/paper.jpeg' };
    let scissorsImage = { uri: 'https://oc-mobile-images.s3.us-east-2.amazonaws.com/RPS/scissors.png' };

    const [localTime, localSetTime] = useState(props.time)

    let choices = ['rock', 'paper', 'scissors']
    let compChoice = choices[Math.floor(Math.random() * 3)] // randomly pick rock, paper, or scissors for computer

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
        <View style={[utilities.container, { paddingBottom: 15 }]}>
            <View style={styles.optionsContainer}>
                <UsernameDisplay username={user.username} profPic={{uri: user.profilePicture}}/>
                <TouchableOpacity onPress={() => {
                    props.setOpacity([1, 0.2, 0.2])
                    props.setChoice("rock")
                    props.setPage('Game')
                }}>
                    <View style={styles.option}>
                        <Image style={{ opacity: props.opacity[0] }, styles.option__image} source={rockImage} />
                        <Text style={[styles.label, props.choice == 'rock' ? styles.label_active : '']}>ROCK</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {
                    props.setOpacity([0.2, 1, 0.2])
                    props.setChoice("paper")
                    props.setPage('Game')
                }}>
                    <View style={styles.option}>
                        <Image style={{ opacity: props.opacity[1] }, styles.option__image} source={paperImage} />
                        <Text style={[styles.label, props.choice == 'paper' ? styles.label_active : '']}>PAPER</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {
                    props.setOpacity([0.2, 0.2, 1])
                    props.setChoice("scissors")
                    props.setPage('Game')
                }}>
                    <View style={styles.option}>
                    <Image style={{ opacity: props.opacity[2] }, styles.option__image} source={scissorsImage} />
                    <Text style={[styles.label, props.choice == 'scissors' ? styles.label_active : '']}>SCISSORS</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <GameBar currRound={props.round} tokensLeft={props.tokens} wins={props.wins} numRounds={10} time={localTime} ></GameBar>
        </View>
    )
}

export default PlayGame;