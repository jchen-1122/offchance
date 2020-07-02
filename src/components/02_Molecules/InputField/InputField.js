import React from 'react';
import {TextInput, Text, View} from 'react-native';
import {styles} from "./InputField.styling";
import {Icon} from 'react-native-elements';
import Tooltip from '../Tooltip/Tooltip';


function InputField(props){

    // increase size of box if its a textArea
    let inputBoxSizes = [styles.InputField__box]
    if (props.textArea) {
        inputBoxSizes.push(styles.InputField__box_textArea)
    }

    // if input is supposed to have an icon with a tooltip (i.e. insta handle)
    let icon = (props.tooltip) ? (<Tooltip label={<Icon name='info'/>} content={props.tooltipContent}/>) : null;

    return (
        <View style={styles.InputField}>
            <View style={[styles.InputField__labelContainer, {justifyContent: 'space-between'}]}>
                <View style={styles.InputField__labelContainer}>
                    <Text style={styles.InputField__label}>
                        {props.label}
                    </Text>
                    {/* add red required * if required field */}
                    {(props.required) ? <Text style={{color: 'red'}}>*</Text> : null}
                </View>
                {icon}
            </View>

            <TextInput 
                secureTextEntry={props.password} 
                multiline={props.textArea} 
                numberOfLines={4}
                keyboardType={props.keyboardType}
                style={inputBoxSizes} />
        </View>
    )
}

export default InputField;