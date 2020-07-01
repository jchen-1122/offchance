import React from 'react'
import { TouchableOpacity, Text } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import styles from './Checkbox.styling'

function CheckBox ({ selected, onPress, text}) {
    return (
        <TouchableOpacity 
            style={[styles.checkBox]} 
            onPress={onPress}>
            <Icon
                style={styles.checkbox__icon}
                size={20}
                color={'#211f30'}
                name={ selected ? 'check-box' : 'check-box-outline-blank'}
            />
            <Text style={styles.checkBox__text}> {text} </Text>
    </TouchableOpacity>
    )
}

export default CheckBox