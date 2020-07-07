import React from 'react';
import {Text, Image, View, TouchableOpacity} from 'react-native';
import styles from './GridCard.styling';
import {fonts, utilities} from '../../../settings/all_settings'
import UsernameDisplay from '../../01_Atoms/UsernameDisplay/UsernameDisplay'

// for small, unclickable cards like in Latest Winners
function GridCard(props){
    return (
        <TouchableOpacity onPress={() => props.navigation.navigate('Raffle')}>
            <View style={styles.GridCard}>
                <Image style={styles.GridCard__image} source={require('../../../../assets/images/nintendoSwitch.jpeg')} />
                <Text style={[fonts.h3,{textAlign: 'center'}]}>{props.title}</Text>
                <View>
                    <UsernameDisplay profPic={require('../../../../assets/images/donor_placeholders/aang.png')} username='aang' size='latestWinner' />
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default GridCard;