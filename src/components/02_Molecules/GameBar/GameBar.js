import React from 'react'
import { View, Text } from 'react-native'
import styles from './GameBar.styling';

function GameBar({tokensLeft, wins, color}) {
    return (
        <View style={styles.GameBar}>
            <View style={styles.GameBar__stat}>
                <Text style={[styles.text,{color: color}]}>{tokensLeft}</Text>
                <Text style={[styles.text_light,{color: color}]}>TOKENS LEFT</Text>
            </View>
            <View style={styles.GameBar__stat}>
                <Text style={[styles.text,{color: color}]}>{wins}</Text>
                <Text style={[styles.text_light,{color: color}]}>WINS</Text>
            </View>
            <View style={styles.GameBar__stat}>
                <Text style={[styles.text,{color: color}]}>{Math.floor(wins/2)} </Text>
                <Text style={[styles.text_light,{color: color}]}>BONUS CHANCES</Text>
            </View>
        </View>
    )
}

export default GameBar;