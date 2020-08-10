import React, { useState, useRef, useContext } from 'react';
import { ScrollView, View, Text, TextInput, Dimensions, TouchableOpacity, KeyboardAvoidingView, } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { Overlay } from 'react-native-elements';
import styles from './RaffleResult.styling';
import { fonts, colors, utilities } from '../../../../settings/all_settings';
import TextLink from '../../../01_Atoms/Buttons/TextLinks/TextLinks';
import WinnerCard from '../../../03_Organisms/WinnerCard/WinnerCard';
import BackCard from '../../../03_Organisms/BackCard/BackCard';
import { LinearGradient } from 'expo-linear-gradient';
import { get_user, get_raffle } from '../../../fake_users/live-drawing-test';
import Social from '../../Social/Social'
import GlobalState from '../../../globalState';
import Card from '../../../03_Organisms/Card/Card';
import ConfettiCannon from 'react-native-confetti-cannon';

export default function RaffleResult({ navigation, route }) {
    const [selected, setSelected] = useState(0)
    const [overlay, setoverlay] = useState(false)
    {/* JOSHUA START */ }
    const [winnerOverlay, setwinnerOverlay] = useState(false)
    const [grandOverlay, setgrandOverlay] = useState(true)
    const [winnerPrize, setwinnerPrize] = useState(null)
    const [grandPrize, setgrandPrize] = useState(null)
    const [grandWinner, setgrandWinner] = useState(null)
    const [feedId, setFeedId] = useState(0)
    {/* JOSHUA END */ }
    const [prize, setPrize] = useState(null)
    const [enteredUsers, setEnteredUsers] = useState([])
    const [winners, setWinners] = useState([])
    const [winnerObjs, setWinnerObjs] = useState([])
    const [raffle, setRaffle] = useState({})
    const [host, setHost] = useState({})
    const [currWinner, setCurrWinner] = useState({})
    const [display, setDisplay] = useState([])
    const [feed, setFeed] = useState('')
    const ip = require('../../../IP_ADDRESS.json');
    const { user, setUser } = useContext(GlobalState)
    // test user and raffle for Chelly's card
    //let dummy_user = get_user("Chelly")

    let confetti_colors = [["black", "#ECB661"], [colors.silver1, colors.silver2], [colors.bronze1, colors.bronze2], [colors.blue]]

    const [localTime, localSetTime] = useState(10)
    const [winnerTime, setWinnerTime] = useState(10000)

    React.useEffect(() => {
        let interval = null
        if (localTime > 0) {
            interval = setInterval(() => {
                localSetTime(localTime => localTime - 1)
            }, 1000)
        }
        return () => {
            clearInterval(interval)
        }
    }, [localTime])

    React.useEffect(() => {
        let interval = null
        if (winnerTime > 0) {
            if (winnerTime < 18) {
                if (feedId < winners.length) {
                    setFeed(winners[feedId].username + ' won ' + winners[feedId].prize)
                    setFeedId(feedId + 1)
                }
            }
            interval = setInterval(() => {
                setWinnerTime(winnerTime => winnerTime - 1)
            }, 1000)
        }
        return () => {
            clearInterval(interval)
        }
    }, [winnerTime])

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
        winners.forEach((element, index) => {
            {/* JOSHUA START */ }
            // set current logged in user winner card
            if (element._id === user._id) {
                setwinnerOverlay(true)
                setwinnerPrize(element.prize)
            }
            {/* JOSHUA END */ }
            if (element.hasOwnProperty("prize")) {
                var gradient;
                count++
                switch (element["prize"]) {
                    case 0:
                        setgrandPrize(element.prize)
                        setgrandWinner(element)
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
                    <BackCard user={element} time={count * 1000 + 10000} setoverlay={setoverlay} setSelected={setSelected} setPrize={setPrize} setFeed={setFeed} />
                    /*<LinearGradient start={[0, 0]} end={[1, 0]} colors={gradient} style={{ margin: Dimensions.get('window').width * 0.005 }}>
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

                        </TouchableOpacity>
                    </LinearGradient>*/
                )
            }
        });
        setDisplay(CardArray)
        setWinnerTime(winners.length + 18)
    }, [winners])

    return (
        <KeyboardAwareScrollView
            resetScrollToCoords={{ x: 0, y: 0 }}
            scrollEnabled={false}
            contentContainerStyle={{ height: Dimensions.get('window').height, justifyContent: 'space-between' }}
        >
            <ScrollView>
                <Text>{feed}</Text>
                <View style={[styles.container]}>
                    {display}
                    <Overlay isVisible={localTime > 0} overlayStyle={styles.timerOverlay}>
                        <KeyboardAwareScrollView
                            resetScrollToCoords={{ x: 0, y: 0 }}
                            scrollEnabled={false}
                            contentContainerStyle={{ height: Dimensions.get('window').height, width: Dimensions.get('window').width, marginLeft: '-3%'}}
                        >
                            <View style={[utilities.flexCenter]}>
                                <Text style={[fonts.h1, { color: 'white' }]}>DRAWING IS STARTING IN</Text>
                                <Text style={styles.timerOverlay__timer}>{localTime} seconds</Text>
                                <Text style={[fonts.h2, { color: 'white' }]}>
                                    {(localTime > 10) ? 'Determining Winners...' : 'Populating Cards...'}
                                </Text>
                            </View>
                            <View style={{ height: Dimensions.get('window').height*0.35 }}>
                                <Social currUser={user} />
                            </View>
                        </KeyboardAwareScrollView>
                    </Overlay>
                    {/* JOSHUA START */}
                    {/* individual card if logged in user is a winner */}
                    {/* keep it here in case david changes his mind lmao */}
                    {/* {(winnerTime <= 5 && winnerTime >= 1) ? <Overlay isVisible={grandOverlay} onBackdropPress={() => {
                        setgrandOverlay(false)
                        setWinnerTime(0)
                        setwinnerOverlay(true)
                    }} 
                        overlayStyle={{ backgroundColor: 'transparent' }}>
                        <WinnerCard prize={grandPrize} winner={grandWinner} raffle={raffle} host={host} navigation={navigation} currUser={user}/>
                        <ConfettiCannon
                            count={100}
                            origin={{ x: Dimensions.get('window').width * 0.5, y: Dimensions.get('window').height}}
                            autoStart={true}
                            fadeOut={true}
                            // fallSpeed={2500}
                            explosionSpeed={25}
                            colors={confetti_colors[prize]}
                        />
                    </Overlay> : null} */}
                    {(winnerOverlay && winnerTime <= 5) ? <Overlay isVisible={winnerOverlay} onBackdropPress={() => setwinnerOverlay(false)} overlayStyle={{ backgroundColor: 'transparent' }}>
                        <WinnerCard prize={winnerPrize} winner={user} raffle={raffle} host={host} navigation={navigation} currUser={user} />
                        <ConfettiCannon
                            count={100}
                            origin={{ x: Dimensions.get('window').width * 0.5, y: Dimensions.get('window').height }}
                            autoStart={true}
                            fadeOut={true}
                            // fallSpeed={2500}
                            explosionSpeed={25}
                            colors={confetti_colors[prize]}
                        />
                    </Overlay> : null}
                    {/* JOSHUA END */}
                    <Overlay isVisible={overlay} onBackdropPress={() => setoverlay(false)} overlayStyle={{ backgroundColor: 'transparent' }}>
                        <WinnerCard prize={prize} winner={selected} raffle={raffle} host={host} navigation={navigation} currUser={user} />
                        <ConfettiCannon
                            count={200}
                            origin={{ x: -10, y: 0 }}
                            autoStart={true}
                            fadeOut={true}
                            fallSpeed={2500}
                            explosionSpeed={15}
                            colors={confetti_colors[prize]}
                        />
                    </Overlay>
                </View>

            </ScrollView>
            <View style={{ marginBottom: '25%' }}>
                {(localTime <= 0) ? <Social currUser={user}></Social> : null}
            </View>

        </KeyboardAwareScrollView>

    )
}