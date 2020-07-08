import React from 'react'
import { Text, View, Image, Dimensions } from 'react-native'
import styles from './Card.styling'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import ProgressBar from '../../02_Molecules/ProgressBar/ProgressBar';
import LikeButton from '../../01_Atoms/Buttons/LikeButton/LikeButton';
import UsernameDisplay from '../../01_Atoms/UsernameDisplay/UsernameDisplay';
import BlockButton from '../../01_Atoms/Buttons/BlockButton/BlockButton';
import CardBanner from '../../01_Atoms/CardBanner/CardBanner';
import {colors, fonts, utilities} from '../../../settings/all_settings';

function Card ({ navigation, onPress, type,  title, host, imageURI, date }) {

    let startData = null;
    let like = null;
    let cardBackground = styles.card__white;
    let friendsEntered = null;
    let button = <BlockButton title='Enter Drawing' color="primary" onPress={() => navigation.navigate('Raffle')}/>;
    let pgBar = <ProgressBar progress={230 / 500} color={colors.highlightColor} raised={230} goal={500} width={Dimensions.get('window').width * 0.6} ></ProgressBar>;

    switch(type){
        // default is the regular card as seen in 'Home (free drawing)' in Figma
        case 'default':
            like = <View style={styles.likeButton}><LikeButton /></View>;
            startData = <Text style={styles.startData_grey}>DRAWING STARTS ONCE TIMER REACHES 0 OR DONATION GOAL IS MET</Text>;
            friendsEntered = <Text style={styles.friends}>Entered by @yourbestfriend</Text>;
            break;
        // enter to buy drawings
        case 'buy':
            like = <View style={styles.likeButton}><CardBanner title='ENTER TO BUY' color='green' icon='usd'/><LikeButton /></View>;
            pgBar = null;
            startData = <View><Text style={styles.startData_grey} >DRAWING STARTS</Text><Text style={styles.freeDraw_date}>{date}</Text></View>;
            friendsEntered = <Text style={styles.friends}>Entered by @yourbestfriend</Text>;
            break;
        // free is the 'free drawing' card as seen in 'Home' in Figma
        case 'free':
            like = <View style={styles.likeButton}><CardBanner title='FREE DRAWING' color='black'/><LikeButton /></View>;
            pgBar = null;
            startData = <View><Text style={styles.startData_grey} >DRAWING STARTS</Text><Text style={styles.freeDraw_date}>{date}</Text></View>;
            break;
        // upcoming is the ard as seen in 'upcoming raffles' in Figma
        case 'upcoming':
            like = <View style={styles.upcoming_placeholder} />
            pgBar = null;
            button = <TouchableOpacity style={styles.upcoming_notifyMe} onPress={() => navigation.navigate('Raffle')}><Text>NOTIFY ME</Text></TouchableOpacity>;
            startData = <View><Text style={styles.startData_grey} >DRAWING STARTS</Text><Text style={styles.freeDraw_date}>{date}</Text></View>;
            break;
        // for simplified cards in your feed
        case 'notification':
            return (
                <ScrollView style={[styles.card, cardBackground]}>
                    <View style={styles.notif}>                    
                        <Image style={styles.notif_host} source={host.pic} />
                        <View>
                        <Text>@{host.name} {title}</Text>
                        <Text style={styles.notif_grey}>{date}</Text>
                        </View>
                    </View>
                    <Image style={styles.notif_pic} source={imageURI} />
                </ScrollView>
            )
        
        // DON'T THINK WE NEED THIS ANYMORE BUT JUST IN CASE
        // default-dark is for the new types of raffles Karann mentioned, change color at 'card__dark' in Card.styles.js
        // case 'default-dark':
        //     cardBackground = styles.card__dark;
        //     like = <View style={styles.likeButton}><LikeButton /></View>;
        //     startData = <Text style={styles.startData_grey}>DRAWING STARTS ONCE TIMER REACHES 0 OR DONATION GOAL IS MET</Text>;
        //     friendsEntered = <Text style={styles.friends}>Entered by @yourbestfriend</Text>;
        // break;
    }

    // if card has a host
    let username;
    if (host) {
        username = <UsernameDisplay username={host.name} profPic={host.pic} size='hostedBy'/>
    }
    return (
          <ScrollView style={[styles.card, cardBackground]}>
              {like}
              <View style={styles.itemDesc}>
                <Image style={styles.image} source={imageURI}/>
                <Text style={[fonts.h1, {width:Dimensions.get('window').width * 0.6}]}>{title}</Text>
                <View style={{width:Dimensions.get('window').width * 0.6}}>
                    {username}
                </View>
                {friendsEntered}
                {startData}
                {/* TODO: somehow get two or more images to overlap each other and style the friends-entered line */}
                {pgBar}
                {button}
              </View>
          </ScrollView>
    )
}

export default Card