import React, {useState, useEffect} from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
// import {fonts} from '../../../settings/fonts';
import {colors, fonts, utilities} from '../../../../settings/all_settings';
import BottomNav from '../../../02_Molecules/BottomNav/BottomNav'
import GameBar from '../../../02_Molecules/GameBar/GameBar'
import BlockButton from '../../../01_Atoms/Buttons/BlockButton/BlockButton'
import {styles} from './Game.styling'

function Game(props) {
    // let choices = ['rock', 'paper', 'scissors']
    // let compChoice = choices[Math.floor(Math.random()*3)] // randomly pick rock, paper, or scissors for computer
    let localWins = 0
    let localChances = 0
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
                props.setChances(props.chances + localChances)
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
            playerChoiceImg = <Image style={styles.compChoice} source={require('../../../../../assets/game/rock.png')} />
            break;
        case 'paper':
            playerChoiceImg = <Image style={styles.compChoice} source={require('../../../../../assets/game/paper.png')} />
            break;
        case 'scissors':
            playerChoiceImg = <Image style={styles.compChoice} source={require('../../../../../assets/game/scissors.png')} />
            break;
    }

    // map computers choice to image on UI
    let compChoiceImg;
    switch (props.compChoice){
        case 'rock':
            compChoiceImg = <Image style={styles.compChoice} source={require('../../../../../assets/game/rockFlip.png')} />
            break;
        case 'paper':
            compChoiceImg = <Image style={styles.compChoice} source={require('../../../../../assets/game/paperFlip.png')} />
            break;
        case 'scissors':
            compChoiceImg = <Image style={styles.compChoice} source={require('../../../../../assets/game/scissorsFlip.png')} />
            break;
    }


    let winner;
    let message;
    let messageStyles = [styles.message]
    // determines who wins
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
        localChances -= 1
        localRounds += 1
    }
    else{
        winner = 'computer'
        message = "You lost this round :("
        messageStyles.push(styles.message_lose)
        localChances -= 1
        localRounds += 1
    }

    return (
        <View style={utilities.container}>
            <View style={[utilities.container], {backgroundColor: 'black', height: '50%'}}>
                <GameBar color={'white'} currRound={props.round + localRounds} chancesLeft={props.chances + localChances} wins={props.wins + localWins} numRounds={10}></GameBar>
                <View style={{flex: 0, alignItems: 'center'}}>
                    {/* <Text style={{color: 'white'}}>{compChoice}</Text> */}
                    {compChoiceImg}
                </View>
            </View>
            
            <View style={utilities.container}>
                <View style={{flex: 0, alignItems: 'center'}}>
                    {/* <Text style={{color: 'black'}}>{props.choice}</Text> */}
                    {playerChoiceImg}
                </View>
                <Text style={messageStyles}>{message}</Text>
                <View style={{alignItems: 'center'}}>
                    <BlockButton
                        title={"NEXT ROUND"}
                        color="secondary"
                        size="short"
                        onPress={() => {
                            props.setPage('PlayGame')
                            props.setRound(props.round + localRounds)
                            props.setWins(props.wins + localWins)
                            props.setChances(props.chances + localChances)
                            props.setOpacity([1,1,1])
                            props.setChoice("Pick Rock Paper or Scissors")
                            props.setTime(10)
                        }} />
                        {/* onPress={() => navigation.navigate('PlayGame')}></BlockButton> */}
                </View>
            </View>
            <BottomNav navigation={props.navigation} active={'Home'}></BottomNav>
        </View>
    )
}

export default Game;