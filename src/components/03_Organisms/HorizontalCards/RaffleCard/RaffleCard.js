import React, { useState, useEffect } from 'react';
import { Text, Image, View, TouchableOpacity } from 'react-native';
import styles from './RaffleCard.styling';
import Countdown from '../../../01_Atoms/Countdown/Countdown'
import { utilities, fonts, colors } from '../../../../settings/all_settings'

// for small RaffleCard in horizontal carousel
function RaffleCard(props) {
    var raffle = props.raffle
    const ip = require('../../../IP_ADDRESS.json')
    const [host, setHost] = useState(null)
    
    useEffect(() => {
        async function getHost() {
            let response = await fetch('http://' + ip.ipAddress + '/user/id/' + props.raffle.hostedBy)
            response = await response.json()
            setHost(response)
        }
        if (raffle) {
            getHost()
        }
    }, [raffle])

    if (raffle){
        raffle['host'] = host
        return (
            <TouchableOpacity onPress={() => {props.navigation.navigate('Raffle',raffle)}}>
                <View style={styles.RaffleCard}>
                    <Image style={styles.RaffleCard__image} source={{ uri: raffle.images[0] }} />
                    <Text style={[fonts.h3, {textAlign: 'center'}]}>
                        {(raffle.name).length < 50 ? raffle.name : raffle.name.substring(0,47) + '...'}
                        </Text>
                    <Countdown unix_timestamp={raffle.startTime} propsStyle={styles.RaffleCard__startTime}/>
                </View>
            </TouchableOpacity>
        )
    }
    return null
}

export default RaffleCard;