import React, { useState, useContext } from 'react'
import { View, ScrollView, Text, Image, Dimensions } from 'react-native'
import BottomNav from '../../02_Molecules/BottomNav/BottomNav'
import { utilities, fonts, colors } from '../../../settings/all_settings';
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
            // filter raffles that are happening today and aren't archived
            response = response.filter((raffle) => { return (in_a_day(raffle.startTime) && !raffle.archived) })
            response.sort((a, b) => (a.startTime < b.startTime) ? 1 : -1) // ones happening sooner sort to the front
            setRaffles(response)
        }
        getRaffles()

    }, [])

    // if no live drawings happening today
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

    // if there's a banner happening today
    let banner;
    var nextRaffle = raffles[0]
    // one happening now
    if (live_drawing_now(nextRaffle)) {
        banner = (
            <Banner
                color="red"
                title="LIVE DRAWING HAPPENING NOW" />
        )
    }
    // one happening later
    else {
        var time = moment(nextRaffle.startTime * 1000)
        var fromNow = time.fromNow()
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
