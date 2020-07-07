// insta button + facebook button + login button

import React from 'react';
import {Text, Image, View} from 'react-native';
import styles from './GridCard.styling';
import {fonts} from '../../../settings/all_settings'
import UsernameDisplay from '../../01_Atoms/UsernameDisplay/UsernameDisplay'

// for small, unclickable cards like in Latest Winners
function GridCard(props){
    return (
        <View style={styles.GridCard}>
            <Text style={fonts.h3}>{props.title}</Text>
            <UsernameDisplay profPic={require('../../../../assets/images/donor_placeholders/aang.png')}username='aang' size='hostedBy' />
        </View>

    )
}

export default GridCard;