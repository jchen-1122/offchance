import React, { useEffect, useContext } from 'react'
import { ScrollView, View, Text, Dimensions } from 'react-native'
import { utilities, fonts } from '../../../../settings/all_settings'
import BlockButton from '../../../01_Atoms/Buttons/BlockButton/BlockButton'
import BottomNav from '../../../02_Molecules/BottomNav/BottomNav'
import GlobalState from '../../../globalState'

export default function Success({navigation, route}) {
    // console.log(route.params)
    if (route.params === undefined) {
        route.params = {}
    }
    let {user, setUser} = useContext(GlobalState)
    const ip = require('../../../IP_ADDRESS.json')
    useEffect(() => {
        // save customer id into user object
        async function updateCC() {
            let userResponse = await fetch('https://8f5d9a32.us-south.apigw.appdomain.cloud/users/id', {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({id : user._id})
            })
            userResponse = await userResponse.json()
            userResponse = userResponse.user || {}
            if (Object.keys(userResponse).includes('paymentInfo') && (Object.keys(route.params).includes('save'))) {
                // console.log('PUTTING IN DB')
                // add last 4
                let last4CC = await fetch('https://8f5d9a32.us-south.apigw.appdomain.cloud/users/last4', {
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
                let updatedUser = await fetch('https://8f5d9a32.us-south.apigw.appdomain.cloud/users/edit', {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ last4: last4, brand: brand, id: user._id })
                })
                //setUser(updatedUser)
            }
        }
        updateCC()
    })

    var opponents = require('../../Home/RPS/opponent_ids.json')
    var userIDs = opponents.userIDs

    const getOpponent = async () => {
        var opponentID = userIDs[Math.floor(Math.random() * userIDs.length)]
        let response = await fetch('https://8f5d9a32.us-south.apigw.appdomain.cloud/users/id', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id : opponentID})
        })
        let json = await response.json()
        json = json.user
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
                    onPress={async() => navigation.navigate('GameController', {opponent: await getOpponent(), raffleid: route.params.raffleid})} />
            </ScrollView>

            <BottomNav navigation={navigation} active={'Account'}></BottomNav>
        </View>
    )
}