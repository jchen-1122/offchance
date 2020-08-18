import React, { useState, useRef, useContext } from 'react';
import { ScrollView, View, Text, TextInput, Dimensions, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
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
import BlockButton from '../../../01_Atoms/Buttons/BlockButton/BlockButton';
import ViewShot from "react-native-view-shot";
import * as Sharing from 'expo-sharing';
// import CameraRoll from "@react-native-community/cameraroll";
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import OverlaySheet from '../../../04_Templates/OverlaySheet/OverlaySheet'

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
    const [currUserisWinner, setCurrWinner] = useState(false)
    const [display, setDisplay] = useState([])
    const [feed, setFeed] = useState('')
    const ip = require('../../../IP_ADDRESS.json');
    const { user, setUser } = useContext(GlobalState)
    // test user and raffle for Chelly's card
    //let dummy_user = get_user("Chelly")

    // entertobuy thing
    const [containerStyle, setContainerStyle] = useState(styles.container);
    const [sheetController, setSheetController] = useState(false); // 0 - close, 1 - open. TODO: GLOBAL STATE

    const trigger = () => {
        setSheetController(!sheetController);

        setContainerStyle( !sheetController ?
          { // light on
          flex: 1,
          justifyContent: 'space-between',
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        } : { // light off
          flex: 1,
          justifyContent: 'space-between',
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          });

        // console.log(sheetController); 101010
      }

    let confetti_colors = [["black", "#ECB661"], [colors.gold1, colors.gold2], [colors.silver1, colors.silver2], [colors.blue]]

    const WinnerCardRef = useRef();
    const viewShot = useRef()

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
            console.log(response)
            setRaffle(response)
            setEnteredUsers(response.users.children)
            setWinnerObjs(response.winners.children)

            let hostResp = await fetch('http://' + ip.ipAddress + '/user/id/' + response.hostedBy)
            hostResp = await hostResp.json()
            setHost(hostResp)
        }
        getRaffle(route.params.raffle._id)
        //console.log(winnerObjs)
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
        async function getPermissionAsync() {
            if (Constants.platform.ios) {
                const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        }
        getPermissionAsync()

        let CardArray = []
        let count = 0
        winners.forEach((element, index) => {
            {/* JOSHUA START */ }
            // set current logged in user winner card
            if (element._id === user._id) {
                setwinnerOverlay(true)
                setwinnerPrize(element.prize)
                setCurrWinner(true)
            }
            {/* JOSHUA END */ }
            if (element.hasOwnProperty("prize")) {
                count++
                if (element["prize"] == 0) {
                    setgrandPrize(element.prize)
                    setgrandWinner(element)
                }
                CardArray.push(
                    <View style={{marginHorizontal: '1%', marginVertical: '0.5%'}}>
                        <BackCard user={element} time={count * 1000 + 10000} setoverlay={setoverlay} setSelected={setSelected} setPrize={setPrize} setFeed={setFeed} />
                    </View>
                )
            }
        });
        setDisplay(CardArray)
        setWinnerTime(winners.length + 18)
    }, [winners])

    const [selectedImage, setSelectedImage] = useState(null);

    // for sharing on social media
    let openShareDialogAsync = async (image) => {
        if (!(await Sharing.isAvailableAsync())) {
            alert(`Uh oh, sharing isn't available on your platform`);
            return;
        }
        await Sharing.shareAsync(image);
    };

    // doesnt work rn - save the WinnerCard as an image
    // async function savePicture(tag) {
    //     if (Platform.OS === "android" && !(await hasAndroidPermission())) {
    //         return;
    //     }
    //     CameraRoll.save(tag);
    // };
    return (
        <KeyboardAwareScrollView
            resetScrollToCoords={{ x: 0, y: 0 }}
            scrollEnabled={false}
            contentContainerStyle={{ height: Dimensions.get('window').height, justifyContent: 'space-between' }}>
            <ScrollView >
                <View style={[styles.container, ]}>

                    {/* Card Display */}
                    <View style={[styles.cardGrid, ]}>
                        {display}
                    </View>

                    {/* Waiting Overlay */}
                    <Overlay isVisible={localTime > 0} overlayStyle={styles.timerOverlay}>
                        <KeyboardAwareScrollView
                            scrollEnabled={false}
                            contentContainerStyle={{ height: Dimensions.get('window').height, width: Dimensions.get('window').width, marginLeft: '-3%' }}
                            >

                            <View style={[utilities.flexCenter]}>
                                <Text style={[fonts.h1, { color: 'white' }]}>DRAWING IS STARTING IN</Text>
                                <Text style={styles.timerOverlay__timer}>{localTime} seconds</Text>
                                <Text style={[fonts.h2, { color: 'white' }]}>
                                    {(localTime > 10) ? 'Determining Winners...' : 'Populating Winners...'}
                                </Text>
                            </View>

                            <View style={{ height: Dimensions.get('window').height * 0.25, flex: 1.1, }}>
                                <Social currUser={user} />
                            </View>
                            
                        </KeyboardAwareScrollView>
                    </Overlay>

                    {/* Winner Overlay */}
                    {(winnerOverlay && winnerTime <= 5) ? 
                    <Overlay isVisible={winnerOverlay} onBackdropPress={() => {
                        setwinnerOverlay(false)
                        trigger()
                        }} overlayStyle={{ backgroundColor: 'transparent' }}>
                        <WinnerCard ref={WinnerCardRef} prize={winnerPrize} winner={user} raffle={raffle} host={host} navigation={navigation} currUser={user} />
                        <ViewShot ref={viewShot} options={{ format: "jpg", quality: 0.9 }}>
                            <View style={{ width: Dimensions.get('window').width * 0.8, alignItems: 'center' }}>

                                <BlockButton color="primary" title="SHARE" size="short" onPress={() => viewShot.current.capture().then(async (uri) => {
                                    openShareDialogAsync('file://' + uri)
                                })} />
                            </View>
                        </ViewShot>
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
                    
                    {/* only enter to buy raffles */}
                    {(currUserisWinner && winnerTime <= 1 && raffle.type === 2) ? 
                         <View style={{marginLeft: '-8%', marginRight: '-8%'}}>
                         <OverlaySheet
                         title={raffle.name + "booga"}
                         type='default'
                         sheet={sheetController}
                         trigger={trigger}
                         height={Dimensions.get('screen').height * 0.7}
                         user={user}
                         setUser={setUser}
                         content={['Wallet Balance', 'Reload Source', 'Reload Amount']}
                         navigation={navigation}
                         wallet={false}
                         amount={raffle.productPrice}
                         amountDollar={raffle.productPrice}
                         raffle={raffle._id}
                         entertobuy={true}
                         />
                     </View>:
                        null
                    }  

                    {/* Any Card Overlay */}
                    <Overlay isVisible={overlay} onBackdropPress={() => setoverlay(false)} overlayStyle={{ backgroundColor: 'transparent' }}>
                        <ViewShot ref={viewShot} options={{ format: "jpg", quality: 0.9 }}>
                            <WinnerCard ref={WinnerCardRef} prize={prize} winner={selected} raffle={raffle} host={host} navigation={navigation} currUser={user} />
                        </ViewShot>
                        <View style={{ width: Dimensions.get('window').width * 0.8, alignItems: 'center' }}>
                            <BlockButton color="primary" title="SHARE" size="short" onPress={() => viewShot.current.capture().then(async (uri) => {
                                openShareDialogAsync('file://' + uri)
                            })} />
                        </View>
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

            {/* Live Chat */}
            <View style={{ marginBottom: '0%', flex: 3}}>
                {(localTime <= 0) ? <Social currUser={user}></Social> : null}
            </View>

        </KeyboardAwareScrollView>

    )
}