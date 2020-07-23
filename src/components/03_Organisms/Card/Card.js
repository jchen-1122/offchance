import React, {useState} from 'react'
import { Text, View, Image, Dimensions } from 'react-native'
import styles from './Card.styling'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import ProgressBar from '../../02_Molecules/ProgressBar/ProgressBar';
import LikeButton from '../../01_Atoms/Buttons/LikeButton/LikeButton';
import UsernameDisplay from '../../01_Atoms/UsernameDisplay/UsernameDisplay';
import BlockButton from '../../01_Atoms/Buttons/BlockButton/BlockButton';
import CardBanner from '../../01_Atoms/CardBanner/CardBanner';
import EnteredUsersDisplay from '../../01_Atoms/EnteredUsersDisplay/EnteredUsersDisplay';
import {colors, fonts, utilities, dimensions} from '../../../settings/all_settings';
import {unix_to_date, is_expired} from '../../../functions/convert_dates';

function Card ({ navigation, data, onPress }) {
    const ip = require('../../IP_ADDRESS.json');
    const [host, setHost] = useState(null)

    React.useEffect(async () => {
        async function getHost() {
          let response = await fetch('http://'+ip.ipAddress+':3000/user/id/' + data.hostedBy)
          response = await response.json()
          setHost(response)
        }
        getHost()
      }, [])
    
    const getUser = async (id) => {
        let response = await fetch('http://'+ip.ipAddress+':3000/user/id/' + id)
        let json = await response.json()
        return json
    }
    
    // width for card content
    let contentWidth = Dimensions.get('window').width * 0.65;

    // maps numerical types to actual types of cards
    let typeMap = new Map()
    typeMap.set(1, 'default') // donate to enter
    typeMap.set(2, 'buy') // enter to buy

    // get fields from data passed in from fetch
    let title;
    let imageURI;
    let date; // TODO: in last 24 hours, should be a timer
    let type;
    let expired;
    let donationGoal;
    let enteredUsers;
    let top5;
    if (data){
        title = data.name
        imageURI = data.images[0]
        date = unix_to_date(data.startTime)
        expired = is_expired(data.startTime)
        type = typeMap.get(data.type)
        donationGoal = (data.donationGoal) ? data.donationGoal : null,
        enteredUsers = data.users.children
        top5 = data.users.children.sort((a,b)=>b.amountDonated - a.amountDonated).slice(0,5)
    }
    
    // set default values for card
    let startData = null;
    let like = null;
    let pgBar = null;
    data['host'] = host
    let button = <BlockButton title='Enter Drawing' color="primary" onPress={async () => {
        let top5Pics = []
        if (top5.length >= 1) {
            let curr1 = await getUser(top5[0].userID)
            top5Pics.push(curr1);
        }
        if (top5.length >= 2) {
            let curr2 = await getUser(top5[1].userID)
            top5Pics.push(curr2);
        }
        if (top5.length >= 3) {
            let curr3 = await getUser(top5[2].userID)
            top5Pics.push(curr3);
        }
        if (top5.length >= 4) {
            let curr4 = await getUser(top5[3].userID)
            top5Pics.push(curr4)
        }
        if (top5.length >= 5) {
            let curr5 = await getUser(top5[4].userID)
            top5Pics.push(curr5)
        }
        data['top5'] = top5Pics
        console.log('here')
        navigation.navigate('Raffle', data)}}/>
    let friendsEntered = <EnteredUsersDisplay enteredUsers={enteredUsers} navigation={navigation}/>

    // CHECK WHAT TYPE OF CARD--------------------------------------------------------------
    switch(type){
        // default is the regular card as seen in 'Home (free drawing)' in Figma
        case 'default':
            like = <View style={styles.likeButton}><LikeButton /></View>;
            if (donationGoal){
                pgBar = 
                <View style={{marginTop: 15}}>
                    <ProgressBar progress={230 / donationGoal} color={colors.primaryColor} raised={230} goal={donationGoal} width={contentWidth} />
                </View>
            }
            startData = (
                <View>
                    <Text style={[styles.startData_grey,fonts.p]}>
                        {(expired) ? 'DRAWING STARTED' : 'DRAWING STARTS ONCE TIMER REACHES 0 OR DONATION GOAL IS MET'}   
                    </Text>
                    <Text style={styles.freeDraw_date}>{date}</Text>
                </View>);
            break;
        // enter to buy drawings
        case 'buy':
            like = (
                <View style={styles.likeButton}>
                    <CardBanner title='ENTER TO BUY' color='green' icon='usd'/>
                    <LikeButton />
                </View>);
            startData = (<View><Text style={[styles.startData_grey,fonts.p]}>{expired ? 'DRAWING STARTED' : 'DRAWING STARTS'}</Text><Text style={styles.freeDraw_date}>{date}</Text></View>);
            break;
        // for upcoming 4 raffles
        case 'upcoming':
            like = <View style={styles.upcoming_placeholder} />
            friendsEntered = null;
            button = <TouchableOpacity style={styles.upcoming_notifyMe} onPress={() => navigation.navigate('Raffle')}><Text>NOTIFY ME</Text></TouchableOpacity>;
            startData = <View><Text style={[styles.startData_grey,fonts.p]} >DRAWING STARTS</Text><Text style={styles.freeDraw_date}>{date}</Text></View>;
            break;
        // for simplified cards in your feed
        case 'notification':
            return (
                <ScrollView style={[styles.card]}>
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
    }

    // if card has a host
    // Modified so that host is fetched from database. Data provides host id.
    let username;
    //if (host) {
    //    username = <UsernameDisplay username={host.name} profPic={host.pic} size='hostedBy'/>
    //}
    if (host) {
        username = <UsernameDisplay username={host.username} profPic={{uri: host.profilePicture}} size='hostedBy'/>
    }

    return (
          <ScrollView style={[styles.card]}>
              {like}
              <View style={styles.itemDesc}>
                <Image style={styles.image} source={{uri: imageURI}} onPress={() => {
                }}/>
                <View style={{flex: 1, width: contentWidth}}>
                    <Text style={[fonts.h1,{textAlign: 'center'}]}>{title}</Text>
                    <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('OtherUser', {user: host})
                    }}>
                        {username}
                    </TouchableOpacity>
                    {friendsEntered}
                    {startData}
                </View>
                {pgBar}
                {button}
              </View>
          </ScrollView>
    )
}

export default Card