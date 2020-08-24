import React, {useState} from 'react'
import BlockButton from '../../01_Atoms/Buttons/BlockButton/BlockButton'
import {View} from 'react-native'

export default function InfoFeed(props) {
    return (
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <BlockButton
            title="INFO"
            color={(props.info) ? "primary" : "secondary"}
            size="InfoFeed"
            style={{
                borderBottomRightRadius: 0,
                borderTopRightRadius: 0,
            }}
            onPress={() => props.setInfo(true)}/>
            <BlockButton
            title="MY FEED"
            color={(!props.info) ? "primary" : "secondary"}
            size="InfoFeed"
            style={{
                borderBottomLeftRadius: 0,
                borderTopLeftRadius: 0,
            }}
            onPress={() => props.setInfo(false)}/>
        </View>
    )
}