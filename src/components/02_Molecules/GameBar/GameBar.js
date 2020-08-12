import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import styles from './GameBar.styling';
import { Icon } from 'react-native-elements'

function GameBar({ tokensLeft, wins, time }) {
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
            {time ? 
            <View style={styles.GameBar__stat}>
                    <Text style={[styles.text]}>{time} </Text>
                    <Text style={[styles.text_light]}>SECS LEFT</Text>
            </View> : null}
        </View>
    )
}

export default GameBar;