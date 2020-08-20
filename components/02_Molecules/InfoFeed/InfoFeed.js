import React, {useState} from 'react'
import BlockButton from '../../01_Atoms/Buttons/BlockButton/BlockButton'
import {View} from 'react-native'

export default function InfoFeed(props) {
    return (
        <View style={{flexDirection: 'row'}}>
            <BlockButton
            title="INFO"
            color={(props.info) ? "primary" : "secondary"}
            size="smallLongLeft"
            onPress={() => props.setInfo(true)}></BlockButton>
            <BlockButton
            title="MY FEED"
            color={(!props.info) ? "primary" : "secondary"}
            size="smallLongRight"
            onPress={() => props.setInfo(false)}></BlockButton>
        </View>
    )
}