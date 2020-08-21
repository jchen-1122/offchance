import React, { useState, useEffect, useContext } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { colors, fonts, utilities } from '../../../../../settings/all_settings';
import GameBar from '../../../../02_Molecules/GameBar/GameBar'
import BlockButton from '../../../../01_Atoms/Buttons/BlockButton/BlockButton'
import { styles } from './Game.styling'
import UsernameDisplay from '../../../../01_Atoms/UsernameDisplay/UsernameDisplay';
import GlobalState from '../../../../globalState'
import { Icon } from 'react-native-elements';

function Game(props) {
    const { user, setUser } = useContext(GlobalState)

    // images
    let rockImage = { uri: 'https://oc-mobile-images.s3.us-east-2.amazonaws.com/RPS/the-rock.png' };
    let paperImage = { uri: 'https://oc-mobile-images.s3.us-east-2.amazonaws.com/RPS/paper.jpeg' };
    let scissorsImage = { uri: 'https://oc-mobile-images.s3.us-east-2.amazonaws.com/RPS/scissors.png' };

    let localWins = 0
    let localTokens = 0
    let localRounds = 0

    const [localTime, localSetTime] = useState(5)

    useEffect(() => {
        let interval = null
        if (localTime > 0) {
            interval = setInterval(() => {
                localSetTime(localTime => localTime - 1)
            }, 1000)
        }
        return () => {
            if (localTime === 3) {
                props.setPage('PlayGame')
                props.setRound(props.round + localRounds)
                props.setWins(props.wins + localWins)
                props.setTokens(props.tokens + localTokens)
                props.setOpacity([1, 1, 1])
                props.setChoice("Pick Rock Paper or Scissors")
                props.setTime(5)
            }
            clearInterval(interval)
        }
    }, [localTime])

    // map players choice to image on UI
    let playerChoiceImg;
    switch (props.choice) {
        case 'rock':
            playerChoiceImg = (
                <View style={styles.choice}>
                    <Image style={styles.image} source={rockImage} />
                    <Text style={styles.label}>ROCK</Text>
                </View>
            )
            break;
        case 'paper':
            playerChoiceImg = (
                <View style={styles.choice}>
                    <Image style={styles.image} source={paperImage} />
                    <Text style={styles.label}>PAPER</Text>
                </View>
            )
            break;
        case 'scissors':
            playerChoiceImg = (
                <View style={styles.choice}>
                    <Image style={styles.image} source={scissorsImage} />
                    <Text style={styles.label}>SCISSORS</Text>
                </View>
            )
            break;
    }

    // map computers choice to image on UI
    let compChoiceImg;
    switch (props.compChoice) {
        case 'rock':
            compChoiceImg = (
                <View style={styles.choice}>
                    <Image style={styles.image} source={rockImage} />
                    <Text style={[styles.label]}>ROCK</Text>
                </View>
            )
            break;
        case 'paper':
            compChoiceImg = (
                <View style={styles.choice}>
                    <Image style={styles.image} source={paperImage} />
                    <Text style={[styles.label]}>PAPER</Text>
                </View>
            )
            break;
        case 'scissors':
            compChoiceImg = (
                <View style={styles.choice}>
                    <Image style={styles.image} source={scissorsImage} />
                    <Text style={[styles.label]}>SCISSORS</Text>
                </View>
            )
            break;
    }

    // determines who wins
    let winner;
    let message;
    let messageStyles = [styles.message]
    if (props.choice == props.compChoice) {
        winner = 'tie'
        message = "It's a tie!"
        messageStyles.push(styles.message_tie)
    }
    else if ((props.choice == 'rock' && props.compChoice == 'scissors') || (props.choice == 'paper' && props.compChoice == 'rock') || (props.choice == 'scissors' && props.compChoice == 'paper')) {
        winner = 'player'
        message = "You win this round!"
        messageStyles.push(styles.message_win)
        localWins += 1
        localTokens -= 1
        localRounds += 1
    }
    else {
        winner = 'computer'
        message = "You lost this round :("
        messageStyles.push(styles.message_lose)
        localTokens -= 1
        localRounds += 1
    }

    // takes you to next round of the game
    const nextRound = () => {
        if ((props.round === 10 || props.chances === 1) && winner !== 'tie') {
            props.setPage('EndGame')
        } else {
            props.setPage('PlayGame')
        }
        props.setRound(props.round + localRounds)
        props.setWins(props.wins + localWins)
        props.setTokens(props.tokens + localTokens)
        props.setOpacity([1, 1, 1])
        props.setChoice("Pick Rock Paper or Scissors")
        props.setTime(5)
        // exit condition for game
        let bonusChances = Math.floor(props.wins / 2)
        if (bonusChances >= 2 * props.initialTokens || (props.tokens === 1) && winner !== 'tie') {
            props.setPage('EndGame')
        } else {
            props.setPage('PlayGame')
        }
    }

    return (
        <View style={[utilities.container, { paddingTop: 25 }]}>
            <View style={{ flex: 0, alignItems: 'center', justifyContent: 'center', height: '85%', marginTop: 30, backgroundColor: 'pink' }}>
                <View style={{ justifyContent: 'center' }}>
                    <Text style={[fonts.h2, { textAlign: 'center' }]}>You</Text>
                    <UsernameDisplay size="game" username={user.username} profPic={{ uri: user.profilePicture }} />
                </View>

                <Text style={messageStyles}>{message}</Text>
                {playerChoiceImg}
                <Text style={fonts.h3}>VS</Text>

                {compChoiceImg}
                <View style={{ justifyContent: 'center' }}>
                <Text style={[fonts.h2, { textAlign: 'center' }]}>Challenger</Text>
                <UsernameDisplay size="game" username={props.opponent.username} profPic={{ uri: props.opponent.profilePicture }} />
                </View>
            </View>

            <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                <GameBar n={2} color={'white'} currRound={props.round + localRounds} tokensLeft={props.tokens + localTokens} wins={props.wins + localWins} numRounds={10}></GameBar>
                <TouchableOpacity style={styles.GameBar__stat} onPress={() => nextRound()}>
                    <Icon name="arrow-right" type="material-community" size={35} />
                    <Text style={[styles.text_light]}>NEXT ROUND</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.GameBar__stat} onPress={() => props.setPage('EndGame')}>
                    <Icon name="exit-to-app" type="material-community" size={35} />
                    <Text style={[styles.text_light]}>EXIT GAME</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Game;