import React from 'react'
import { View, Text } from 'react-native'
import styles from './GameBar.styling';

function GameBar({tokensLeft, wins, time}) {
    return (
        <View style={styles.GameBar}>
            <View style={styles.GameBar__stat}>
                <Text style={[styles.text]}>{tokensLeft}</Text>
                <Text style={[styles.text_light]}>LIVES LEFT</Text>
            </View>
            <View style={styles.GameBar__stat}>
                <Text style={[styles.text]}>{wins}</Text>
                <Text style={[styles.text_light]}>WINS</Text>
            </View>
            <View style={styles.GameBar__stat}>
                <Text style={[styles.text]}>{time} </Text>
                <Text style={[styles.text_light]}>SECS LEFT</Text>
            </View>
        </View>
    )
}

export default GameBar;