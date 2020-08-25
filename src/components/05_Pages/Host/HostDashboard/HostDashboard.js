import React, { useEffect, useContext, useState } from 'react'
import { View, ScrollView, Text, Image } from 'react-native'
import { utilities, fonts, colors } from '../../../../settings/all_settings';
import GlobalState from '../../../globalState'
import BottomNav from '../../../02_Molecules/BottomNav/BottomNav'
import BlockButton from '../../../01_Atoms/Buttons/BlockButton/BlockButton'
import HostCard from '../../../03_Organisms/HostCard/HostCard'
import { styles } from './HostDashboard.styling'

export default function HostDashboard({ navigation }) {
    const { user, setUser } = useContext(GlobalState)
    const [raffles, setRaffles] = useState([])
    const [_postedRaffles, setPostedRaffles] = useState([])
    const [_pendingRaffles, setPendingRaffles] = useState([])
    const [totalRaised, setTotalRaised] = useState(0)
    var ip = require('../../../IP_ADDRESS.json')

    useEffect(() => {
        async function getRaffles() {
            var hostedRaffles = []
            var total = 0
            if (user.isHost) {
                if (user.rafflesPosted.length > 0) {
                    for (var raffleID of user.rafflesPosted) {
                        let response = await fetch('http://' + ip.ipAddress + '/raffle/id/' + raffleID)
                        response = await response.json()
                        hostedRaffles.push(response)
                        total += (response.amountRaised || 0)
                    }
                }
            }
            setTotalRaised(total)
            setPostedRaffles(hostedRaffles.filter((raffle) => { return raffle.approved == true }))
            setPendingRaffles(hostedRaffles.filter((raffle) => { return raffle.approved == false }))
            setRaffles(hostedRaffles)
        }
        getRaffles()
    }, []);

    // if they're not a host, lead them to the ReqBusAcc form
    if (!user.isHost) {
        return (
            <View style={utilities.container}>
                <View style={utilities.flexCenter}>
                    <Text style={[fonts.h1, { textAlign: 'center' }]}>Get verified to host drawings on Off Chance</Text>
                    <BlockButton color="primary" title="GET VERIFIED" onPress={() => navigation.navigate('ReqBusAcc', { page: true })} />
                </View>
                <BottomNav navigation={navigation} active={'Host'} />
            </View>
        )
    }

    // drawings that have been approved and posted
    let postedDrawings;
    if (_postedRaffles.length > 0) {
        postedDrawings = (
            <View>
                <Text style={[fonts.h1, { marginTop: '5%', marginLeft: '2%' }]}>Your Posted Drawings</Text>
                {_postedRaffles.map((raffle, index) =>
                    <HostCard
                        data={raffle}
                        host={user}
                        navigation={navigation}
                    />
                )}
            </View>
        )
    }

    // drawings pending approval
    let pendingDrawings;
    if (_pendingRaffles.length > 0){
        pendingDrawings = (
            <View>
            <Text style={[fonts.h1, { marginTop: '5%', marginLeft: '2%' }]}>Your Pending Drawings</Text>
            {_pendingRaffles.map((raffle, index) =>
                <HostCard
                    data={raffle}
                    host={user}
                    navigation={navigation}
                />
            )}
        </View>
        )
    }

    return (
        <View style={utilities.container}>
            <ScrollView>
                <View style={{ backgroundColor: 'white', width: '100%', padding: '5%' }}>
                    <Text style={fonts.h1}>Host Your Own Drawings to Raise Money For Your Cause.</Text>
                    <BlockButton color="primary" title="NEW DRAWING" size="short" onPress={() => navigation.navigate('AskRaffleType')} style={{ marginLeft: 0 }} />
                </View>

                <View style={styles.stats}>
                    <View style={styles.statsItem}>
                        <Text style={styles.statsItem__value}>${totalRaised}</Text>
                        <Text style={styles.statsItem__label}>TOTAL RAISED</Text>
                    </View>
                    <View style={styles.statsItem}>
                        <Text style={styles.statsItem__value}>{_postedRaffles.length || 0}</Text>
                        <Text style={styles.statsItem__label}>HOSTED DRAWINGS</Text>
                    </View>
                    <View style={styles.statsItem}>
                        <Text style={styles.statsItem__value}>{user.followers.length || 0}</Text>
                        <Text style={styles.statsItem__label}>FOLLOWERS</Text>
                    </View>
                </View>
                {pendingDrawings}
                {postedDrawings}

            </ScrollView>
            <BottomNav navigation={navigation} active={'Host'}></BottomNav>
        </View>
    )
}
