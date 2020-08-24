import React from 'react'
import { View, Text } from 'react-native'
import styles from './GameBar.styling';

// n==3 if theres 3 stats in the GameBar (with the timer)
function GameBar({ tokensLeft, wins, time, n }) {
    return (
        <View style={styles.GameBar}>
            <View style={n==3 ? styles.GameBar__stat :styles.GameBar__stat_short}>
                <Text style={[styles.text]}>{tokensLeft}</Text>
                <Text style={[styles.text_light]}>LIVES LEFT</Text>
            </View>
            <View style={n==3 ? styles.GameBar__stat :styles.GameBar__stat_short}>
                <Text style={[styles.text]}>{wins}</Text>
                <Text style={[styles.text_light]}>WINS</Text>
            </View>
            {time ? 
            <View style={n==3 ? styles.GameBar__stat :styles.GameBar__stat_short}>
                    <Text style={[styles.text]}>{time} </Text>
                    <Text style={[styles.text_light]}>SECS LEFT</Text>
            </View> : null}
        </View>
    )
}

export default GameBar;