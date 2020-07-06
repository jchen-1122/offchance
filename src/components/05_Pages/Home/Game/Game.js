import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
// import {fonts} from '../../../settings/fonts';
import {colors, fonts, utilities} from '../../../../settings/all_settings';
import BottomNav from '../../../02_Molecules/BottomNav/BottomNav'
import GameBar from '../../../02_Molecules/GameBar/GameBar'
import BlockButton from '../../../01_Atoms/Buttons/BlockButton/BlockButton'
import {styles} from './Game.styling'

function Game(props,{navigation}) {
    let choices = ['rock', 'paper', 'scissors']
    let compChoice = choices[Math.floor(Math.random()*3)] // randomly pick rock, paper, or scissors for computer
    let localWins = 0
    let localChances = 0
    let localRounds = 0
    //console.warn(compChoice)

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
    switch (compChoice){
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
    if (props.choice == compChoice){
        winner = 'tie'
        message = "It's a tie!"
        messageStyles.push(styles.message_tie)
    }
    else if ((props.choice == 'rock' && compChoice == 'scissors') || (props.choice == 'paper' && compChoice == 'rock') || (props.choice == 'scissors' && compChoice == 'paper')){
        winner = 'player'
        message = "You win this round!"
        messageStyles.push(styles.message_win)
        localWins += 1
    }
    else{
        winner = 'computer'
        message = "You lost this round :("
        messageStyles.push(styles.message_lose)
        localChances -= 1
    }

    return (
        <View style={utilities.container}>
            <View style={[utilities.container], {backgroundColor: 'black', height: '50%'}}>
                <GameBar color={'white'} currRound={props.round} chancesLeft={props.chances + localChances} wins={props.wins + localWins} numRounds={10}></GameBar>
                <View style={{flex: 0, alignItems: 'center'}}>
                    {compChoiceImg}
                </View>
            </View>
            
            <View style={utilities.container}>
                <View style={{flex: 0, alignItems: 'center'}}>
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
                            props.setWins(props.wins + localWins)
                            props.setChances(props.chances + localChances)
                            props.setRound(props.round + 1)
                        }} />
                        {/* onPress={() => navigation.navigate('PlayGame')}></BlockButton> */}
                </View>
            </View>
            {/* <BottomNav navigation={navigation} active={'Home'}></BottomNav> */}
        </View>
    )
}

export default Game;