import React, { useState, useEffect } from 'react';
import PlayGame from './PlayGame/PlayGame';
import Game from './Game/Game';
import EndGame from './EndGame/EndGame'

function GameController({ navigation, route }) {
    let initialTokens = 10
    const [page, setPage] = useState('PlayGame') // controls which page you see
    const [round, setRound] = useState(1)
    const [tokens, setTokens] = useState(initialTokens)
    const [wins, setWins] = useState(0)
    const [choice, setChoice] = useState("Rock Paper or Scissors")
    const [opacity, setOpacity] = useState([1, 1, 1])
    const [time, setTime] = useState(5)

    let choices = ['rock', 'paper', 'scissors']
    let compChoice = choices[Math.floor(Math.random() * 3)] // randomly pick rock, paper, or scissors for computer

    if (page == 'PlayGame') {
        return (
            <PlayGame
                navigation={navigation}
                opponent={route.params}
                time={time} setTime={setTime}
                opacity={opacity} setOpacity={setOpacity}
                setPage={setPage}
                round={round} setRound={setRound}
                tokens={tokens} setTokens={setTokens}
                wins={wins} setWins={setWins}
                setChoice={setChoice} choice={choice} />
        )
    }
    else if (page == 'Game') {
        return (
            <Game
                navigation={navigation}
                opponent={route.params}
                time={time} setTime={setTime}
                compChoice={compChoice}
                opacity={opacity} setOpacity={setOpacity}
                setPage={setPage}
                round={round} setRound={setRound}
                tokens={tokens} setTokens={setTokens}
                wins={wins} setWins={setWins}
                setChoice={setChoice} choice={choice}
                initialTokens={initialTokens} />
        )
    } else if (page == 'EndGame') {
        return (
            <EndGame
                navigation={navigation}
                opponent={route.params}
                time={time} setTime={setTime}
                opacity={opacity} setOpacity={setOpacity}
                setPage={setPage}
                round={round} setRound={setRound}
                tokens={tokens} setTokens={setTokens}
                wins={wins} setWins={setWins}
                setChoice={setChoice} choice={choice} />
        )
    }
}

export default GameController;