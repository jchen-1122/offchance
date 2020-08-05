import React, { useState, useEffect } from 'react';
import { Text, Image, View, TouchableOpacity } from 'react-native';
import styles from './LatestWinnerCard.styling';
import { utilities, fonts } from '../../../../settings/all_settings'
import UsernameDisplay from '../../../01_Atoms/UsernameDisplay/UsernameDisplay'

// for small, clickable cards like in Latest Winners
function LatestWinnerCard(props) {
    const ip = require('../../../IP_ADDRESS.json')

    var winner = props.winner
    var raffle = props.raffle
    const [host, setHost] = useState(null)
    
    useEffect(() => {
        async function getHost() {
            let response = await fetch('http://' + ip.ipAddress + '/user/id/' + props.raffle.hostedBy)
            response = await response.json()
            setHost(response)
        }
        if (raffle) {
            console.log('here')
            getHost()
        }
    }, [raffle])

    if (raffle){
        raffle['host'] = host
        raffle['winner'] = winner
        return (
            <View style={utilities.exploreCard}>
                <TouchableOpacity style={styles.touchable} onPress={() => {
                    props.navigation.navigate('Raffle', raffle)
                }}>
                    <Image style={styles.raffleImage} source={{ uri: raffle.images[0] }} />
                    <Text style={[styles.raffleName]}>{raffle.name}</Text>
                </TouchableOpacity>
                
                <TouchableOpacity onPress={() => {
                    props.navigation.navigate('OtherUser', { user: winner })
                }}>
                    <UsernameDisplay
                        size='latestWinner'
                        profPic={{ uri: winner.profilePicture }}
                        username={winner.username}
                        color="#A1A1A1" />
                </TouchableOpacity>
            </View>
        )
    }
    return null
}

export default LatestWinnerCard;