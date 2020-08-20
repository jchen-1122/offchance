import React from 'react';
import {Text, Image, View, TouchableOpacity} from 'react-native';
import styles from './GridCard.styling';
import {fonts, utilities} from '../../../settings/all_settings'
import UsernameDisplay from '../../01_Atoms/UsernameDisplay/UsernameDisplay'

// for small, unclickable cards like in Latest Winners
function GridCard(props){

    let startData = null;
    let userData = null;
    let notifyMe = null; 
    let padding = styles.GridCard__winner_padding;

    switch(props.type){
        case "winner":
            userData = <UsernameDisplay profPic={require('../../../../assets/images/donor_placeholders/aang.png')} username='aang' size='latestWinner' />
            break;
    
        case "raffle":
            padding = styles.GridCard__raffle_padding;
            startData = <View style={styles.startData_margin}><Text style={styles.startData_grey} >DRAWING STARTS</Text><Text style={styles.freeDraw_date}>July 5</Text></View>;
            userData = <UsernameDisplay username='sumdude' profPic={require('../../../../assets/images/donor_placeholders/aang.png')} size='hostedBy'/>
            notifyMe = <View style={styles.notifyMe}><Text>NOTIFY ME</Text></View>
            break;

    }

    return (
        <TouchableOpacity onPress={() => props.navigation.navigate('Raffle')}>
            <View style={[styles.GridCard, padding]}>
                <Image style={styles.GridCard__image} source={require('../../../../assets/images/nintendoSwitch.jpeg')} />
                <Text style={styles.GridCard__title}>{props.title}</Text>
                <View>
                    {userData}
                </View>
                {startData}
                {notifyMe}
            </View>
        </TouchableOpacity>
    )
}

export default GridCard;