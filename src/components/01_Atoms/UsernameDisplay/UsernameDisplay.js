// insta button + facebook button + login button

import React from 'react';
import {TouchableOpacity, Text, Image, View} from 'react-native';
import { styles } from './UsernameDisplay.styling';
import { SocialIcon } from 'react-native-elements';
import {fonts} from '../../../settings/all_settings';

function UsernameDisplay(props){
    let profilePicStyle = styles.profilePic;
    let usernameStyle = [fonts.link]

    if (props.size == 'large'){
        profilePicStyle = styles.profilePic_large;
        usernameStyle.push(styles.username_large)
    }
    return (
        <View style={styles.container}>
            <Image style={profilePicStyle} source={props.profPic} />
            <Text style={usernameStyle}>@{props.username}</Text>
        </View>

    )
}

export default UsernameDisplay;