import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, Image, Dimensions, TouchableOpacity } from 'react-native';
import { Overlay } from 'react-native-elements';
import styles from './RaffleResult.styling';
import { colors } from '../../../../settings/all_settings';
import TextLink from '../../../01_Atoms/Buttons/TextLinks/TextLinks';
import WinnerCard from '../../../03_Organisms/WinnerCard/WinnerCard';
import { LinearGradient } from 'expo-linear-gradient';
import { get_user, get_raffle } from '../../../fake_users/live-drawing-test';

export default function RaffleResult({ navigation, route }) {
    const [selected, setSelected] = useState(null)
    const [overlay, setoverlay] = useState(false)
    const [prize, setPrize] = useState(null)
    const [enteredUsers, setEnteredUsers] = useState([])
    const [winners, setWinners] = useState({})
    const [raffle, setRaffle] = useState({})
    const ip = require('../../../IP_ADDRESS.json');

    // test user and raffle for Chelly's card
    let dummy_user = get_user("Chelly")
    let dummy_raffle = get_raffle()

    React.useEffect(() => {
        async function getRaffle(id) {
            let response = await fetch('http://' + ip.ipAddress + ':3000/raffle/id/' + id)
            response = await response.json()
            setRaffle(response)
            setEnteredUsers(response.users.children)
        }
        getRaffle(route.params.raffle._id)
    }, [])

    // will change based on the number of rewards
    // rewards[0] = grand prize (1)
    // rewards[1] = 50 chances (2)
    // rewards[2] = 20 chanes (3)
    // rewards[3] = 10 chances (4)
    let rewards = [1, 2, 3, 4]
    let numRewards = 10
    let currPrize = 0

    // const winners = route.params.raffle.users.children.sort((a,b)=>b.amountDonated - a.amountDonated).slice(0,numWinners)

    // randomly and proportionally assign rewards to users
    React.useEffect(() => {

        let temp = {}

        while (numRewards !== 0) {
            // 1. assign everyone a range of numbers based on the number of chances
            let ranges = {}
            let count = 1
            let numChances = 0
            for (var i = 0; i < enteredUsers.length; i++) {
                ranges[enteredUsers[i].userID] = [count, count + enteredUsers[i].chances - 1]
                count += enteredUsers[i].chances
                numChances += enteredUsers[i].chances
            }

            // 2. Generate a random number from 0 to numChances
            const rand = Math.floor((Math.random() * numChances) + 1)

            // 3. determine who's range qualifies (both ends inclusive)
            let winner = -1
            for (var i = 0; i < enteredUsers.length; i++) {
                if (ranges[enteredUsers[i].userID][0] <= rand && ranges[enteredUsers[i].userID][1] >= rand) {
                    winner = enteredUsers[i].userID
                    temp[enteredUsers[i].userID] = currPrize
                    break
                }
            }

            // 4. update variables for next loop
            numRewards--;
            rewards[currPrize] -= 1
            if (rewards[currPrize] == 0) {
                currPrize += 1
            }

            // 5. delete current winner from array
            for (var i = enteredUsers.length - 1; i >= 0; i--) {
                if (enteredUsers[i].userID === winner) {
                    // console.log('deleted')
                    enteredUsers.splice(i, 1);
                    break
                }
            }
        }
        setWinners(temp)

        // @Matt the winners object is {key: userId, value: reward}, reward rn is just a number (see top of file)
        console.log(winners)
    }, [enteredUsers])

    //const customData = require('../../../fake_users/stub-users.json');
    //let plswork = customData.users[2].name

    let CardArray = []
    let count = 0

    for (let key in winners) {
        //console.log('1')
        // check if the property/key is defined in the object itself, not in parent
        if (winners.hasOwnProperty(key)) {
            var gradient;
            count++
            switch (winners[key]) {
                case 0:
                    gradient = colors.goldGradientBg
                    break;
                case 1:
                    gradient = colors.silverGradientBg
                    break;
                case 2:
                    gradient = colors.bronzeGradientBg
                    break;
                default:
                    gradient = [colors.blue, colors.blue]
                    break;
            }
            CardArray.push(
                <LinearGradient start={[0, 0]} end={[1, 0]} colors={gradient} style={{margin: Dimensions.get('window').width * 0.005}}>
                    <TouchableOpacity style={[styles.card]}
                        onPress={() => {
                            setoverlay(true)
                            setSelected(count)
                            setPrize(winners[key])
                            console.log(winners[key])
                        }}>

                        <View style={styles.circle_outline} >
                            <Image
                                style={styles.circle_pic}
                                source={{ uri: 'https://oc-mobile-images.s3.us-east.cloud-object-storage.appdomain.cloud/oc-logo.png' }}
                            />
                        </View>

                        {/* This is what will be displayed on the back of the cards */}
                    </TouchableOpacity>
                </LinearGradient>
            )
        }
    }

    return (
        <ScrollView>
            <View style={styles.container, {flexDirection: 'row', justifyContent: 'center'}}>
                {CardArray}
                <Overlay isVisible={overlay} onBackdropPress={() => setoverlay(false)} overlayStyle={{ backgroundColor: 'transparent' }}>
                    <WinnerCard prize={prize} winner={dummy_user} raffle={raffle} host={dummy_user} selected={selected} navigation={navigation} />
                </Overlay>
            </View>
        </ScrollView>
    )
}