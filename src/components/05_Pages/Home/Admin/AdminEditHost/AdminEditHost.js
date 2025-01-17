import React from 'react'
import {Text, Image, View, Alert, TouchableOpacity} from 'react-native'
import { colors, fonts, utilities } from '../../../../../settings/all_settings';
import BlockButton from '../../../../01_Atoms/Buttons/BlockButton/BlockButton';
import SwipeButton from '../../../../01_Atoms/Buttons/SwipeButton/SwipeButton'
import { ScrollView } from 'react-native-gesture-handler';
import styles from './AdminEditHost.styling';
import UsernameDisplay from '../../../../01_Atoms/UsernameDisplay/UsernameDisplay'

export default function AdminEditHost({navigation, route}) {
    const data = require('../../../../IP_ADDRESS.json')
    async function approveUser() {
        const response = await fetch('https://8f5d9a32.us-south.apigw.appdomain.cloud/users/edit', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({isHost: true, id: route.params._id})
        })
        let json = await response.json()
        json = json.user
        return json
    }

    // deletes all info user inputted when they requested a business account
    async function rejectUser() {
        const response = await fetch('https://8f5d9a32.us-south.apigw.appdomain.cloud/users/edit', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id: route.params._id, host_item: '', host_charity: '', host_details: '', host_birthday: null, host_raffleType: null})
        })
        let json = await response.json()
        json = json.user
        return json
    }

    return (
        <ScrollView contentContainerStyle={{alignItems: 'center'}}>
            <UsernameDisplay username={route.params.username} profPic={{uri: route.params.profilePicture}} size="large"/>

        <View style={{width: '90%'}}>
            <Text style={styles.host_description}>Describe the item you would like to use in a drawing</Text>
            <Text style={styles.host_text}>{route.params.host_item}</Text>
            <Text style={styles.host_description}>Please provide the charity/foundation name(s) you are raising donations for</Text>
            <Text style={styles.host_text}>{route.params.host_charity}</Text>
            <Text style={styles.host_description}>Please provide any additional details below (business website, social media links)</Text>
            <Text style={styles.host_text}>{route.params.host_details}</Text>
            <Text style={styles.host_description}>Date of Birth</Text>
            <Text style={styles.host_text}>{(new Date(route.params.host_birthday * 1000)).toDateString().substring(4)}</Text>
            <Text style={styles.host_description}>Drivers License Photo</Text>
            {/* MATT PLEASE DO THIS TY */}
            <Image source={{uri: route.params.host_license}} style={styles.host_license}></Image>
            <Text style={styles.host_description}>Phone Number</Text>
            <Text style={styles.host_text}>{route.params.phoneNumber}</Text>
            <Text style={styles.host_description}>Email</Text>
            <Text style={styles.host_text}>{route.params.email}</Text>
        </View>

        <View style={{alignItems: 'center'}}>
            <SwipeButton title="SLIDE TO APPROVE" onSwipeSuccess={async () => {
                await approveUser()
                Alert.alert(
                    "Success!",
                    route.params.username+" is now a verified host",
                    [
                        { text: "OK", onPress: () => console.log("OK Pressed") }
                    ],
                    { cancelable: false }
                );
                navigation.navigate('AdminHomeHosts')
            }}/>
            <TouchableOpacity onPress={async () => {
                Alert.alert(
                    'Are you sure?',
                    'If you delete this request, '+route.params.username+' will have to submit a completely new request if they still want to be a host.',
                    [
                      {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel'
                      },
                      { text: 'OK', onPress: () => {rejectUser(); navigation.navigate('AdminHomeHosts')} }
                    ],
                    { cancelable: true }
                  );
                  
            }

            }>
                <Text style={[styles.host_description, styles.bottom_margin]}>Delete Request (Permanent)</Text>
            </TouchableOpacity>
        </View>
        </ScrollView>
    )
}