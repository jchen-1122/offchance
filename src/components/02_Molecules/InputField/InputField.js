import React from 'react';
import {TextInput, Text, View} from 'react-native';
import {styles} from "./InputField.styling";


function InputField(props){

    // increase size of box if its a textArea
    let inputBoxSizes = [styles.InputField__box]
    if (props.textArea) {
        inputBoxSizes.push(styles.InputField__box_textArea)
    }

    return (
        <View style={styles.InputField}>
            <Text style={styles.InputField__label}>
                {props.label}
            </Text>
            <TextInput style={inputBoxSizes} multiline={props.textArea} numberOfLines={4}/>
        </View>
    )
}

export default InputField;