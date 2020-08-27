import React, { useContext, useEffect } from 'react'
import { View, Text } from 'react-native'
import { colors, fonts, utilities } from '../../../../../settings/all_settings';
import BottomNav from '../../../../02_Molecules/BottomNav/BottomNav';
import BlockButton from '../../../../01_Atoms/Buttons/BlockButton/BlockButton'
import UsernameDisplay from '../../../../01_Atoms/UsernameDisplay/UsernameDisplay';
import GlobalState from '../../../../globalState'

function EndGame(props) {
    const { user, setUser } = useContext(GlobalState)
    // add bonus chances to user and to raffle
    useEffect(() => {
        async function bonus() {
            const ip = require('../../../../IP_ADDRESS.json')
            let olduser = await fetch('https://8f5d9a32.us-south.apigw.appdomain.cloud/users/id', {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({id : user._id})
            })
            olduser = await olduser.json()
            olduser = olduser.user
            let newEntered = []
            for (var i = 0; i < olduser.rafflesEntered.children.length; i++) {
                if (props.raffleid === olduser.rafflesEntered.children[i].raffleID) {
                    olduser.rafflesEntered.children[i].chances += Math.floor(props.wins / 2)
                } 
                newEntered.push(olduser.rafflesEntered.children[i])
            }
            let updatedUser = await fetch('https://8f5d9a32.us-south.apigw.appdomain.cloud/users/edit', {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ rafflesEntered: {children: newEntered}, id: user._id })
            })
            // raffle update chances
            let oldraffle = await fetch('https://8f5d9a32.us-south.apigw.appdomain.cloud/raffle/id', {
                method: "POST",
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({id : props.raffleid})
            })
            oldraffle = await oldraffle.json()
            oldraffle = oldraffle.raffle
            let newEnteredR = []
            for (var i = 0; i < oldraffle.users.children.length; i++) {
                if (user._id === oldraffle.users.children[i].userID) {
                    oldraffle.users.children[i].chances += Math.floor(props.wins / 2)
                } 
                newEnteredR.push( oldraffle.users.children[i])
            }
            let updatedRaffle = await fetch('https://8f5d9a32.us-south.apigw.appdomain.cloud/raffle/edit', {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ users: {children: newEnteredR}, id : props.raffleid })
            })
        }
        bonus()
    })
    return (
        <View style={utilities.container}>
            <View style={{ alignItems: 'center', height: '90%', paddingVertical: '5%', justifyContent: 'space-between' }}>
                <View style={{ alignItems: 'center' }}>
                    <Text style={fonts.h2}>You</Text>
                    <UsernameDisplay size="game" username={user.username} profPic={{ uri: user.profilePicture }} />
                </View>

                <View style={[utilities.flexCenter, { flex: 0, width: '100%' }]}>
                    <Text style={fonts.h1}>THANKS FOR PLAYING!</Text>
                    <Text style={fonts.p}>You've won {Math.floor(props.wins / 2)} bonus chances!</Text>
                    <Text style={fonts.p}>Buy more chances for another chance to play!</Text>
                    <BlockButton
                        title="EXIT"
                        color="secondary"
                        size="short"
                        onPress={() => props.navigation.navigate('Home')} />
                </View>

                <View style={{ alignItems: 'center' }}>
                    <Text style={fonts.h2}>Challenger</Text>
                    <UsernameDisplay size="game" username={props.opponent.username} profPic={{ uri: props.opponent.profilePicture }} />
                </View>
            </View>
            <BottomNav navigation={props.navigation} active={'Likes'} />
        </View>
    )
}

export default EndGame;