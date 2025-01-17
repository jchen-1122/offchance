import React, { useState, useContext } from 'react';
import { Text, View, Dimensions, ScrollView, BackHandler, Alert, Button } from 'react-native'
import { Icon } from 'react-native-elements';
// import {fonts} from '../../../settings/fonts';
import { colors, fonts, utilities } from '../../../../settings/all_settings';
import BottomNav from '../../../02_Molecules/BottomNav/BottomNav';
import TopNav from '../../../02_Molecules/TopNav/TopNav';
import Search from '../../Search/Search'
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
      let host = await fetch('https://8f5d9a32.us-south.apigw.appdomain.cloud/users/id', {
          method: "POST",
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({id : hostid})
      })
      host = await host.json()
      host = host.user
      return host
    } catch (e) {
      return {}
    }
  }

  return (
    <View style={utilities.container}>
      <ScrollView contentContainerStyle={[utilities.scrollview,{justifyContent: 'flex-start'}]}>
        <TopNav navigation={navigation} active='Drawings' admin={true} />
        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between'}}>
          <Icon name='magnify' type='material-community' color='black' onPress={() => navigation.navigate("Search")} style={{marginTop: 8, marginLeft: 8, marginRight: Dimensions.get('screen').width * 0.35}}/>
          <Button title={'Drawings Pending Approval'} onPress={() => setRefresh(!refresh)} />
        </View>
        <View>
          {pendingRaffles.map((raffle, index) =>
            <PendingCard
              data={raffle}
              navigation={navigation}
            />)}
        </View>
      </ScrollView>
      <BottomNav navigation={navigation} active={'AdminHome'} admin={true} />
    </View>

  )
}

export default Home;
