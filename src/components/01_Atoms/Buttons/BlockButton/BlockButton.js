// insta button + facebook button + login button

import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {styles} from "./BlockButton.styling";
import { Icon } from 'react-native-elements'
//import InstagramIcon from '@material-ui/icons/Instagram';

function BlockButton(props){

    // determine what kind/color of button it is
    let buttonStyle;
    let buttonIcon;
    let buttonTitleStyle=styles.BlockButton__title_white;
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
            buttonIcon='facebook-official';
            break;
        case "instagram":
            buttonStyle=styles.BlockButton_insta;
            buttonIcon='instagram';
            break;
    }


    return (
        <TouchableOpacity style={[styles.BlockButton, buttonStyle]}>
            {buttonIcon && <Icon color='white' name={buttonIcon} type='font-awesome' />}
            <Text style={[styles.BlockButton__title, buttonTitleStyle]}>{props.title}</Text>
        </TouchableOpacity>
    )
}

export default BlockButton;