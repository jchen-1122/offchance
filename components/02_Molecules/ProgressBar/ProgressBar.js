import React from 'react'
import * as Progress from 'react-native-progress';
import { View, Text, Dimensions } from 'react-native'
import { Icon } from 'react-native-elements';
import { colors, fonts, utilities } from '../../../settings/all_settings';
import styles from './ProgressBar.styling'

function ProgressBar({progress, color, raised, goal, width}) {

    return (
        <View style={styles.bar}>
            <Progress.Bar progress={progress} width={width} color={color} />
            <View style={styles.view}>
                <Text style={styles.raised}>{'$' + raised}</Text>
                <Text style={styles.goal}>{' raised'}</Text>
                <View style={{zIndex: 50, position: 'absolute', left: (Dimensions.get('window').width - 80) * progress, marginTop: -21}}>
                    { progress < 0 ? null : <Icon name={'fire'}
                        type='material-community'
                        color={colors.primaryColor}
                        backgroundColor='red'
                        size={40 * progress}
                        style={{borderRadius: 50}} />}
                </View>
            </View>
            {/*border: left: 0; right: Dimensions.get('window').width - 100 */}

        </View>
    )
}

export default ProgressBar;
