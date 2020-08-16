import React from 'react'
import {Text, Image, View} from 'react-native'
import { colors, fonts, utilities } from '../../../../../settings/all_settings';
import BlockButton from '../../../../01_Atoms/Buttons/BlockButton/BlockButton'
import styles from './AdminEditHost.styling'

export default function AdminEditHost({navigation, route}) {
    const data = require('../../../../IP_ADDRESS.json')
    async function approveUser() {
        const response = await fetch('http://' + data.ipAddress + '/user/edit/' + route.params._id, {
            method: "PATCH",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({isHost: true})
        })
        const json = await response.json()
        return json
    }

    return (
        <View>
        <View style={{alignItems: 'center', marginTop: 25, marginLeft: 25}}>
        <Text style={{fontSize: 20, fontWeight: '500'}}>{route.params.name}</Text>
        <Image source={{ uri: route.params.profilePicture }} style={{width: 100, height: 100, borderRadius: 50, margin: 5}}></Image>
        <Text style={{marginTop: 5, fontSize: 18}}>@{route.params.username}</Text>
        </View>
        <View style={{margin: 25}}>
            <Text style={styles.host_description}>Describe the item you would like to use in a drawing</Text>
            <Text style={styles.host_text}>{route.params.host_item}</Text>
            <Text style={styles.host_description}>Please provide the charity/foundation name(s) you are raising donations for</Text>
            <Text style={styles.host_text}>{route.params.host_charity}</Text>
            <Text style={styles.host_description}>Please provide any additional details below (business website, social media links)</Text>
            <Text style={styles.host_text}>{route.params.host_details}</Text>
            <Text style={styles.host_description}>Date of Birth</Text>
            <Text style={styles.host_text}>{(new Date(route.params.host_birthday * 1000)).toDateString().substring(4)}</Text>
        </View>

        <View style={{flexDirection: 'row', marginLeft: 25}}>
            <BlockButton
            title="APPROVE USER" color="primary" size="short"
            onPress={async () => {
                await approveUser()
                navigation.navigate('AdminHomeHosts')
            }}
            />
            <BlockButton
            title="REJECT USER" color="confirm" size="short"
            onPress={() => navigation.navigate('AdminHomeHosts')}
            />
        </View>
        </View>
    )
}