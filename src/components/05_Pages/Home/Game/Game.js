import React, {useState, useEffect} from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import {colors, fonts, utilities} from '../../../../settings/all_settings';
import GameBar from '../../../02_Molecules/GameBar/GameBar'
import BlockButton from '../../../01_Atoms/Buttons/BlockButton/BlockButton'
import {styles} from './Game.styling'

function Game(props) {
    // images
    let rockImage = {uri: 'https://oc-mobile-images.s3.us-east-2.amazonaws.com/RPS/the-rock.png'};
    let paperImage = {uri: 'https://oc-mobile-images.s3.us-east-2.amazonaws.com/RPS/paper.jpeg'};
    let scissorsImage = {uri: 'https://oc-mobile-images.s3.us-east-2.amazonaws.com/RPS/scissors.png'};

    let localWins = 0
    let localTokens = 0
    let localRounds = 0
    
    const [localTime, localSetTime] = useState(10)

    useEffect(() => {
        let interval = null
        if (localTime > 0) {
            interval = setInterval(() => {
                localSetTime(localTime => localTime - 1)
            }, 1000)
        }
        return () => {
            if (localTime === 1) {
                props.setPage('PlayGame')
                props.setRound(props.round + localRounds)
                props.setWins(props.wins + localWins)
                props.setTokens(props.tokens + localTokens)
                props.setOpacity([1,1,1])
                props.setChoice("Pick Rock Paper or Scissors")
                props.setTime(10)
            }
            clearInterval(interval)
        }
    }, [localTime])

    // map players choice to image on UI
    let playerChoiceImg;
    switch (props.choice){
        case 'rock':
            playerChoiceImg = (
                <View>
                    <Image style={styles.compChoice} source={rockImage} />
                    <Text style={styles.label}>ROCK</Text>
                </View>
            )
            break;
        case 'paper':
            playerChoiceImg = (
                <View>
                    <Image style={styles.compChoice} source={paperImage} />
                    <Text style={styles.label}>PAPER</Text>
                </View>
            )
            break;
        case 'scissors':
            playerChoiceImg = (
                <View>
                    <Image style={styles.compChoice} source={scissorsImage} />
                    <Text style={styles.label}>SCISSORS</Text>
                </View>
            )
            break;
    }

    // map computers choice to image on UI
    let compChoiceImg;
    switch (props.compChoice){
        case 'rock':
            compChoiceImg = (
                <View>
                    <Image style={styles.compChoice} source={rockImage} />
                    <Text style={[styles.label, {color: 'white'}]}>ROCK</Text>
                </View>
            )
            break;
        case 'paper':
            compChoiceImg = (
                <View>
                    <Image style={styles.compChoice} source={paperImage} />
                    <Text style={[styles.label, {color: 'white'}]}>PAPER</Text>
                </View>
            )
            break;
        case 'scissors':
            compChoiceImg = (
                <View>
                    <Image style={styles.compChoice} source={scissorsImage} />
                    <Text style={[styles.label, {color: 'white'}]}>SCISSORS</Text>
                </View>
            )
            break;
    }

    // determines who wins
    let winner;
    let message;
    let messageStyles = [styles.message]
    if (props.choice == props.compChoice){
        winner = 'tie'
        message = "It's a tie!"
        messageStyles.push(styles.message_tie)
    }
    else if ((props.choice == 'rock' && props.compChoice == 'scissors') || (props.choice == 'paper' && props.compChoice == 'rock') || (props.choice == 'scissors' && props.compChoice == 'paper')){
        winner = 'player'
        message = "You win this round!"
        messageStyles.push(styles.message_win)
        localWins += 1
        localTokens -= 1
        localRounds += 1
    }
    else{
        winner = 'computer'
        message = "You lost this round :("
        messageStyles.push(styles.message_lose)
        localTokens -= 1
        localRounds += 1
    }

    return (
        <View style={utilities.container}>
            <View style={[utilities.container], {backgroundColor: 'black', height: '55%'}}>
                <GameBar color={'white'} currRound={props.round + localRounds} tokensLeft={props.tokens + localTokens} wins={props.wins + localWins} numRounds={10}></GameBar>
                <Text style={messageStyles}>{message}</Text>
                <View style={{flex: 0, alignItems: 'center'}}>
                    {compChoiceImg}
                </View>
            </View>
            
            <View style={utilities.container}>
                <View style={{flex: 0, alignItems: 'center'}}>
                    {playerChoiceImg}
                </View>
                <View style={{alignItems: 'center'}}>
                    <BlockButton
                        title={"NEXT ROUND"}
                        color="secondary"
                        size="short"
                        onPress={() => {
                            if ((props.round === 10 || props.chances === 1) && winner !== 'tie') {
                                props.setPage('EndGame')
                            } else {
                                props.setPage('PlayGame')
                            }
                            props.setRound(props.round + localRounds)
                            props.setWins(props.wins + localWins)
                            props.setTokens(props.tokens + localTokens)
                            props.setOpacity([1,1,1])
                            props.setChoice("Pick Rock Paper or Scissors")
                            props.setTime(10)
                            // exit condition for game
                            let bonusChances = Math.floor(props.wins/2)
                            if ( bonusChances >= 2*props.initialTokens || (props.tokens === 1) && winner !== 'tie') {
                                props.setPage('EndGame')
                            } else {
                                props.setPage('PlayGame')
                            }
                        }} />
                </View>
            </View>
        </View>
    )
}

export default Game;