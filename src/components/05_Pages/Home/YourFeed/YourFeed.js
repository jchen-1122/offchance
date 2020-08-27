import React, { useState, useContext } from 'react'
import { View, Text, ScrollView, BackHandler } from 'react-native'
import { utilities } from '../../../../settings/all_settings';
import TopNav from '../../../02_Molecules/TopNav/TopNav'
import BottomNav from '../../../02_Molecules/BottomNav/BottomNav'
import Card from '../../../03_Organisms/Card/Card';
import GlobalState from '../../../globalState'

function YourFeed({ navigation }) {
    const { user, setUser } = useContext(GlobalState)
    const [raffles, setRaffles] = useState([])
    const data = require('../../../IP_ADDRESS.json')

    React.useEffect(() => {
        async function getRaffle() {
            let response = await fetch('https://8f5d9a32.us-south.apigw.appdomain.cloud/raffle/query', {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({query: "archived", val: false})
            })
            response = await response.json()
            response = response.raffles
            // filter out the raffles that are hosted by people you follow
            var followingRaffles = []
            for (var raffle of response){
                if (user.following.includes(raffle.hostedBy)){
                    followingRaffles.push(raffle)
                }
            }
            setRaffles(followingRaffles)
        }
        getRaffle()

        // BACKHANDLING FOR ANDROID BOTTOM NAV
        const backAction = () => {
            Alert.alert("Hold on!", "Are you sure you want to exit the app?", [
                {
                    text: "Cancel",
                    onPress: () => null,
                    style: "cancel"
                },
                { text: "YES", onPress: () => BackHandler.exitApp() }
            ]);
            return true;
        };
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );
        return () => backHandler.remove();

    }, [])

    return (
        <View style={utilities.container}>
            <ScrollView contentContainerStyle={utilities.scrollview}>
                <TopNav navigation={navigation} active='Your Feed' />
                <View style={utilities.flexCenter}>
                    {raffles.map((raffle, index) =>
                        <Card
                            cardType='feed'
                            feedType='following'
                            data={raffle}
                            key={index}
                            navigation={navigation}
                            currUserG={user}
                            setUserG={setUser}
                        />
                    )}
                </View>
            </ScrollView>
            <BottomNav navigation={navigation} active={'Home'}></BottomNav>
        </View>
    )
}

export default YourFeed;