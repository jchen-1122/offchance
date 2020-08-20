// Green banner -> notifies a successful password change
// Black banner -> notifies next drawing
// Red banner -> notifies to log in

import React from 'react';
import {View, Text} from 'react-native';
import {styles} from "./Banner.styling";
import { Icon } from 'react-native-elements';

function Banner(props){

    // determine what kind/color of banner it is
    let icon; // for red banner icon
    let bannerStyle;
    switch(props.color){
        case "green":
            bannerStyle=styles.Banner__green;
            break;
        case "black":
            bannerStyle=styles.Banner__black;
            break;
        case "red":
            bannerStyle=styles.Banner__red;
            icon = <Icon name='file-alert-outline' type='material-community' color='white' />
            break;
    }

    {/* TODO: modify position attribute of banner (red banner should be relative, others absolute) */}

    return (
        <View style={[styles.Banner, bannerStyle]}>
            {icon}
            <Text style={styles.Banner__title}>{props.title}</Text>
        </View>
    )
}

export default Banner;