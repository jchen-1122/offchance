import React, { useState, useContext } from 'react'
import { View, Text, ScrollView } from 'react-native'
import { colors, fonts, utilities } from '../../../../settings/all_settings';
import BottomNav from '../../../02_Molecules/BottomNav/BottomNav';
import GlobalState from '../../../globalState';
import Card from '../../../03_Organisms/Card/Card'

function Likes({ navigation }) {
    const [likes, setLikes] = useState([])
    const { user, setUser } = useContext(GlobalState)
    const ip = require('../../../IP_ADDRESS.json');

    React.useEffect(() => {
        async function getRaffles(ids) {
            // get top 5 donors of this raffle
            let temp = []
            for (var i = 0; i < ids.length; i++) {
                const raffle = await getRaffle(ids[i])
                temp.push(raffle)
            }
            setLikes(temp)
        }
        getRaffles(user.likedRaffles)
    }, [])

    async function getRaffle(id) {
        let response = await fetch('https://8f5d9a32.us-south.apigw.appdomain.cloud/raffle/id', {
            method: "POST",
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({id : id})
        })
        response = await response.json()
        response = response.raffle
        return response
    }
    return (
        <View style={utilities.container}>
            <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
                {likes.map((raffle, index) =>
                    <Card
                        data={raffle}
                        key={index}
                        navigation={navigation}
                        currUserG={user}
                        setUserG={setUser}
                        inLikesPage={true}
                    />
                )}
            </ScrollView>
            <BottomNav navigation={navigation} active={'Likes'}></BottomNav>
        </View>
    )
}

export default Likes;