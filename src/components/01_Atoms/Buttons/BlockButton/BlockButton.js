// insta button + facebook button + login button

import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {styles} from "./BlockButton.styling";
import { SocialIcon } from 'react-native-elements';

function BlockButton(props){

    let icon; // for fb and insta
    let buttonStyle = [styles.BlockButton];
    let buttonTitleStyle=[styles.BlockButton__title_primary];

    // determine what kind/color of button it is
    switch(props.color){
        case "primary":
            buttonStyle.push(styles.BlockButton_primary);
            break;
        case "secondary":
            buttonStyle.push(styles.BlockButton_secondary);
            buttonTitleStyle=[styles.BlockButton__title_secondary];
            break;
        case "highlight": // Off Chance Orange
            buttonStyle.push(styles.BlockButton_highlight);
            break;
        case "facebook":
            buttonStyle.push(styles.BlockButton_facebook);
            icon = <SocialIcon type='facebook' raised={false} iconStyle={styles.icon} style={styles.iconBg} iconSize={30}/>
            break;
        case "instagram":
            buttonStyle.push(styles.BlockButton_insta);
            icon = <SocialIcon type='instagram' raised={false} iconStyle={styles.icon} style={styles.iconBg} iconSize={30}/>
            break;
    }

    // determing what size (large by default)
    switch(props.size){
        case "short":
            buttonStyle.push(styles.BlockButton_short);
            break;
        case "small": // ex. follow button
            buttonStyle.push(styles.BlockButton_small);
            buttonTitleStyle.push(styles.BlockButton__title_small)
            break;
    }

    // if button is disabled
    if (props.disabled) {
        buttonStyle.push(styles.BlockButton_disabled)
    }

    return (
        <TouchableOpacity style={buttonStyle} onPress={props.onPress} disabled={props.disabled}>
            {icon}
            <Text style={[styles.BlockButton__title, buttonTitleStyle]}>{props.title}</Text>
        </TouchableOpacity>
    )
}

export default BlockButton;