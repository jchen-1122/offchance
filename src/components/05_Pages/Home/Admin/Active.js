import React, { useState, useContext } from 'react';
import { Text, View, Dimensions, ScrollView, BackHandler, Alert, Button } from 'react-native'
import { Icon } from 'react-native-elements';
// import {fonts} from '../../../settings/fonts';
import { colors, fonts, utilities } from '../../../../settings/all_settings';
import BottomNav from '../../../02_Molecules/BottomNav/BottomNav';
import TopNav from '../../../02_Molecules/TopNav/TopNav';
import Search from '../../Search/Search'
import GlobalState from '../../../globalState';
import { getComingSoon } from '../../../../functions/explore_functions';
import PendingCard from '../../../03_Organisms/PendingCard/PendingCard'

function Home({ navigation }) {
  const data = require('../../../IP_ADDRESS.json');
  const { user, setUser } = useContext(GlobalState)

  // different sets of raffles
  const [comingsoonRaffles, setComingsoonRaffles] = useState([])
  const [refresh, setRefresh] = useState(true)

  // get all raffles and maybe filter them by type
  React.useEffect(() => {
    async function getRaffle() {
      setComingsoonRaffles(await getComingSoon())
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
      <ScrollView contentContainerStyle={[utilities.scrollview,{justifyContent: 'flex-start'}]}>
        <TopNav navigation={navigation} active='Coming Soon' admin={true} fromActive={true}/>
        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
          <Icon name='magnify' type='material-community' color='black' onPress={() => navigation.navigate("Search")} style={{marginTop: 8, marginLeft: 8, marginRight: Dimensions.get('screen').width * 0.35}}/>
          <Button title={'Coming Soon Drawings'} onPress={() => setRefresh(!refresh)} />
        </View>
        <View>
          {comingsoonRaffles.map((raffle, index) =>
            <PendingCard
              data={raffle}
              navigation={navigation}
            />)}

        </View>
      </ScrollView>
      <BottomNav navigation={navigation} active={'Active'} admin={true} />
    </View>

  )
}

export default Home;