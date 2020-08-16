import React, {useState, useContext} from 'react'
import {View, Text, ScrollView, Alert, BackHandler, Button, TouchableOpacity, Image} from 'react-native'
import BottomNav from '../../../../02_Molecules/BottomNav/BottomNav'
import { colors, fonts, utilities } from '../../../../../settings/all_settings';
import { getReportedUsers } from '../../../../../functions/explore_functions';
import GlobalState from '../../../../globalState';

export default function Report({navigation, route}) {
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

    return (
        <View style={utilities.container}>
            <ScrollView>
            <Button title={'Refresh'} onPress={() => setRefresh(!refresh)}></Button>
            <View style={{marginLeft: 10}}>
                {reportedUsers.map((user, index) =>
                <View>
                <TouchableOpacity 
                onPress={() => {
                    navigation.navigate('OtherUser', {user: user})
                }}
                style={{flexDirection: 'row', margin: 15}}>
                    <Image source={{ uri: user.profilePicture }} style={{width:30, height: 30, borderRadius: 30/2, marginRight: 5}}></Image>
                    <Text style={{marginTop: 5, fontSize: 18}}>@{user.username}</Text>
                </TouchableOpacity>
                <View style={{marginLeft: 25}}>
                {
                    user.reports.map((message) => 
                        <Text>{message}</Text>
                    )
                }
                </View>
                </View>)}
            </View>
            </ScrollView>
            <BottomNav navigation={navigation} active={'Report'} admin={true}/>
        </View>
    )
}