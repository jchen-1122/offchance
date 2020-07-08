import React from 'react'
import { Text, View, Image, Dimensions } from 'react-native'
import styles from './CardBanner.styling';
import {Icon} from 'react-native-elements';

// for "FREE TO ENTER" and "ENTER TO BUY" banners on cards
function UsernameDisplay(props){

    // account for different colors of banner
    let bannerStyles = [styles.CardBanner]
    switch (props.color) {
        case ('black'):
            bannerStyles.push(styles.CardBanner_black);
            break;
        case ('green'):
            bannerStyles.push(styles.CardBanner_green);
            break;
    }

    // add an icon if appropriate
    let icon;
    if (props.icon) {
        icon = <Icon name={props.icon} type='font-awesome' color='white' size={15} containerStyle={{marginRight: 5}}/>
    }

    return (
        <View style={bannerStyles}>
            {icon}
            <Text style={styles.CardBanner__title}>{props.title}</Text>
        </View>

    )
}

export default UsernameDisplay;