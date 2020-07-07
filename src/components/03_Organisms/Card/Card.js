import React from 'react'
import { Text, View, Image, Dimensions } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import styles from './Card.styles'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import ProgressBar from '../../02_Molecules/ProgressBar/ProgressBar';
import LikeButton from '../../01_Atoms/Buttons/LikeButton/LikeButton';
import UsernameDisplay from '../../01_Atoms/UsernameDisplay/UsernameDisplay';
import BlockButton from '../../01_Atoms/Buttons/BlockButton/BlockButton';
import {colors, fonts, utilities} from '../../../settings/all_settings';

function Card ({ navigation, onPress, type,  title, host, imageURI, date }) {

    let startData = null;
    let like = null;
    let pgBar = <ProgressBar progress={230 / 500} color='orange' raised={230} goal={500} width={Dimensions.get('window').width * 0.6} ></ProgressBar>;
    let friendsEntered = null;
    let button = <BlockButton title='Enter Drawing' color="primary" onPress={() => navigation.navigate('Raffle')}/>;

    switch(type){
        // default is the regular card as seen in 'Home (free drawing)' in Figma
        case 'default':
            like = <View style={styles.likeButton}><LikeButton /></View>;
            startData = <Text style={styles.startData_grey}>DRAWING STARTS ONCE TIMER REACHES 0 OR DONATION GOAL IS MET</Text>;
            friendsEntered = <Text style={styles.friends}>Entered by @yourbestfriend</Text>;
            break;
        // free is the 'free drawing' card as seen in 'Home' in Figma
        case 'free':
            like = <View style={styles.likeButton}><Text style={styles.freeDraw_banner}>FREE DRAWING</Text><LikeButton /></View>;
            pgBar = null;
            startData = <View><Text style={styles.startData_grey} >DRAWING STARTS</Text><Text style={styles.freeDraw_date}>{date}</Text></View>;
            break;
        // upcoming is the ard as seen in 'upcoming raffles' in Figma
        case 'upcoming':
            like = <View style={styles.upcoming_placeholder}></View>
            pgBar = null;
            button = <TouchableOpacity style={styles.upcoming_notifyMe} onPress={() => navigation.navigate('Raffle')}><Text>NOTIFY ME</Text></TouchableOpacity>;
            startData = <View><Text style={styles.startData_grey} >DRAWING STARTS</Text><Text style={styles.freeDraw_date}>{date}</Text></View>;
            break;
        // simplified card you see on your feed
        case 'feed':
            like = null;
            pgBar = null;
            startData = null;
            break;
    }

    let username;
    if (host) {
        username = <UsernameDisplay username={host.name} profPic={host.pic} size='hostedBy'/>
    }
    return (
          <ScrollView style={styles.card}>
              {like}
              <View style={[styles.itemDesc, {justifyContent: 'center'}]}>
                <Image style={styles.image} source={imageURI}/>
                <Text style={[fonts.h1, {width:Dimensions.get('window').width * 0.6, marginTop: 15}]}>{title}</Text>
                <View style={{width:Dimensions.get('window').width * 0.6}}>
                    {username}
                </View>
                {startData}
                {/* TODO: somehow get two or more images to overlap each other and style the friends-entered line */}
                {friendsEntered}
                {pgBar}
                {button}
              </View>
          </ScrollView>
    )
}

export default Card