import React, {useState} from 'react';
import PlayGame from './05_Pages/Home/PlayGame/PlayGame';
import Game from './05_Pages/Home/Game/Game';
import {Text} from 'react-native'
import { set } from 'react-native-reanimated';

function GameController({navigation}) {
    const [page, setPage] = useState('PlayGame')
    const [round, setRound] = useState(1)
    const [chances, setChances] = useState(35)
    const [wins, setWins] = useState(0)
    const [choice, setChoice] = useState("Pick Rock Paper or Scissors")
    const [opacity, setOpacity] = useState([1, 1, 1])
    const [time, setTime] = useState(10)
    
    let choices = ['rock', 'paper', 'scissors']
    let compChoice = choices[Math.floor(Math.random()*3)] // randomly pick rock, paper, or scissors for computer

    if (page == 'PlayGame'){
        return (
            <PlayGame navigation={navigation} time={time} setTime={setTime} opacity={opacity} setOpacity={setOpacity} setPage={setPage} round={round} setRound={setRound} chances={chances} setChances={setChances} wins={wins} setWins={setWins} setChoice={setChoice} choice={choice}/>
        )
    }
    else if (page == 'Game'){
        return <Game navigation={navigation} time={time} compChoice={compChoice} setTime={setTime} opacity={opacity} setOpacity={setOpacity} setPage={setPage} round={round} setRound={setRound} chances={chances} setChances={setChances} wins={wins} setWins={setWins} setChoice={setChoice} choice={choice}/>
    }
}

export default GameController;