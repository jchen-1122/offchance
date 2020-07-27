import React, {useState, useEffect} from 'react';
import { ScrollView, View, Text, Image, Dimensions, TouchableOpacity } from 'react-native'
import { Overlay } from 'react-native-elements';
import {utilities, fonts, colors} from '../../../../settings/all_settings';
import styles from './RaffleResult.styling';
import TextLink from '../../../01_Atoms/Buttons/TextLinks/TextLinks'
import BottomNav from '../../../02_Molecules/BottomNav/BottomNav'
import ProgressBar from '../../../02_Molecules/ProgressBar/ProgressBar'
import HostedBy from '../../../02_Molecules/HostedBy/HostedBy'
import Top5Donors from '../../../02_Molecules/Top5Donors/Top5Donors'
import DropDown from '../../../01_Atoms/DropDown/DropDown'
import ImageCarousel from '../../../02_Molecules/ImageCarousel/ImageCarousel'
import BlockButton from '../../../01_Atoms/Buttons/BlockButton/BlockButton';
import { get_user } from '../../../fake_users/stub-users.js';


export default function RaffleResult({navigation, route}) {
    const [selected, setSelected] = useState(null)
    const [overlay, setoverlay] = useState(false)
    const [prize, setPrize] = useState(null)
    const enteredUsers = route.params.raffle.users.children

    const winners = {}
    
    // will change based on the number of rewards
    // rewards[0] = grand prize (1)
    // rewards[1] = 50 chances (2)
    // rewards[2] = 20 chanes (3)
    // rewards[3] = 10 chances (4)
    let rewards = [1,2,3,4]
    let numRewards = 10
    let currPrize = 0

    // const winners = route.params.raffle.users.children.sort((a,b)=>b.amountDonated - a.amountDonated).slice(0,numWinners)

    // randomly and proportionally assign rewards to users

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
                winners[enteredUsers[i].userID] = currPrize
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
        for(var i = enteredUsers.length - 1; i >= 0; i--) {
            if(enteredUsers[i].userID === winner) {
                // console.log('deleted')
                enteredUsers.splice(i, 1);
                break
            }
        }
    }

    // @Matt the winners object is {key: userId, value: reward}, reward rn is just a number (see top of file)
    console.log(winners)

    //const customData = require('../../../fake_users/stub-users.json');
    //let plswork = customData.users[2].name

    let CardArray = Array(100).fill().map((_, i) => <TouchableOpacity style={styles.card} 
        onPress={() => {
            setoverlay(true)
            setSelected(get_user(i+1).name)
            setPrize(get_user(i+1).prize)
        }}>
            <Text>{i + 1}</Text>
            {/* This is what will be displayed on the back of the cards */}
        </TouchableOpacity>);


    return (
        <ScrollView>
            <View style={styles.container}>
                {CardArray}
                <Overlay isVisible={overlay} onBackdropPress={() => setoverlay(false)}>
                    <View style={styles.overlay}>
                        {/* This is what is displayed within the overlay */}
                        <TextLink
                        title={selected}
                        onPress={() => {
                            if (route.params.setViewing != null) {
                                route.params.setViewing(true)
                            } 
                            navigation.navigate('Profile', {name:selected})}}></TextLink>
                        <Text>has won</Text>
                        <Text>{prize}</Text>
                    </View>
                </Overlay>
            </View>
        </ScrollView>
    )
}