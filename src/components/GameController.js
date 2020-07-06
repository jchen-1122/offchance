import React, {useState} from 'react';
import PlayGame from './05_Pages/Home/PlayGame/PlayGame';
import Game from './05_Pages/Home/Game/Game';
import { set } from 'react-native-reanimated';

function GameController({navigation}) {
    const [page, setPage] = useState('PlayGame')
    const [round, setRound] = useState(1)
    const [chances, setChances] = useState(35)
    const [wins, setWins] = useState(0)

    const [choice, setChoice] = useState(null)

    if (page == 'PlayGame'){
        return (
            <PlayGame setPage={setPage} round={round} setRound={setRound} chances={chances} setChances={setChances} wins={wins} setWins={setWins} setChoice={setChoice}/>
        )
    }
    else if (page == 'Game'){
        return <Game setPage={setPage} round={round} setRound={setRound} chances={chances} setChances={setChances} wins={wins} setWins={setWins} choice={choice}/>
    }
}

export default GameController;