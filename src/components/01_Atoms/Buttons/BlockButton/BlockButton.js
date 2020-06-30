// insta button + facebook button + login button

import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {styles} from "./BlockButton.styling";

function BlockButton(props){

    // determine what kind/color of button it is
    let buttonStyle;
    let buttonTitleStyle=styles.BlockButton__title_primary;
    switch(props.color){
        case "primary":
            buttonStyle=styles.BlockButton_primary;
            break;
        case "secondary":
            buttonStyle=styles.BlockButton_secondary
            buttonTitleStyle=styles.BlockButton__title_secondary;
            break;
        case "facebook":
            buttonStyle=styles.BlockButton_facebook;
            break;
        case "instagram":
            buttonStyle=styles.BlockButton_insta;
            break;
    }


    return (
        <TouchableOpacity style={[styles.BlockButton, buttonStyle]} onPress={props.onPress}>
            <Text style={[styles.BlockButton__title, buttonTitleStyle]}>{props.title}</Text>
        </TouchableOpacity>
    )
}

export default BlockButton;