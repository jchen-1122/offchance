import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {styles} from "./ToggleType.styling";
import { Icon } from 'react-native-elements'

function ToggleType(props){
    const label = ['All Drawings', 'Donate to Enter', 'Enter to Buy']
    return (
        <TouchableOpacity style={styles.ToggleType} onPress={() => props.setToggleMenuOpen(!props.toggleMenuOpen)}>
            <Text style={styles.ToggleType__label}>{label[props.viewType]}</Text>
            <Icon name='arrow-left-right' type='material-community' color='white' size={15}/>
        </TouchableOpacity>
    )
}

export default ToggleType;
