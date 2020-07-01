// Green banner that notifies a successful password change

import React from 'react';
import {View, Text} from 'react-native';
import {styles} from "./Banner.styling";

function Banner(props){

    return (
        <View style={styles.Banner}>
            <Text style={styles.Banner__title}>{props.title}</Text>
        </View>
    )
}

export default Banner;