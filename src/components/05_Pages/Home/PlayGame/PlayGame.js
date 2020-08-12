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
    const ip = require('../../../IP_ADDRESS.json')
    const [opponent, setOpponent] = useState(null)

    // images
    let rockImage = { uri: 'https://oc-mobile-images.s3.us-east-2.amazonaws.com/RPS/the-rock.png' };
    let paperImage = { uri: 'https://oc-mobile-images.s3.us-east-2.amazonaws.com/RPS/paper.jpeg' };
    let scissorsImage = { uri: 'https://oc-mobile-images.s3.us-east-2.amazonaws.com/RPS/scissors.png' };

    const [localTime, localSetTime] = useState(props.time)

    let choices = ['rock', 'paper', 'scissors']
    let compChoice = choices[Math.floor(Math.random() * 3)] // randomly pick rock, paper, or scissors for computer
    

    // var userIDs = ["5f1717acfe0108ee8b5e5c0b", "5f171974fe0108ee8b5e5c11", "5f1757f7c9deeef8c14b6a40", "5f1a6bdb457f816624a7a48c"]
    // var opponentID = userIDs[Math.floor(Math.random() * userIDs.length)]
    // useEffect(() => {
    //     const getUser = async (id) => {
    //         const response = await fetch('http://'+ip.ipAddress+'/user/id/' + id)
    //         const json = await response.json()
    //         setOpponent(json)
    //       }
    //     getUser("5f1717acfe0108ee8b5e5c11")
    //     console.log(opponent)
    // }, [opponent])

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
        <View style={[utilities.container, { paddingVertical: 15}]}>
            <View style={styles.optionsContainer}>
                <Text style={fonts.h2}>You</Text>
                <UsernameDisplay size="game" username={user.username} profPic={{uri: user.profilePicture}}/>
                <Text style={[fonts.h3,{marginTop: 10}]}>CHOOSE ONE</Text>
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

                <Text style={fonts.h2}>Challenger</Text>
                <UsernameDisplay size="game" username={user.username} profPic={{uri: user.profilePicture}}/>
            </View>
            <GameBar currRound={props.round} tokensLeft={props.tokens} wins={props.wins} numRounds={10} time={localTime} ></GameBar>
        </View>
    )
}

export default PlayGame;