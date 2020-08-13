import React, { useState, useContext, useEffect } from 'react'
import { View, ScrollView, Text, Image, Button, Dimensions, Share, Clipboard, Alert } from 'react-native'
import { Icon } from 'react-native-elements';
import { colors, fonts, utilities } from '../../../../settings/all_settings';
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
    const [viewing, setViewing] = useState((user != null) ? user.viewing : false)
    let name, username, profilePic, email, followers, following, enteredRaffles, address, sizeType, shoeSize, shirtSize, referralCode
    useEffect(() => {
        name = 'JohnDoe'
        // console.log(profilePic)
    })
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
        enteredRaffles = user.rafflesEntered.children
        address = user.shippingAddress
        sizeType = user.sizeType
        shoeSize = user.shoeSize
        shirtSize = user.shirtSize
        referralCode = Object.keys(user).includes('last4') ? user.username + user.last4 : ''
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
                    'Your referral code is ' + referralCode,
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
    return (
        <View style={utilities.container}>
            <ScrollView>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-end', zIndex: 1 }}>
                    <View style={{ zIndex: -1, backgroundColor: 'transparent' }}>
                        {/* Profile pic*/}
                        <Image source={{ uri: profilePic }} style={[styles.profilePic]}></Image>
                    </View>
                    {/* <View style={{ zIndex: 1 }}> */}
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

                <Text style={styles.header_name}>{name}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'center', }}>
                    <Text style={styles.header_username}>@{username}</Text>
                </View>

                <StatsBar currUser={user} followers={followers} following={following} enteredRaffles={enteredRaffles} navigation={navigation}></StatsBar>

                <View style={styles.toggleBar}>
                    <InfoFeed info={info} setInfo={setInfo}></InfoFeed>
                </View>

                {(info) ? <View style={{ alignItems: 'flex-start', marginLeft: Dimensions.get('window').width * 0.08 }}>
                    <Text style={styles.descriptor}>Name</Text>
                    <Text style={styles.description}>{name}</Text>

                    <Text style={styles.descriptor}>Email</Text>
                    <Text style={styles.description}>{email}</Text>

                    {(!viewing) ?
                        <View>
                            <Text style={styles.descriptor}>Shipping Address</Text>
                            <Text style={styles.description}>{address}</Text>

                            <View style={{ flexDirection: 'row', width: Dimensions.get('window').width * 0.83, justifyContent: 'space-between' }}>
                                <View>
                                    <Text style={styles.descriptor}>Size Type</Text>
                                    <Text style={styles.description}>{(sizeType) ? sizeType.charAt(0).toUpperCase() + sizeType.slice(1) : ''}</Text>
                                </View>
                                <View>
                                    <Text style={styles.descriptor}>Shoe Size</Text>
                                    <Text style={styles.description}>{shoeSize}</Text>
                                </View>
                                <View>
                                    <Text style={styles.descriptor}>Shirt Size</Text>
                                    <Text style={styles.description}>{shirtSize}</Text>
                                </View>
                            </View>
                            <Text style={styles.descriptor}>Payment Information</Text>
                            <Text style={styles.description}>**** **** **** 1234</Text>


                            <Text style={styles.descriptor}>Referral Code</Text>
                            <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                                <Text style={styles.description}>{referralCode}</Text>
                                <View style={{ flexDirection: 'row', width: '25%', justifyContent: 'space-between' }}>
                                    <TouchableOpacity onPress={copyToClipboard}>
                                        <Icon name="clipboard" type="material-community" />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={onShare} style={{ marginRight: '30%' }}>
                                        <Icon name="share" type="material-community" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            {/* <View style={{flexDirection: 'row'}}>
                        <View style={styles.payment}>
                            <BlockButton
                            title="ADD PAYMENT"
                            color="secondary"
                            size="short"
                            onPress={() => navigation.navigate("RaffleResult", {name:name, setViewing:setViewing})}></BlockButton>
                        </View>
                    </View> */}

                        </View> : null}
                </View> :
                    <Construction></Construction>
                }
            </ScrollView>

            <BottomNav navigation={navigation} active={'Account'}></BottomNav>
        </View>
    )
}

export default Profile;
