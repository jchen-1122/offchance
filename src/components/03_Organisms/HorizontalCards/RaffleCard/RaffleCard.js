import React, { useState, useEffect, useContext} from 'react';
import { Text, Image, View, TouchableOpacity } from 'react-native';
import styles from './RaffleCard.styling';
import Countdown from '../../../01_Atoms/Countdown/Countdown'
import { utilities, fonts, colors } from '../../../../settings/all_settings'
import GlobalState from '../../../globalState';

// for small RaffleCard in horizontal carousel
function RaffleCard(props) {
    var raffle = props.raffle
    const ip = require('../../../IP_ADDRESS.json')
    const [host, setHost] = useState(null)
    const {user, setUser} = useContext(GlobalState)

    // helper method - move elem at old index to new index
    function array_move(arr, old_index, new_index) {
        if (new_index >= arr.length) {
            var k = new_index - arr.length + 1;
            while (k--) {
                arr.push(undefined);
            }
        }
        arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
        return arr; // for testing
    };

    // set raffle as recent viewed raffle
    const setRecent = async () => {
        const ip = require('../../../IP_ADDRESS.json')
        const response = await fetch('https://8f5d9a32.us-south.apigw.appdomain.cloud/users/edit', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: makeAddJSON()
        })
        let json = await response.json()
        json = json.user
        return json
    }

    const makeAddJSON = () => {
        let viewedRaffles = user.recentRaffles || []
        // console.log('recent raffle ids: ', viewedRaffles);
        if (!viewedRaffles.includes(raffle)) {
            viewedRaffles.push(raffle)
        } else {
            // console.log('before moving', viewedRaffles);
            viewedRaffles = array_move(viewedRaffles, viewedRaffles.indexOf(raffle), 0)
            // console.log('after moving', viewedRaffles);
        }
        let data = {
            recentRaffles: viewedRaffles
        }
        data["id"] = user._id
        return JSON.stringify(data)
    }


    useEffect(() => {
        async function getHost() {
            let response = await fetch('https://8f5d9a32.us-south.apigw.appdomain.cloud/users/id', {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({id : props.raffle.hostedBy})
            })
            response = await response.json()
            response = response.user
            setHost(response)
        }
        if (raffle) {
            getHost()
        }
    }, [raffle])

    if (raffle) {
        raffle['host'] = host
        return (
            <TouchableOpacity 
            onPress={async () => 
            {   await setRecent();
                props.navigation.navigate('Raffle', raffle) }}>
                <View style={styles.RaffleCard}>
                    <Image style={styles.RaffleCard__image} source={{ uri: raffle.images[0] }} />
                    <Text style={[fonts.h3, { textAlign: 'center' }]}>
                        {(raffle.name).length < 45 ? raffle.name : raffle.name.substring(0, 42) + '...'}
                    </Text>
                    {raffle.live ?
                        <Countdown unix_timestamp={raffle.startTime} propsStyle={styles.RaffleCard__startTime} />
                        :
                        <Text style={{color: 'gray', fontSize: 12, fontWeight: 'bold'}}>Coming Soon</Text>
                    }
                </View>
            </TouchableOpacity>
        )
    }
    return null
}

export default RaffleCard;