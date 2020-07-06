import React from 'react'
import { View, Text } from 'react-native'
import styles from './GameBar.styling';

function GameBar({currRound, chancesLeft, wins, numRounds, color}) {
    return (
        <View style={styles.GameBar}>
            <View style={styles.GameBar__stat}>
                <Text style={[styles.text,{color: color}]}>{currRound}</Text>
                <Text style={[styles.text_light,{color: color}]}>/ {numRounds} ROUNDS</Text>
            </View>
            <View style={styles.GameBar__stat}>
                <Text style={[styles.text,{color: color}]}>{chancesLeft}</Text>
                <Text style={[styles.text_light,{color: color}]}>CHANCES LEFT</Text>
            </View>
            <View style={styles.GameBar__stat}>
                <Text style={[styles.text,{color: color}]}>{wins}</Text>
                <Text style={[styles.text_light,{color: color}]}>WINS</Text>
            </View>
        </View>
    )
}

export default GameBar;