import React, { useState, useContext } from 'react'
import { View, ScrollView, Text, Image, Dimensions } from 'react-native'
import BottomNav from '../../02_Molecules/BottomNav/BottomNav'
import { utilities, fonts, colors } from '../../../settings/all_settings';
import styles from './Social.styling';
import GlobalState from '../../globalState'
import Card from '../../03_Organisms/Card/Card'
import Banner from '../../01_Atoms/Banner/Banner'
import { user_logged_in } from '../../../functions/user_functions';
import { live_drawing_now } from '../../../functions/raffle_functions'
import { in_a_day, is_expired } from '../../../functions/convert_dates'
var moment = require('moment');

export default function Social({ navigation }) {
    const data = require('../../IP_ADDRESS.json')
    const { user, setUser } = useContext(GlobalState)
    const [raffles, setRaffles] = useState([])

    React.useEffect(() => {
        if (!user_logged_in(user)) {
            navigation.navigate('NotLogin')
        }
        async function getRaffles() {
            let response = await fetch('http://' + data.ipAddress + '/raffle/all')
            response = await response.json()
            // filter ones that are happening today and haven't passed
            response = response.filter((raffle) => { return (in_a_day(raffle.startTime) && !raffle.archived) })
            response.sort((a, b) => (a.startTime < b.startTime) ? 1 : -1)

            setRaffles(response)
        }
        getRaffles()

    }, [])

    // no live drawings happening today
    if (raffles.length == 0) {
        return (
            <View style={utilities.container}>
                <View style={utilities.flexCenter}>
                    <Text style={[fonts.h1, { textAlign: 'center' }]}>Check back at the next live drawing to enter live chat!</Text>
                </View>
                <BottomNav navigation={navigation} active='Social' />
            </View>
        )
    }

    // will capitalize every word in the string
    function titleCase(str) {
        var splitStr = str.toLowerCase().split(' ');
        for (var i = 0; i < splitStr.length; i++) {
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
        }
        return splitStr.join(' ');
    }

    // determine the text of the header
    var headerContainer = [utilities.flexCenter, styles.headerContainer]
    let header = 'Live Drawing Happening '
    let banner;
    var nextRaffle = raffles[0]
    if (live_drawing_now(nextRaffle)) {
        header = header + 'Now'
        headerContainer.push({ backgroundColor: 'red' })
        banner = (
            <Banner
                color="red"
                title="LIVE DRAWING HAPPENING NOW" />
        )
    }
    else {
        var time = moment(nextRaffle.startTime * 1000)
        var fromNow = time.fromNow()
        header = header + titleCase(fromNow)
        banner = (
            <View style={{ width: '100%', marginBottom: 30 }}>
                <Banner
                    color="green"
                    title={"LIVE DRAWING " + fromNow.toUpperCase()} />
            </View>
        )
    }

    return (
        <View style={utilities.container}>
            <ScrollView contentContainerStyle={utilities.scrollview}>
                <View style={[utilities.flexCenter, {justifyContent: "flex-start"}]}>
                    {banner}
                    {/* <View style={headerContainer}>
                    <Text style={[fonts.h1, styles.header]}>{header}</Text>
                    </View> */}
                    {raffles.map((raffle, index) =>
                        <Card
                            data={raffle}
                            key={index}
                            navigation={navigation}
                            currUserG={user}
                            setUserG={setUser}
                            banner={false}
                            viewType={0}
                        />
                    )}
                </View>
            </ScrollView>
            <BottomNav navigation={navigation} active='Social' />
        </View>

    )
}
