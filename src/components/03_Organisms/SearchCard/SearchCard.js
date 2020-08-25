import React, { useState } from 'react'
import { Text, View, Image, Dimensions } from 'react-native'

import styles from './SearchCard.styling';

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

function SearchCard({ navigation, data, viewType, currUserG, setUserG, inLikesPage }) {
    const ip = require('../../IP_ADDRESS.json');
    const [host, setHost] = useState(null)
    const currUser = currUserG
    const setUser = setUserG

    const { width, height } = Dimensions.get('window');

    React.useEffect(() => {
        async function getHost() {
            let response = await fetch('http://' + ip.ipAddress + '/user/id/' + data.hostedBy)
            response = await response.json()
            setHost(response)
        }
        getHost()

    }, [])

    // width for card content
    let contentWidth = Dimensions.get('window').width * 0.5;

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
        type = typeMap.get(data.type)
        donationGoal = (data.donationGoal) ? data.donationGoal : null
        enteredUsers = data.users.children
        data['host'] = host
        data['top5'] = data.users.children.sort((a, b) => b.amountDonated - a.amountDonated).slice(0, 5)
        raffleid = data._id
    }

    // set default values for card
    let startData = null;
    let pgBar = null;
    let friendsEntered = <EnteredUsersDisplay enteredUsers={enteredUsers} navigation={navigation} />


    // if card has a host
    // Modified so that host is fetched from database. Data provides host id.
    let username;
    if (host) {
        username = <UsernameDisplay username={host.username} profPic={{ uri: host.profilePicture }} size='search' />
    }

    switch (type) {
        // default is the regular card as seen in 'Home (free drawing)' in Figma
        case 'default':
            startData = (
                <View>
                    {expired ?
                        <View>
                            <Text style={styles.SearchCard__startData}>DRAWING STARTED</Text>
                            <Countdown unix_timestamp={date} type='search' />
                        </View> :
                        <View>
                            <Text style={styles.SearchCard__startData}>DRAWING STARTS</Text>
                            <Countdown unix_timestamp={date} type='search' />
                        </View>
                    }
                </View>
            );
            break;
    }

    return (
        <View style={{ borderWidth: 2, width: contentWidth, borderColor: 'rgba(0, 0, 0, 0.05)' }}>
            <View style={styles.SearchCard__likeButton}>
                <LikeButton navigation={navigation} inLikesPage={inLikesPage} currUser={currUser} setUser={setUser} raffle={raffleid} style={{ margin: 0 }} />
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('Raffle', data)}>
                <View style={styles.SearchCard}>
                    <Image style={styles.SearchCard__image} source={{ uri: imageURI }} />
                    <View style={{ width: '100%', paddingHorizontal: '7%', }}>
                        <Text style={[fonts.h1, { fontSize: height * 0.018, paddingHorizontal: '4%' }]}>{title}</Text>
                        <TouchableOpacity
                            style={{ marginVertical: '2%' }}
                            onPress={() => {
                                navigation.navigate('OtherUser', { user: host })
                            }}>
                            {username}
                        </TouchableOpacity>
                        <View style={{ paddingHorizontal: '4%' }}>
                            {startData}
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default SearchCard;
