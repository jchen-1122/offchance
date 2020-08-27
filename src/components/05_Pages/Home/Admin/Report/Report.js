import React, { useState, useContext } from 'react'
import { View, Text, ScrollView, Alert, BackHandler, Button, TouchableOpacity, Image } from 'react-native'
import BottomNav from '../../../../02_Molecules/BottomNav/BottomNav'
import { colors, fonts, utilities } from '../../../../../settings/all_settings';
import { getReportedUsers } from '../../../../../functions/explore_functions';
import GlobalState from '../../../../globalState';

export default function Report({ navigation, route }) {
    const data = require('../../../../IP_ADDRESS.json');
    const { user, setUser } = useContext(GlobalState)

    // different sets of raffles
    const [reportedUsers, setReportedUsers] = useState([])
    const [refresh, setRefresh] = useState(true)

    // get all raffles and maybe filter them by type
    React.useEffect(() => {
        async function reported() {
            setReportedUsers(await getReportedUsers())
        }
        reported()

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

    }, [refresh])

    // banned until the year 2069 lol
    async function banFromLiveChat(user, howlong) {
        if (howlong === 0) {
            const response = await fetch('https://8f5d9a32.us-south.apigw.appdomain.cloud/users/edit', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({reports: [], id: user._id})
            })
            let json = await response.json()
            json = json.user
            return json
        } else {
            const response = await fetch('https://8f5d9a32.us-south.apigw.appdomain.cloud/users/edit', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id: user._id, bannedUntil: (howlong === 1) ? Math.floor(Date.now() / 1000) + 86400 : 3155587200, reports: []})
            })
            let json = await response.json()
            json = json.user
            return json
        }
    }

    return (
        <View style={utilities.container}>
            <ScrollView>
                <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'flex-end' }}>
                    <Button title={'Refresh'} onPress={() => setRefresh(!refresh)}></Button>
                </View>
                <View style={{ marginLeft: 10 }}>
                    {reportedUsers.map((user, index) =>
                        <View>
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate('OtherUser', { user: user })
                                }}
                                onLongPress={() => {
                                    Alert.alert(
                                      "Ban User from Live Chat",
                                      "",
                                      [
                                          { text: "Ban for 24 hours", onPress: async () => {
                                              await banFromLiveChat(user, 1)
                                          } },
                                          {
                                             text: "Ban for Life", onPress: async () => {
                                              await banFromLiveChat(user, 2069)
                                             }
                                          },
                                          {
                                            text: "Dismiss", onPress: async () => {
                                                await banFromLiveChat(user, 0)
                                            }
                                         },
                                         {
                                            text: "Cancel", onPress: () => {
                                            }
                                         }
                                      ],
                                      { cancelable: true }
                                  );
                                  }}
                                style={{ flexDirection: 'row', margin: 15 }}>
                                <Image source={{ uri: user.profilePicture }} style={{ width: 30, height: 30, borderRadius: 30 / 2, marginRight: 5 }}></Image>
                                <Text style={{ marginTop: 5, fontSize: 18 }}>@{user.username}</Text>
                            </TouchableOpacity>
                            {(Object.keys(user).includes('bannedUntil')) ? <Text>Previously Banned Already</Text> : null}
                            <View style={{ marginLeft: 25 }}>
                                {
                                    user.reports.map((message) =>
                                        <Text>{message}</Text>
                                    )
                                }
                            </View>
                        </View>)}
                </View>
            </ScrollView>
            <BottomNav navigation={navigation} active={'Report'} admin={true} />
        </View>
    )
}