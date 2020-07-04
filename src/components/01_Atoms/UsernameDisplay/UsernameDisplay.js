// insta button + facebook button + login button

import React from 'react';
import {TouchableOpacity, Text, Image, View} from 'react-native';
import { styles } from './UsernameDisplay.styling';
import { SocialIcon } from 'react-native-elements';
import {fonts} from '../../../settings/all_settings';

function UsernameDisplay(props){
    let profilePicStyle = styles.profilePic;
    let usernameStyle = [fonts.link]
    let displayText = '@' + props.username;
    let containerStyle = styles.container;

    switch(props.size){
        case 'large':
            profilePicStyle = styles.profilePic_large;
            usernameStyle.push(styles.username_large);
            break;
        case 'hostedBy':
            profilePicStyle = styles.profilePic_small;
            usernameStyle = styles.username_small;
            displayText = 'Hosted by ' + displayText;
            containerStyle = styles.container_hostedBy;
            break;

    }

    return (
        <View style={containerStyle}>
            <Image style={profilePicStyle} source={props.profPic} />
            <Text style={usernameStyle}>{displayText}</Text>
        </View>

    )
}

export default UsernameDisplay;