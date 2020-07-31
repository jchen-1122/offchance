import React, { useState } from 'react'
import { View } from 'react-native';
import InputField from '../../02_Molecules/InputField/InputField';
import BlockButton from '../../01_Atoms/Buttons/BlockButton/BlockButton';
import { utilities } from '../../../settings/all_settings';

export default function ReqBusAcc({ navigation, route, hostItem, setHostItem, hostCharity, setHostCharity, hostDetails, setHostDetails }) {
    return (
        <View style={[utilities.flexCenter, { justifyContent: 'flex-start', width: '100%' }]}>
            <InputField
                value={hostItem}
                onChangeText={(text) => { setHostItem(text) }}
                label="Describe the item you would like to use in a drawing"
                textArea
                required />

            <InputField
                value={hostCharity}
                onChangeText={(text) => { setHostCharity(text) }}
                label="Please provide the charity/foundation name(s) you are raising donations for"
                textArea
                required />

            <InputField
                value={hostDetails}
                onChangeText={(text) => { setHostDetails(text) }}
                label="Please provide any additional details below (business website, social media links)"
                textArea />

            {(route && route.params.page) ? <BlockButton color="secondary" title="SUBMIT FOR APPROVAL" onPress={() => navigation.navigate('Account')} /> : null}
        </View>
    );
}
