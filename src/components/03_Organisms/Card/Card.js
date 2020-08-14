import React, { useState } from 'react'
import { Text, View, Image, Dimensions } from 'react-native'
import styles from './Card.styling'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import ProgressBar from '../../02_Molecules/ProgressBar/ProgressBar';
import LikeButton from '../../01_Atoms/Buttons/LikeButton/LikeButton';
import UsernameDisplay from '../../01_Atoms/UsernameDisplay/UsernameDisplay';
import Countdown from '../../01_Atoms/Countdown/Countdown';
import BlockButton from '../../01_Atoms/Buttons/BlockButton/BlockButton';
import CardBanner from '../../01_Atoms/CardBanner/CardBanner';
import EnteredUsersDisplay from '../../01_Atoms/EnteredUsersDisplay/EnteredUsersDisplay';
import { colors, fonts, utilities, dimensions } from '../../../settings/all_settings';
import { in_a_day, is_expired } from '../../../functions/convert_dates';
import { top5_raffle } from '../../../functions/explore_functions';
import { time_from_now } from '../../../functions/convert_dates';
import TextLink from '../../01_Atoms/Buttons/TextLinks/TextLinks'

function Card({ navigation, data, cardType, currUserG, setUserG, inLikesPage, banner, feedType, prize, userType, otherUser }) {
    const ip = require('../../IP_ADDRESS.json');
    const [host, setHost] = useState(null)
    const currUser = currUserG
    const setUser = setUserG

    React.useEffect(() => {
        async function getHost() {
            let response = await fetch('http://' + ip.ipAddress + '/user/id/' + data.hostedBy)
            response = await response.json()
            setHost(response)
        }
        getHost()
    }, [host])

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
    let raffleid;
    let today;
    if (data) {
        title = data.name
        imageURI = data.images[0]
        date = data.startTime
        expired = is_expired(data.startTime)
        today = in_a_day(data.startTime)
        type = cardType || typeMap.get(data.type)
        donationGoal = (data.donationGoal) ? data.donationGoal : null
        enteredUsers = data.users.children
        data['host'] = host
        data['top5'] = data.users.children.sort((a, b) => b.amountDonated - a.amountDonated).slice(0, 5)
        data['winners'] = data.winners
        raffleid = data._id
    }

    let buttonText = 'ENTER DRAWING'
    for (var raffle of currUser.rafflesEntered.children){
        if (raffle.raffleID == raffleid){
            buttonText = 'YOU HAVE ' + raffle.chances + ' CHANCES' + ((raffle.size && raffle.size !== 'One Size') ? ' FOR SIZE ' + raffle.size : '')
        }
    }
    // set default values for card
    let startData = null;
    let like = null;
    let pgBar = null;
    let button = <BlockButton title={buttonText} color="secondary" onPress={() => navigation.navigate('Raffle', data)} />;
    let friendsEntered = <EnteredUsersDisplay enteredUsers={enteredUsers} navigation={navigation} />

    // CHECK WHAT TYPE OF CARD--------------------------------------------------------------
    switch (type) {
        // default is the regular card as seen in 'Home (free drawing)' in Figma
        case 'default':
            like = (
                <View style={styles.likeButton}>
                    {(banner) ? <CardBanner title='DONATE TO WIN' color='lightGreen' /> : null}
                    <LikeButton navigation={navigation} inLikesPage={inLikesPage} currUser={currUser} setUser={setUser} raffle={raffleid} />
                </View>);
            // if (donationGoal) {
            //     pgBar =
            //         <View style={{ marginTop: 15 }}>
            //             <ProgressBar progress={230 / donationGoal} color={colors.primaryColor} raised={230} goal={donationGoal} width={contentWidth} />
            //         </View>
            // }
            startData = (
                <View>
                    {expired ?
                        <View>
                            <Text style={[styles.startData_grey, fonts.p]}>DRAWING COMPLETED</Text>
                            <Countdown unix_timestamp={date} />
                        </View> :
                        <View>
                            <Text style={[styles.startData_grey, fonts.p]}>DRAWING STARTS</Text>
                            <Countdown unix_timestamp={date} />
                            <Text style={[styles.grey_text, fonts.p]}>OR WHEN DONATION GOAL IS MET</Text>
                        </View>
                    }
                </View>
            );
            break;
        // enter to buy drawings
        case 'buy':
            like = (
                <View style={styles.likeButton}>
                    {(banner) ? <CardBanner title='ENTER TO BUY' color='darkGreen' icon='usd' /> : null}
                    <LikeButton navigation={navigation} inLikesPage={inLikesPage} currUser={currUser} setUser={setUser} raffle={raffleid} />
                </View>);
            startData = (<View><Text style={[styles.startData_grey, fonts.p]}>{expired ? 'DRAWING COMPLETED' : 'DRAWING STARTS'}</Text><Countdown unix_timestamp={date} /></View>);
            break;
        // for upcoming 4 raffles
        // case 'upcoming':
        //     like = <View style={styles.upcoming_placeholder} />
        //     friendsEntered = null;
        //     button = <TouchableOpacity style={styles.upcoming_notifyMe} onPress={() => navigation.navigate('Raffle')}><Text>NOTIFY ME</Text></TouchableOpacity>;
        //     startData = <View><Text style={[styles.startData_grey, fonts.p]} >DRAWING STARTS</Text><Countdown unix_timestamp={date} /></View>;
        //     break;
        // for simplified cards in your feed
        case 'feed':
            var picture;
            var caption;
            let person;
            if (feedType == 'following' && host) {
                picture =
                    <TouchableOpacity onPress={() => {
                        navigation.navigate('OtherUser', { user: host })
                    }}>
                        <Image style={styles.notif_host} source={{ uri: host.profilePicture }} />
                    </TouchableOpacity>
                person = <Text style={{ textDecorationLine: 'underline' }} onPress={() => navigation.navigate('OtherUser', { user: host })}>@{host.username}</Text>
                caption = ' posted a drawing for '
            }
            else if (feedType == "win" && currUser) {
                picture = (userType == 'other') ?
                    <Image style={styles.notif_host} source={{ uri: otherUser.profilePicture }} /> : <Image style={styles.notif_host} source={{ uri: currUser.profilePicture }} />
                let user = (userType == 'other') ? otherUser.username : 'You'

                if (prize == 0) {
                    caption = user + " won a "
                }
                else {
                    caption = user + " won chances for a drawing for "
                }
            }

            return (
                <View style={{ maxHeight: Dimensions.get('window').height * 0.48 }}>
                    <ScrollView style={[styles.card, { paddingTop: '5%' }]}>
                        <View style={styles.notif}>
                            {picture}
                            <View>

                                <Text>{person}{caption}<Text style={{ fontWeight: 'bold' }}>{title}</Text></Text>
                                <Text style={styles.notif_grey}>{time_from_now(date, true)}</Text>
                            </View>
                        </View>
                        <TouchableOpacity onPress={() => navigation.navigate('Raffle', data)}>

                            <Image style={styles.notif_pic} source={{ uri: imageURI }} />
                        </TouchableOpacity>
                    </ScrollView>
                </View>

            )
    }

    // if card has a host
    // Modified so that host is fetched from database. Data provides host id.
    let username;
    if (host) {
        username = <UsernameDisplay username={host.username} profPic={{ uri: host.profilePicture }} size='hostedBy' />
    }

    return (
        <View style={[styles.card]}>
            {like}
            <View style={styles.itemDesc}>

                <View style={{ flex: 1, width: contentWidth }}>
                    <TouchableOpacity style={{ alignItems: 'center', width: '100%', marginBottom: '3%' }} onPress={() => navigation.navigate('Raffle', data)}>
                        <Image style={styles.image} source={{ uri: imageURI }} />
                        <Text style={[fonts.h1, { textAlign: 'center' }]}>{title}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('OtherUser', { user: host })
                        }}>
                        {username}
                    </TouchableOpacity>
                    {friendsEntered}
                    {startData}
                </View>
                {pgBar}
                {button}
            </View>
        </View>
    )
}

export default Card
