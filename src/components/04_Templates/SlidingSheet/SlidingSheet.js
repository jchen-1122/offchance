import React from 'react'
import { View, Text, TouchableOpacity} from 'react-native'
import { utilities, fonts } from '../../../settings/all_settings';
import { Icon } from 'react-native-elements';
import styles from './SlidingSheet.styles';

function SlidingSheet(props) {
    if (props.visible) {
        return (
            <View style={utilities.container}>
                <View style={styles.slidingSheet__header}>
                    <TouchableOpacity onPress={() => props.toggleSheet()}>
                        <Icon name='close' />
                    </TouchableOpacity>
                    <Text style={fonts.h1}>{props.title}</Text>
                    <View />
                </View>
                
            </View>
        )
    }
    else {
        return null;
    }
}

export default SlidingSheet;