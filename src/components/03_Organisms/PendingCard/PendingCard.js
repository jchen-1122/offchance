import React, { useEffect, useState } from 'react'
import { View, ScrollView, Text, Image, TouchableOpacity } from 'react-native'
import { utilities, fonts, colors } from '../../../settings/all_settings';
import GlobalState from '../../globalState'
import { styles } from './PendingCard.styling'
import { getTimer } from '../../../functions/convert_dates'

export default function PendingCard(props) {
    var raffle = props.data
    var refresh = props.refresh
    var setRefresh = props.setRefresh
    const ip = require('../../IP_ADDRESS.json')
    const [host, setHost] = useState(null)
    const [charityString, setCharity] = useState("")

    useEffect(() => {
        let charityS = ""
        for (var i = 0; i < raffle.charities.length; i++) {
            // dont want comma at the end
            if (i === raffle.charities.length - 1) {
                charityS += raffle.charities[i]
            } else {
                charityS += raffle.charities[i] + ", "
            }
        }
        setCharity(charityS.substring())
        async function getHost() {
            let response = await fetch('http://' + ip.ipAddress + '/user/id/' + raffle.hostedBy)
            response = await response.json()
            setHost(response)
        }
        if (raffle) {
            getHost()
        }
    }, [raffle])

    if (raffle) {
        raffle['host'] = host
        return (
            <TouchableOpacity onPress={() => props.navigation.navigate('AdminEdit', raffle)}>
                <View style={styles.HostCard}>
                    <Image style={styles.HostCard__image} source={{ uri: raffle.images[0] }} />
                    <View style={styles.Info}>
                        <Text style={{ fontWeight: 'bold' }}>{raffle.name}</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.Info__label}>Prize Value: </Text>
                            <Text>${raffle.productPrice || '0'}</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.Info__label}>Charity Partners: </Text>
                            <Text>{charityString}</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.Info__label}>Type: </Text>
                            <Text>{(raffle.type === 1) ? 'Donate to Enter' : 'Enter to Buy'}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
    return null

}