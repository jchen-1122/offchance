import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {styles} from "./Banner.styling";

function Banner(props){
    // determine what kind/color of banner it is
    let icon;
    let bannerStyle;
    let absolute;

    switch(props.color){
        case "green":
            bannerStyle=styles.Banner_green;
            absolute=styles.Banner_absolute;
            break;
        case "black":
            bannerStyle=styles.Banner_black;
            break;
        case "red":
            bannerStyle=styles.Banner_red;
            break;
    }

    return (
        <TouchableOpacity style={[styles.Banner, bannerStyle, absolute]} onPress={()=>{if (props.press) props.navigation.navigate('Raffle', props.press)}}>
            {icon}
            <Text style={styles.Banner__title}>{props.title}</Text>
        </TouchableOpacity>
    )
}

export default Banner;