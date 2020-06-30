// big OR divider
import React from 'react';
import {View, Text} from 'react-native';
import {styles} from "./Divider.styling";

function Divider(){

    return (
        <View style={styles.Divider}>
            <View style={styles.Divider__line} />
            <Text style={styles.Divider__text}>OR</Text>
            <View style={styles.Divider__line} />
        </View>
    )
}

export default Divider; 