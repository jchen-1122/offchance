import React, { useState, useContext } from 'react';
import { Text, View, Dimensions, ScrollView, BackHandler, Alert } from 'react-native'
// import {fonts} from '../../../settings/fonts';
import { colors, fonts, utilities } from '../../../settings/all_settings';
import BottomNav from '../../02_Molecules/BottomNav/BottomNav';
import TopNav from '../../02_Molecules/TopNav/TopNav';
import Card from '../../03_Organisms/Card/Card';
import ToggleType from '../../01_Atoms/Buttons/ToggleType/ToggleType';
import ToggleTypeMenu from '../../03_Organisms/ToggleTypeMenu/ToggleTypeMenu'
import BlockButton from '../../01_Atoms/Buttons/BlockButton/BlockButton'
import GlobalState from '../../globalState';
import { user_logged_in } from '../../../functions/user_functions';
import { top5_global, getLatestRaffles, getLatestWinners, sortTrending } from '../../../functions/explore_functions';
import HorizontalScroll from '../../04_Templates/HorizontalScroll/HorizontalScroll';
import Top5Card from '../../03_Organisms/HorizontalCards/Top5Card/Top5Card';
import LatestWinnerCard from '../../03_Organisms/HorizontalCards/LatestWinnerCard/LatestWinnerCard';
import RaffleCard from '../../03_Organisms/HorizontalCards/RaffleCard/RaffleCard';
import registerForPushNotifications from '../../../functions/pushNotifs/registerForPushNotifications';
import * as Notifications from 'expo-notifications';

function Home({ navigation }) {
  const data = require('../../IP_ADDRESS.json');
  const { user, setUser } = useContext(GlobalState)
  const [token, setToken] = useState(null)

  // top 5 donors and latest winners
  const [top5donors, setTop5Donors] = useState([])
  const [latestWinners, setLatestWinners] = useState([])
  const [latestRaffles, setLatestRaffles] = useState([])

  // different sets of raffles
  const [raffles, setRaffles] = useState([])
  const [trendingRaffles, setTrendingRaffles] = useState([])
  const [donateRaffles, setDonateRaffles] = useState([])
  const [buyRaffles, setBuyRaffles] = useState([])
  const [upcomingRaffles, setUpcomingRaffles] = useState([])

  // React.useEffect(async() => {

  //   editUser()
  // }, [])

  // get all raffles and maybe filter them by type
  React.useEffect(() => {
    async function getRaffle() {
      if (!user.token){
        setToken(await registerForPushNotifications())
      }
      setTop5Donors(await top5_global())
      setLatestWinners(await getLatestWinners())
      setLatestRaffles(await getLatestRaffles())
      let response = await fetch('http://' + data.ipAddress + '/raffle/query?query=archived&val=false')
      response = await response.json()
      setDonateRaffles(response.filter((raffle) => { return raffle.type == 1 }))
      setBuyRaffles(response.filter((raffle) => { return raffle.type == 2 }))
      setUpcomingRaffles(response.filter((raffle) => { return raffle.live == false }))
      setTrendingRaffles(sortTrending(response))
      setRaffles(response)
    }
    getRaffle()

    // if user doesn't have push notifications configured
    const addToken = async () => {
      const response = await fetch('http://' + data.ipAddress + '/user/edit/' + user._id, {
        method: "PATCH",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          token: token
        })
      })
      const json = await response.json()
      return json
    }
    if (!user.token){
      addToken()
    }

    // navigate to a particular page
    // ex: data: {"title": "Hello", "message": "Yes", "page": "Search"}
    Notifications.addNotificationResponseReceivedListener((response) => {
      let page = response.notification.request.content.data.body.page
      if (page){
        navigation.navigate(page)
      }
    }

    );

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

  }, [])


  return (
    <View style={utilities.container}>
      <ScrollView contentContainerStyle={utilities.scrollview}>
        <TopNav navigation={navigation} active='Home' />
        <View style={utilities.flexCenter}>

          <HorizontalScroll title="Trending" theme="light" seeAllRaffles={trendingRaffles} navigation={navigation} toggle={true}>
            {trendingRaffles.map((raffle, index) =>
              <RaffleCard raffle={raffle} navigation={navigation} />
            )}

          </HorizontalScroll>
          <HorizontalScroll title="Top 5 Donors" theme="dark">
            {top5donors.map((donor, index) =>
              <Top5Card data={donor} navigation={navigation} currUser={user} setUser={setUser} />
            )}
          </HorizontalScroll>

          <HorizontalScroll title="Donate to Enter Raffles" theme="light" seeAllRaffles={donateRaffles} navigation={navigation}>
            {donateRaffles.map((raffle, index) =>
              <RaffleCard raffle={raffle} navigation={navigation} />
            )}
          </HorizontalScroll>

          <HorizontalScroll title="Latest Winners" theme="dark">
            {latestWinners.map((winner, index) =>
              <LatestWinnerCard raffle={latestRaffles[index]} winner={winner} navigation={navigation} />
            )}
          </HorizontalScroll>

          <HorizontalScroll title="Enter To Buy Raffles" theme="light" seeAllRaffles={buyRaffles} navigation={navigation}>
            {buyRaffles.map((raffle, index) =>
              <RaffleCard raffle={raffle} navigation={navigation} />
            )}
          </HorizontalScroll>

          <View style={{ marginTop: '-10%' }}>
            <HorizontalScroll title="Coming Soon" theme="light" seeAllRaffles={upcomingRaffles} navigation={navigation} toggle={true}>
              {upcomingRaffles.map((raffle, index) =>
                <RaffleCard raffle={raffle} navigation={navigation} />
              )}
            </HorizontalScroll>
          </View>

        </View>
      </ScrollView>
      <BottomNav navigation={navigation} active={'Home'} />
    </View>

  )
}

export default Home;
