import React, { useState } from 'react';
import { Text, Image, View, TouchableOpacity } from 'react-native';
import styles from './RaffleCard.styling';
import { utilities, fonts } from '../../../../settings/all_settings'

// for small RaffleCard in horizontal carousel
function RaffleCard(props) {
    var raffle = props.raffle

    return (
        <TouchableOpacity onPress={() => {props.navigation.navigate('Raffle',raffle)}}>
            <View style={styles.RaffleCard}>
                <Image style={styles.RaffleCard__image} source={{ uri: raffle.images[0] }} />
                <Text style={[fonts.h3, { textAlign: 'center' }]}>{raffle.name}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default RaffleCard;