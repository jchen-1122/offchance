import React, { useState, useEffect, useContext } from 'react';
import { ScrollView, View, Text, Image, Dimensions, TouchableOpacity } from 'react-native';
import { Overlay } from 'react-native-elements';
import styles from './RaffleResult.styling';
import { colors } from '../../../../settings/all_settings';
import TextLink from '../../../01_Atoms/Buttons/TextLinks/TextLinks';
import WinnerCard from '../../../03_Organisms/WinnerCard/WinnerCard';
import { LinearGradient } from 'expo-linear-gradient';
import { get_user, get_raffle } from '../../../fake_users/live-drawing-test';
import Social from '../../Social/Social'
import GlobalState from '../../../globalState';
import Card from '../../../03_Organisms/Card/Card';

export default function RaffleResult({ navigation, route }) {
    const [selected, setSelected] = useState(0)
    const [overlay, setoverlay] = useState(false)
    const [prize, setPrize] = useState(null)
    const [enteredUsers, setEnteredUsers] = useState([])
    const [winners, setWinners] = useState([])
    const [winnerObjs, setWinnerObjs] = useState([])
    const [raffle, setRaffle] = useState({})
    const [host, setHost] = useState({})
    const [currWinner, setCurrWinner] = useState({})
    const [display, setDisplay] = useState([])    
    const ip = require('../../../IP_ADDRESS.json');
    const {user, setUser} = useContext(GlobalState)

    // test user and raffle for Chelly's card
    let dummy_user = get_user("Chelly")


    React.useEffect(() => {
        async function getRaffle(id) {
            let response = await fetch('http://' + ip.ipAddress + '/raffle/id/' + id)
            response = await response.json()
            setRaffle(response)
            setEnteredUsers(response.users.children)
            setWinnerObjs(response.winners.children)

            let hostResp = await fetch('http://' + ip.ipAddress + '/user/id/' + response.hostedBy)
            hostResp = await hostResp.json()
            setHost(hostResp)
        }
        getRaffle(route.params.raffle._id)
    }, [])

    React.useEffect(() => {   
        async function winnerData() {
            const winnerRes = await fetch('http://'+ip.ipAddress+'/user/ids/' ,{
                method: "PATCH",
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },  
                body: winnerJSON()
            })
            var matt = await winnerRes.json()
            matt.forEach(element => {
                const found = winnerObjs.find(e => e.userID == element._id);
                element["prize"] = found.reward
            });
            setWinners(matt)
        }
        const winnerJSON = () => {
            let idarray = []
            winnerObjs.forEach(element => {
                idarray.push(element.userID)
            });
            let data = {
                ids: idarray
            }
            return JSON.stringify(data)
        }
        winnerData()
    }, [winnerObjs])

    React.useEffect(() => {
        let CardArray = []
        let count = 0
        winners.forEach(element => {
            if (element.hasOwnProperty("prize")) {
                var gradient;
                count++
                switch (element["prize"]) {
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
                                setPrize(element["prize"])
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
        });
        setDisplay(CardArray)
    }, [winners])



    // will change based on the number of rewards
    // rewards[0] = grand prize (1)
    // rewards[1] = 50 chances (2)
    // rewards[2] = 20 chanes (3)
    // rewards[3] = 10 chances (4)
    //let rewards = [1, 2, 3, 4]
    //let numRewards = 10
    //let currPrize = 0


    // // const winners = route.params.raffle.users.children.sort((a,b)=>b.amountDonated - a.amountDonated).slice(0,numWinners)

    // randomly and proportionally assign rewards to users
    /*React.useEffect(() => {

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
                    enteredUsers.splice(i, 1);
                    break
                }
            }
        }

        async function getWinnerObjs(ids) {
            // get top 5 donors of this raffle
            let temp = []
            for (var i = 0; i < ids.length; i++) {
                console.log('i',i)
                const user = await fetch('http://' + ip.ipAddress + '/user/id/' + ids[i])
                user = await user.json()
                console.log('user',user)
                temp.push(user)
            }
            // console.log('temp', temp)
            setWinnerObjs(temp)
        }
        getWinnerObjs(Object.keys(temp))
        setWinners(temp)

        async function matttest() {
            const winnerRes = await fetch('http://'+ip.ipAddress+'/user/ids/' ,{
                method: "PATCH",
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },  
                body: winnerJSON()
            })
            const matt = await winnerRes.json()
            //console.log(matt)
        }
        const winnerJSON = () => {
            let data = {
                ids: Object.keys(temp)
            }
            return JSON.stringify(data)
        }

        matttest()

        // @Matt the winners object is {key: userId, value: reward}, reward rn is just a number (see top of file)
        
    }, [enteredUsers])
    //console.log('winners',winners)
    //console.log('winnerObjs', winnerObjs)
    //const customData = require('../../../fake_users/stub-users.json');
    //let plswork = customData.users[2].name



    for (let key in winners) {
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
                        }}>

                        <View style={styles.circle_outline} >
                            <Image
                                style={styles.circle_pic}
                                source={{ uri: 'https://oc-mobile-images.s3.us-east.cloud-object-storage.appdomain.cloud/oc-logo.png' }}
                            />
                        </View>

                    </TouchableOpacity>
                </LinearGradient>
            )
        }
    }*/

    return (
        <View>
        <ScrollView>
            <View style={styles.container}>
                {display}
                <Overlay isVisible={overlay} onBackdropPress={() => setoverlay(false)} overlayStyle={{ backgroundColor: 'transparent' }}>
                    <WinnerCard prize={prize} winner={dummy_user} dummy_winner={dummy_user} raffle={raffle} host={host} selected={selected} navigation={navigation} />
                </Overlay>
            </View>
            <View style={styles.container}>
                {display}
                <Overlay isVisible={overlay} onBackdropPress={() => setoverlay(false)} overlayStyle={{ backgroundColor: 'transparent' }}>
                    <WinnerCard prize={prize} winner={dummy_user} dummy_winner={dummy_user} raffle={raffle} host={host} selected={selected} navigation={navigation} />
                </Overlay>
            </View>
            <View style={styles.container}>
                {display}
                <Overlay isVisible={overlay} onBackdropPress={() => setoverlay(false)} overlayStyle={{ backgroundColor: 'transparent' }}>
                    <WinnerCard prize={prize} winner={dummy_user} dummy_winner={dummy_user} raffle={raffle} host={host} selected={selected} navigation={navigation} />
                </Overlay>
            </View>
        </ScrollView>
        <Social currUser={user}></Social>
        </View>
    )
}