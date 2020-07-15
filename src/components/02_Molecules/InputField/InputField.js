import React from 'react';
import {TextInput, Text, View} from 'react-native';
import {styles} from "./InputField.styling";
import {Icon} from 'react-native-elements';
import Tooltip from '../Tooltip/Tooltip';
import LikeButton from '../../01_Atoms/Buttons/LikeButton/LikeButton';


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
            <View style={styles.InputField__labelContainer}>
                <Text style={styles.InputField__label}>
                    {props.label} {(props.required) ? <Text style={{color: 'red'}}>*</Text> : null}
                </Text>
                {icon}
            </View>

            <TextInput 
                value={props.value}
                textContentType={props.textContentType}
                returnKeyType="next"
                keyboardAppearance="dark"
                autoCorrect={false}
                autoCapitalize={props.autoCapitalize || "none"}
                secureTextEntry={props.password} 
                multiline={props.textArea} 
                numberOfLines={4}
                keyboardType={props.keyboardType}
                style={inputBoxSizes} 
                maxLength={props.maxLength}
                onChangeText={props.onChangeText}/>
        </View>
    )
}

export default InputField;