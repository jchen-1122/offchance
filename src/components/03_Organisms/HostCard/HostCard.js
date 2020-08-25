import React, { useEffect, useState } from 'react'
import { View, ScrollView, Text, Image, TouchableOpacity } from 'react-native'
import { utilities, fonts, colors } from '../../../settings/all_settings';
import GlobalState from '../../globalState'
import { styles } from './HostCard.styling'
import { getTimer } from '../../../functions/convert_dates'

export default function HostCard(props) {
    var raffle = props.data

    if (raffle) {
        raffle['host'] = props.host
        return (
            <TouchableOpacity onPress={() => props.navigation.navigate('Raffle', raffle)}>
                <View style={styles.HostCard}>
                    <Image style={styles.HostCard__image} source={{ uri: raffle.images[0] }} />
                    <View style={styles.HostCard__info}>
                        <Text style={{ fontWeight: 'bold' }}>{raffle.name}</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.HostCard__info__label}>Time Left:</Text>
                            <Text>{getTimer(raffle.startTime, false)}</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.HostCard__info__label}>Amount Raised:</Text>
                            <Text style={{ fontWeight: 'bold' }}>{'$' + (raffle.amountRaised || '0')}</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.HostCard__info__label}>Likes:</Text>
                            <Text>{raffle.amountLiked}</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.HostCard__info__label}>Entries:</Text>
                            <Text>{raffle.users.children.length}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
    return null

}
