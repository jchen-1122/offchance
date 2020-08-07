import React, { useEffect, useContext } from 'react'
import { View, ScrollView, Text, Image, TouchableOpacity } from 'react-native'
import { utilities, fonts, colors } from '../../../settings/all_settings';
import GlobalState from '../../globalState'
import { styles } from './HostCard.styling'
import { getTimer } from '../../../functions/convert_dates'

export default function HostCard({ data }) {

    return (
        <TouchableOpacity>
            <View style={styles.HostCard}>
                <Image style={styles.HostCard__image} source={{ uri: data.images[0] }} />
                <View style={styles.Info}>
                    <Text style={{ fontWeight: 'bold' }}>{data.name}</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.Info__label}>Time Left:</Text>
    <Text>{getTimer(data.startTime, false)}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.Info__label}>Amount Raised:</Text>
                        <Text style={{ fontWeight: 'bold' }}>{'$' + (data.amountRaised || '0')}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.Info__label}>Likes:</Text>
                        <Text>{data.amountLiked}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.Info__label}>Entries:</Text>
                        <Text>{data.users.children.length}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>

    )
}
