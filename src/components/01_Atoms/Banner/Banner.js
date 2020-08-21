// Green banner -> notifies a successful password change
// Black banner -> notifies next drawing
// Red banner -> notifies to log in

import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {styles} from "./Banner.styling";
import { Icon } from 'react-native-elements';

function Banner(props){

    // determine what kind/color of banner it is
    let icon; // for red banner icon
    let bannerStyle;
    let absolute;
    let obj;
    switch(props.color){
        case "green":
            bannerStyle=styles.Banner__green;
            absolute=styles.Banner__absolute;
            break;
        case "black":
            bannerStyle=styles.Banner__black;
            obj = () => {props.navigation.navigate('Raffle', props.press)};
            break;
        case "red":
            bannerStyle=styles.Banner__red;
            icon = <Icon name='file-alert-outline' type='material-community' color='white' size={props.size}/>
            break;
    }

    {/* TODO: modify position attribute of banner (red banner should be relative, others absolute) */}

    return (
        <TouchableOpacity style={[styles.Banner, bannerStyle, absolute]} onPress={obj}>
            {icon}
            <Text style={styles.Banner__title}>{props.title}</Text>
        </TouchableOpacity>
    )
}

export default Banner;