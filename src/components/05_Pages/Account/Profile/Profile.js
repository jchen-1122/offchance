import React, { useState, useContext, useEffect } from 'react'
import { View, ScrollView, Text, Image, Button, Dimensions, Share, Clipboard, Alert } from 'react-native'
import { Icon } from 'react-native-elements';
import { colors, fonts, utilities, global } from '../../../../settings/all_settings';
import InfoFeed from '../../../02_Molecules/InfoFeed/InfoFeed'
import BlockButton from '../../../01_Atoms/Buttons/BlockButton/BlockButton'
import Card from '../../../03_Organisms/Card/Card'
import BottomNav from '../../../02_Molecules/BottomNav/BottomNav'
import StatsBar from '../../../02_Molecules/StatsBar/StatsBar'
import Nswitch from '../../../../../assets/images/switch.jpeg'
import { styles } from './Profile.styling'
import GlobalState from '../../../globalState';
import Construction from '../../../04_Templates/Construction/Construction'
import { TouchableOpacity } from 'react-native-gesture-handler';

function Profile({ navigation }) {
    const { user, setUser } = useContext(GlobalState)
    const [wonRaffles, setWonRaffles] = useState([])
    const ip = require('../../../IP_ADDRESS.json');

    useEffect(() => {
        async function getRaffles() {
            var wonRaffles = []
            if (user.rafflesWon) {
                if (user.rafflesWon.children.length > 0) {
                    for (var raf of user.rafflesWon.children) {
                        let response = await fetch('https://8f5d9a32.us-south.apigw.appdomain.cloud/raffle/id', {
                            method: "POST",
                            headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({id : raf.raffleID})
                        })
                        response = await response.json()
                        response = response.raffle
                        wonRaffles.push({ raffle: response, prize: raf.reward })
                    }
                }
            }
            setWonRaffles(wonRaffles)
        }
        getRaffles()

        // push notif test
        // const sendMessage = async () => {
        //     const response = await fetch('http://' + ip.ipAddress + '/user/message', {
        //         method: "POST",
        //         headers: {
        //             'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        //             'Content-Type': 'application/json'
        //         },
        //         body: makeJSON()
        //     })
        //     const json = await response.text()
        //     console.log('JSON', json)
        //     return json
        // }
        // sendMessage()

    }, [])

    // const makeJSON = () => {
    //     console.log(user.token)
    //     let data = {
    //         pushTokens: ["ExponentPushToken[m4aGivEg8jEZwmTAmANpil]"],
    //         title: 'Fuck Bitches',
    //         message: 'Get Money'
    //     }
    //     return JSON.stringify(data)
    // }
    // add edit button in topbar
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Button onPress={() => {
                    navigation.navigate("EditProfile", user)
                }} title="Edit" />
            ),
            headerLeft: () => (
                <TouchableOpacity style={{ paddingLeft: 10 }} onPress={() => {
                    navigation.navigate("Account", user)
                }}>
                    <Icon name='menu'
                        type='material-community'
                        color='white'
                        backgroundColor='transparent' />
                </TouchableOpacity>
            ),
        });
    }, [navigation]);

    const [info, setInfo] = useState(true)
    let name, username, profilePic, email, followers, following, enteredRaffles, address, sizeType, shoeSize, shirtSize, referralCode, walletChances
    if (user == null) {
        name = 'John Doe'
        username = '@johndoe'
        profilePic = "https://i.pinimg.com/originals/dc/24/88/dc2488feb2d6dc4750a95a1f715c67d8.jpg"
    } else {
        name = user.name
        username = user.username
        profilePic = user.profilePicture
        email = user.email
        followers = user.followers
        following = user.following
        enteredRaffles = Object.keys(user).includes('rafflesEntered') ? user.rafflesEntered.children : []
        address = user.shippingAddress
        sizeType = user.sizeType
        shoeSize = user.shoeSize
        shirtSize = user.shirtSize
        referralCode = Object.keys(user).includes('referralCode') ? user.referralCode : ''
        walletChances = user.walletChances || 0
    }

    // for copying referral code to clipboard
    const copyToClipboard = () => {
        Clipboard.setString(referralCode);
        Alert.alert(
            "Copied!",
            "Your referral code has been copied to your clipboard",
            [
                { text: "OK", onPress: () => console.log("OK Pressed") }
            ],
            { cancelable: false }
        );
    }

    // for sharing referral code
    const onShare = async () => {
        try {
            const result = await Share.share({
                message:
                    'Sign up for Off Chance and use the referral code ' + referralCode + ' to get 5 free chances to use in any drawing!',
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    }

    let content;
    // if toggle is on 'info'
    if (info) {
        content = (
            <View style={{ alignItems: 'flex-start', marginLeft: Dimensions.get('window').width * 0.08 }}>
                <Text style={styles.Profile__item__label}>Name</Text>
                <Text style={styles.Profile__item__value}>{name}</Text>

                <Text style={styles.Profile__item__label}>Email</Text>
                <Text style={styles.Profile__item__value}>{email}</Text>

                <View>
                    <Text style={styles.Profile__item__label}>Shipping Address</Text>
                    <Text style={styles.Profile__item__value}>{address}</Text>

                    <View style={{ flexDirection: 'row', width: Dimensions.get('window').width * 0.83, justifyContent: 'space-between' }}>
                        <View>
                            <Text style={styles.Profile__item__label}>Size Type</Text>
                            <Text style={styles.Profile__item__value}>{(sizeType) ? sizeType.charAt(0).toUpperCase() + sizeType.slice(1) : ''}</Text>
                        </View>
                        <View>
                            <Text style={styles.Profile__item__label}>Shoe Size</Text>
                            <Text style={styles.Profile__item__value}>{shoeSize}</Text>
                        </View>
                        <View>
                            <Text style={styles.Profile__item__label}>Shirt Size</Text>
                            <Text style={styles.Profile__item__value}>{shirtSize}</Text>
                        </View>
                    </View>

                    <Text style={styles.Profile__item__label}>Referral Code</Text>
                    <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                        <Text style={styles.Profile__item__value}>{referralCode}</Text>
                        <View style={{ flexDirection: 'row', width: '25%', justifyContent: 'space-between' }}>
                            <TouchableOpacity onPress={copyToClipboard}>
                                <Icon name="clipboard" type="material-community" />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={onShare} style={{ marginRight: '30%' }}>
                                <Icon name="share" type="material-community" />
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>
            </View>
        )
    }
    else {
        content = (
            <View style={{ alignItems: 'center' }}>
                {wonRaffles.map((raf, index) =>
                    <Card
                        cardType='feed'
                        feedType='win'
                        prize={raf.prize}
                        data={raf.raffle}
                        key={index}
                        navigation={navigation}
                        currUserG={user}
                        setUserG={setUser}
                    />
                )}
            </View>
        )
    }
    return (
        <View style={utilities.container}>
            <ScrollView>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-end', zIndex: 1 }}>
                    <View style={{ zIndex: -1, backgroundColor: 'transparent' }}>
                        {/* Profile pic*/}
                        <Image source={{ uri: profilePic }} style={global.Profile__picture}></Image>
                    </View>
                    {/* Green Checkmark*/}
                    {user.isHost ?
                        <View style={{ zIndex: 50, position: 'absolute', right: Dimensions.get('window').width * 0.35 }}>
                            <Icon name={'check-circle'}
                                type='octicons'
                                color={colors.primaryColor}
                                backgroundColor='white'
                                style={{ borderRadius: 50 }} />
                        </View> : null}
                    {/* </View> */}
                </View>

                <Text style={global.Profile__name}>{name}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'center', }}>
                    <Text style={global.Profile__username}>@{username}</Text>
                </View>

                <StatsBar currUser={user} followers={followers} following={following} enteredRaffles={enteredRaffles} navigation={navigation}></StatsBar>

                <View style={{alignItems: 'center', marginTop: 20}}>
                    {/* wallet chances */}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: -20, width: '90%' }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                            <Text style={styles.Profile__item__label}>Wallet Chances: </Text>
                            <Text style={styles.Profile__item__value}>{walletChances}</Text>
                        </View>

                        <TouchableOpacity onPress={() => navigation.navigate('Wallet')}>
                            <Icon name="wallet" type="material-community" />
                        </TouchableOpacity>
                    </View>

                    <InfoFeed info={info} setInfo={setInfo}></InfoFeed>
                </View>
                <View>
                    {content}
                </View>

            </ScrollView>

            <BottomNav navigation={navigation} active={'Account'}></BottomNav>
        </View>
    )
}

export default Profile;
