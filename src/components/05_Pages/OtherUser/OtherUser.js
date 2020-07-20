import React from 'react'
import { View, ScrollView, Text, Image } from 'react-native'
import {colors, fonts, utilities} from '../../../settings/all_settings'
import StatsBar from '../../02_Molecules/StatsBar/StatsBar'
import BlockButton from '../../01_Atoms/Buttons/BlockButton/BlockButton'
import {styles} from './OtherUser.styling'

export default function OtherUser({navigation, route})  {
    return (
        <View style={utilities.container}>
            <ScrollView>
                <Image source={{uri:route.params.user.profilePic}} style={styles.profilePic}></Image>
                <Text style={styles.header_name}>{route.params.user.name}</Text>
                <Text style={styles.header_username}>@{route.params.user.username}</Text>

                <StatsBar currUser={route.params.user} followers={route.params.user.followers} following={route.params.user.following} enteredRaffles={route.params.user.enteredRaffles} navigation={navigation}></StatsBar>
                
                <View style={styles.followButton}>
                    <BlockButton
                    title="FOLLOW"
                    color="secondary"
                    ></BlockButton>
                </View>
            </ScrollView>
        </View>
    )
}