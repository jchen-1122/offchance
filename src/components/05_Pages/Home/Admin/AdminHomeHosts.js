import React, { useState, useContext } from 'react';
import { Text, View, ScrollView, BackHandler, Alert, Button, Image, TouchableOpacity } from 'react-native'
// import {fonts} from '../../../settings/fonts';
import { colors, fonts, utilities } from '../../../../settings/all_settings';
import BottomNav from '../../../02_Molecules/BottomNav/BottomNav';
import TopNav from '../../../02_Molecules/TopNav/TopNav';
import GlobalState from '../../../globalState';
import { getPendingUsers } from '../../../../functions/explore_functions';
import PendingCard from '../../../03_Organisms/PendingCard/PendingCard'

function Home({ navigation }) {
  const data = require('../../../IP_ADDRESS.json');
  const { user, setUser } = useContext(GlobalState)

  // different sets of raffles
  const [pendingHosts, setPendingHosts] = useState([])
  const [refresh, setRefresh] = useState(true)

  // get all raffles and maybe filter them by type
  React.useEffect(() => {
    async function getWannabeHosts() {
        setPendingHosts(await getPendingUsers())
    }
    getWannabeHosts()

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
      <ScrollView contentContainerStyle={utilities.scrollview}>
        <TopNav navigation={navigation} active='ActiveHome' admin={true}/>
        <Button title={'Refresh'} onPress={() => setRefresh(!refresh)}></Button>
        <View style={{marginLeft: 10}}>
            {pendingHosts.map((user, index) =>
            <TouchableOpacity 
            onPress={() => {
                navigation.navigate('AdminEditHost', user)
            }}
            style={{flexDirection: 'row', margin: 15}}>
                <Image source={{ uri: user.profilePicture }} style={{width:30, height: 30, borderRadius: 30/2, marginRight: 5}}></Image>
                <Text style={{marginTop: 5, fontSize: 18}}>@{user.username}</Text>
            </TouchableOpacity>)}
        </View>
      </ScrollView>
      <BottomNav navigation={navigation} active={'AdminHome'} admin={true}/>
    </View>

  )
}

export default Home;
