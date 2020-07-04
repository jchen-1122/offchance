import React from 'react'
import * as Progress from 'react-native-progress';
import { View, Text, Dimensions } from 'react-native'
import styles from './ProgressBar.styling'

function ProgressBar({progress, color, raised, goal}) {
    return (
        <View style={styles.bar}>
            <Progress.Bar progress={progress} width={Dimensions.get('window').width * 0.6} color={color} />
            <View style={styles.view}>
                <Text style={styles.raised}>{'$' + raised}</Text>
                <Text style={styles.goal}>{' raised of $' + goal + ' goal'}</Text>
            </View>
        </View>
    )
}

export default ProgressBar;