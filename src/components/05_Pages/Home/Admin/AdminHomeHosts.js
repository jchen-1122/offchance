import React, { useState, useContext } from 'react';
import { Text, View, ScrollView, BackHandler, Alert, Button, Image, TouchableOpacity } from 'react-native'
// import {fonts} from '../../../settings/fonts';
import { colors, fonts, utilities } from '../../../../settings/all_settings';
import BottomNav from '../../../02_Molecules/BottomNav/BottomNav';
import TopNav from '../../../02_Molecules/TopNav/TopNav';
import GlobalState from '../../../globalState';
import { getPendingUsers } from '../../../../functions/explore_functions';
import PendingCard from '../../../03_Organisms/PendingCard/PendingCard';
import NavButton from '../../../01_Atoms/Buttons/NavButton/NavButton';

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
    <View style={[utilities.container, {justifyContent: 'flex-start'}]}>
      <ScrollView>
        <TopNav navigation={navigation} active='Hosts' admin={true} />
        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'flex-end' }}>
          <Button title={'Hosts Pending Approval'} onPress={() => setRefresh(!refresh)} />
        </View>
        <View>
          {pendingHosts.map((user, index) =>
          <NavButton title={'@'+user.username} profilePicture={user.profilePicture} onPress={()=>navigation.navigate('AdminEditHost', user)} />)}
        </View>
      </ScrollView>
      <BottomNav navigation={navigation} active={'AdminHome'} admin={true} />
    </View>

  )
}

export default Home;
