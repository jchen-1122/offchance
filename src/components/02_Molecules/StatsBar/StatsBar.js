import React from 'react'
import {View, Text} from 'react-native'
import {styles} from './StatsBar.styling'

export default function(props) {
    return (
    <View>
        <View style={styles.row}>
            <Text style={styles.follower}>{props.followers}</Text>
            <Text style={styles.number}>{props.following}</Text>
            <Text style={styles.number}>{props.enteredRaffles}</Text>
        </View>
        <View style={styles.row}>
            <Text style={styles.followerTitle}>followers</Text>
            <Text style={styles.title}>following</Text>
            <Text style={styles.title}>entered</Text>
        </View>
    </View>
    )
}