import React, { useState } from 'react';
import {Text, Image, View, TouchableOpacity} from 'react-native';
import styles from './FlatCard.styling';
import {fonts, utilities} from '../../../settings/all_settings'
import UsernameDisplay from '../../01_Atoms/UsernameDisplay/UsernameDisplay'

// for small, unclickable cards like in Latest Winners
function FlatCard({ navigation, data, }){

    // const ip = require('../../IP_ADDRESS.json');
    const [host, setHost] = useState(null);

    React.useEffect(() => {
        async function getHost() {
            let response = await fetch('http://' + ip.ipAddress + '/user/id/' + data.hostedBy)
            response = await response.json()
            setHost(response)
        }
        getHost()
    }, [])

    // width for card content
    // let contentWidth = Dimensions.get('window').width * 0.65;

    // maps numerical types to actual types of cards
    let typeMap = new Map()
    typeMap.set(1, 'default') // donate to enter
    typeMap.set(2, 'buy') // enter to buy


    // get fields from data passed in from fetch
    let title;
    let imageURI;
    let date;
    let enteredUsers;
    let raffleid;
    let type;
    let today;
    if (data){
        title = data.name
        imageURI = data.images[0]
        date = data.startTime
        enteredUsers = data.users.children
        type = typeMap.get(data.type)
        data['host'] = host
        raffleid = data._id
    }

    let username;
    if (host) {
        username = <UsernameDisplay username={host.username} profPic={{ uri: host.profilePicture }} size='hostedBy' />
    }

    return (
        <TouchableOpacity onPress={() => navigation.navigate('Raffle', data)}>
            <View style={[styles.FlatCard, ]}>
                <Image style={styles.FlatCard__image} source={{ uri: imageURI }} />
                <Text style={styles.FlatCard__title}>{title}</Text>
                <Text style={styles.FlatCard__title}>{host}</Text>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('OtherUser', { user: host })
                    }}>
                    {username}
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    )
}

export default FlatCard;
