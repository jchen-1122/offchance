import React, { useState, useContext } from 'react';
import { Text, View, Dimensions, ScrollView, BackHandler, Alert, Button } from 'react-native'
// import {fonts} from '../../../settings/fonts';
import { colors, fonts, utilities } from '../../../../settings/all_settings';
import BottomNav from '../../../02_Molecules/BottomNav/BottomNav';
import TopNav from '../../../02_Molecules/TopNav/TopNav';
import GlobalState from '../../../globalState';
import { getPendingRaffles } from '../../../../functions/explore_functions';
import PendingCard from '../../../03_Organisms/PendingCard/PendingCard'

function Home({ navigation }) {
  const data = require('../../../IP_ADDRESS.json');
  const { user, setUser } = useContext(GlobalState)

  // different sets of raffles
  const [pendingRaffles, setPendingRaffles] = useState([])
  const [refresh, setRefresh] = useState(true)

  // get all raffles and maybe filter them by type
  React.useEffect(() => {
    async function getRaffle() {
      setPendingRaffles(await getPendingRaffles())
      h = {}
      for (var i = 0; i < pendingRaffles.length; i++) {
        h[pendingRaffles[i]._id] = await getHostObj(pendingRaffles[i].hostedBy)
        //console.log(h[pendingRaffles[i]._id])
      }
      //setHosts(h)
    }
    getRaffle()

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

  async function getHostObj(hostid) {
    try {
        let host = await fetch('http://' + data.ipAddress + '/user/id/' + hostid)
        host = await host.json()
        return host
    } catch (e) {
        return {}
    }
  }

  return (
    <View style={utilities.container}>
      <ScrollView contentContainerStyle={utilities.scrollview}>
        <TopNav navigation={navigation} active='ActiveHome' admin={true}/>
        <Button title={'Refresh'} onPress={() => setRefresh(!refresh)}></Button>
        <View style={utilities.flexCenter}>
            {pendingRaffles.map((raffle, index) =>
                <PendingCard
                    data={raffle}
                    navigation={navigation}
                />)}

        </View>
      </ScrollView>
      <BottomNav navigation={navigation} active={'AdminHome'} admin={true}/>
    </View>

  )
}

export default Home;
