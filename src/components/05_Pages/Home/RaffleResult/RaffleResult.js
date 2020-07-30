import React, { useState, useRef, useContext } from 'react';
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
import ConfettiCannon from 'react-native-confetti-cannon';

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
    const { user, setUser } = useContext(GlobalState)
    // test user and raffle for Chelly's card
    //let dummy_user = get_user("Chelly")

    let confetti_colors = [["black", "#ECB661"], [colors.silver1, colors.silver2], [colors.bronze1, colors.bronze2], [colors.blue]]

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
            const winnerRes = await fetch('http://' + ip.ipAddress + '/user/ids/', {
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
                    <LinearGradient start={[0, 0]} end={[1, 0]} colors={gradient} style={{ margin: Dimensions.get('window').width * 0.005 }}>
                        <TouchableOpacity style={[styles.card]}
                            onPress={() => {
                                setoverlay(true)
                                setSelected(element)
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


    return (
        <View>
            <ScrollView>
                <View style={styles.container}>
                    {display}
                    <Overlay isVisible={overlay} onBackdropPress={() => setoverlay(false)} overlayStyle={{ backgroundColor: 'transparent' }}>
                        <WinnerCard prize={prize} winner={selected} raffle={raffle} host={host} navigation={navigation} />
                        <ConfettiCannon
                            count={100}
                            origin={{ x: 0, y: 0 }}
                            autoStart={true}
                            fadeOut={true}
                            fallSpeed={2500}
                            colors={confetti_colors[prize]}
                            // colors={["black", "#ECB661"]}
                        />
                    </Overlay>

                </View>
            </ScrollView>
            <Social currUser={user}></Social>
        </View>
    )
}