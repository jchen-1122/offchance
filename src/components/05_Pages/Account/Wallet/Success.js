import React, { useEffect, useContext } from 'react'
import { ScrollView, View, Text, Dimensions } from 'react-native'
import { utilities, fonts } from '../../../../settings/all_settings'

import BlockButton from '../../../01_Atoms/Buttons/BlockButton/BlockButton'
import BottomNav from '../../../02_Molecules/BottomNav/BottomNav'
import GlobalState from '../../../globalState'

export default function Success({navigation, route}) {
    console.log(route.params)
    if (route.params === undefined) {
        route.params = {}
    }
    let {user, setUser} = useContext(GlobalState)
    const ip = require('../../../IP_ADDRESS.json')
    useEffect(() => {
        // save customer id into user object
        async function updateCC() {
            let userResponse = await fetch('http://' + ip.ipAddress + '/user/id/' + user._id)
            userResponse = await userResponse.json()
            if (Object.keys(userResponse).includes('paymentInfo') && (Object.keys(route.params).includes('save'))) {
                console.log('PUTTING IN DB')
                // add last 4
                let last4CC = await fetch('http://' + ip.ipAddress + '/user/getLast4', {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ customer: userResponse.paymentInfo })
                })
                last4CC = await last4CC.json()
                let last4 = last4CC.last4
                let brand = last4CC.brand
                let updatedUser = await fetch('http://' + ip.ipAddress + '/user/edit/' + user._id, {
                    method: "PATCH",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ last4: last4, brand: brand })
                })
                //setUser(updatedUser)
            }
        }
        updateCC()
    })

    var userIDs = ["5f1717acfe0108ee8b5e5c0b", "5f171974fe0108ee8b5e5c11", "5f1757f7c9deeef8c14b6a40", "5f1a6bdb457f816624a7a48c"]

    const getOpponent = async () => {
        var opponentID = userIDs[Math.floor(Math.random() * userIDs.length)]
        const response = await fetch('http://' + ip.ipAddress + '/user/id/' + opponentID)
        const json = await response.json()
        return json
    }


    return (
        <View style={utilities.container}>
            <ScrollView contentContainerStyle={utilities.flexCenter}>
            <Text style={[fonts.h1, {textAlign: 'center'}]}>Thank You.</Text>
            <Text style={[fonts.h2, {textAlign: 'center', fontWeight: 'normal'}]}>{(Object.keys(route.params).includes('fromRaffle')) ? "You have been entered in the raffle with " + route.params.fromRaffle + " chances. Play the game for bonus chances." : "Your chances have been loaded into your wallet. Play the game for bonus chances."}</Text>
                <BlockButton
                    title="WIN BONUS CHANCES"
                    color="secondary"
                    onPress={async() => navigation.navigate('GameController',await getOpponent())} />
            </ScrollView>

            <BottomNav navigation={navigation} active={'Account'}></BottomNav>
        </View>
    )
}