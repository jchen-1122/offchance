import React from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';
import { styles } from "./BlockButton.styling";
import { SocialIcon } from 'react-native-elements';

function BlockButton(props) {
    let icon;
    let buttonStyle = [styles.BlockButton];
    let buttonTitleStyle = [styles.BlockButton__title_primary];

    // determine what kind/color of button it is
    switch (props.color) {
        case "primary":
            buttonStyle.push(styles.BlockButton_primary);
            break;
        case "secondary":
            buttonStyle.push(styles.BlockButton_secondary);
            buttonTitleStyle = [styles.BlockButton__title_secondary];
            if (props.selected) {
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
            if (props.selected) {
                buttonStyle.push(styles.BlockButton_primary);
                buttonTitleStyle = [styles.buttonTitleStyle];
            }
            break;

        // different social login buttons
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
        
        // for InfoFeed
        case "InfoFeed":
            buttonStyle.push(styles.BlockButton_InfoFeed)
            buttonTitleStyle.push(styles.BlockButton__title_small)
            break;
    }

    // if button is disabled
    if (props.disabled) {
        buttonStyle.push(styles.BlockButton_disabled)
        buttonTitleStyle.push(styles.BlockButton__title_disabled)
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
        <TouchableOpacity style={[buttonStyle, props.style]} onPress={props.onPress} disabled={props.disabled} onLongPress={props.onLongPress}>
            {props.icon || icon}
            <Text style={[buttonTitleStyle, props.titleStyle, (props.title == "FOLLOWING" && props.size == 'small') ? { fontSize: 11 } : null]}>{props.title}</Text>
            {banner}
        </TouchableOpacity>
    )
}

export default BlockButton;
