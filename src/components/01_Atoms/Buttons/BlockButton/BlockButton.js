// insta button + facebook button + login button

import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { styles } from "./BlockButton.styling";
import { SocialIcon } from 'react-native-elements';

function BlockButton(props) {

    let icon; // for fb and insta
    let buttonStyle = [styles.BlockButton];
    let buttonTitleStyle = [styles.BlockButton__title_primary];
    let selectedButtonStyle;
    let selectedButtonTitleStyle;

    // determine what kind/color of button it is
    switch (props.color) {
        case "primary":
            buttonStyle.push(styles.BlockButton_primary);
            break;
        case "secondary":
            buttonStyle.push(styles.BlockButton_secondary);
            buttonTitleStyle = [styles.BlockButton__title_secondary];
            // if selected in BuyOptions
            if (props.selected){
                buttonStyle.push(styles.BlockButton_secondarySelected);
                buttonTitleStyle = [styles.BlockButton__title_tertiary];
            }
            break;
        case "tertiary":
            buttonStyle.push(styles.BlockButton_tertiary);
            buttonTitleStyle = [styles.BlockButton__title_tertiary];
            break;
        case "light":
            buttonStyle.push(styles.BlockButton_light);
            buttonTitleStyle = [styles.BlockButton__title_secondary];
             // if selected in BuyOptions
            if (props.selected){
                buttonStyle.push(styles.BlockButton_primary);
                buttonTitleStyle = [styles.buttonTitleStyle];
            }
            break;
        case "facebook":
            buttonStyle.push(styles.BlockButton_facebook);
            buttonTitleStyle = [styles.BlockButton__title_tertiary];
            icon = <SocialIcon type='facebook' raised={false} iconStyle={styles.facebook_icon} style={styles.iconBg} iconSize={30} />
            break;
        case "google":
            buttonStyle.push(styles.BlockButton_google);
            buttonTitleStyle = [styles.BlockButton__title_google];
            icon = <SocialIcon type='google' raised={false} iconStyle={styles.google_icon} style={styles.iconBg} iconSize={30} />
            break;
    }

    // determing what size (large by default)
    switch (props.size) {
        case "short":
            buttonStyle.push(styles.BlockButton_short);
            break;
        case "small": // ex. follow button
            buttonStyle.push(styles.BlockButton_small);
            buttonTitleStyle.push(styles.BlockButton__title_small)
            break;
        case "shortSmall": // ex. buy chance buttons (second row)
            buttonStyle.push(styles.BlockButton_smallShort);
            buttonTitleStyle.push(styles.BlockButton__title_small)
            break;
        case "smallLongLeft": // ex. buy chance buttons (second row)
            buttonStyle.push(styles.BlockButton_smallLongLeft);
            buttonTitleStyle.push(styles.BlockButton__title_small)
            break;
        case "smallLongRight": // ex. buy chance buttons (second row)
            buttonStyle.push(styles.BlockButton_smallLongRight);
            buttonTitleStyle.push(styles.BlockButton__title_small)
            break;
    }

    // if button is disabled
    if (props.disabled) {
        buttonStyle.push(styles.BlockButton_disabled)
    }

    // if there's a banner on the button
    let banner;
    if (props.bannerTitle) {
        banner = (
            <View style={styles.BlockButton__banner}>
                <Text style={styles.BlockButton__bannerTitle}>{props.bannerTitle}</Text>
            </View>
        )
    }

    return (
        <TouchableOpacity style={[buttonStyle, props.style]} onPress={props.onPress} disabled={props.disabled}>
            {icon}
            <Text style={[buttonTitleStyle, props.title == "FOLLOWING" ? { fontSize: 11 } : null]}>{props.title}</Text>
            {banner}
        </TouchableOpacity>
    )
}

export default BlockButton;
