import React, { useState, useContext } from 'react';
import { View, ScrollView, BackHandler, Alert } from 'react-native'
import { utilities } from '../../../settings/all_settings';
import BottomNav from '../../02_Molecules/BottomNav/BottomNav';
import TopNav from '../../02_Molecules/TopNav/TopNav';
import Banner from '../../01_Atoms/Banner/Banner'
import GlobalState from '../../globalState';
import { top5_global, getLatestRaffles, getLatestWinners, sortTrending } from '../../../functions/explore_functions';
import HorizontalScroll from '../../04_Templates/HorizontalScroll/HorizontalScroll';
import Top5Card from '../../03_Organisms/HorizontalCards/Top5Card/Top5Card';
import LatestWinnerCard from '../../03_Organisms/HorizontalCards/LatestWinnerCard/LatestWinnerCard';
import RaffleCard from '../../03_Organisms/HorizontalCards/RaffleCard/RaffleCard';
import registerForPushNotifications from '../../../functions/pushNotifs/registerForPushNotifications';
import * as Notifications from 'expo-notifications';
import { time_from_now, in_a_day } from '../../../functions/convert_dates';
import { live_drawing_now} from '../../../functions/raffle_functions'

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
  const [nextRaffle, setNextRaffle] = useState(null)

  // React.useEffect(async() => {

  //   editUser()
  // }, [])

  // get all raffles and maybe filter them by type
  React.useEffect(() => {
    async function getRaffle() {
      setToken(await registerForPushNotifications())
      setTop5Donors(await top5_global())
      setLatestWinners(await getLatestWinners())
      setLatestRaffles(await getLatestRaffles())
      let response = await fetch('https://8f5d9a32.us-south.apigw.appdomain.cloud/raffle/query', {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({query: "approved", val: "true"})
      })
      response = await response.json()
      response = response.raffles
      // archived = false
      let temp = []
      for (var i = 0; i < response.length; i++) {
        if (response[i].archived === false) {
          temp.push(response[i])
        }
      }
      response = temp
      setDonateRaffles(response.filter((raffle) => { return raffle.type == 1 }))
      setBuyRaffles(response.filter((raffle) => { return raffle.type == 2 }))
      setUpcomingRaffles(response.filter((raffle) => { return raffle.live == false }))
      // Getting most upcoming raffle for banner
      let comingraffles = response.filter((raffle) => { return (in_a_day(raffle.startTime) && !raffle.archived) })
      comingraffles.sort((a, b) => (a.startTime < b.startTime) ? 1 : -1)
      let nextraffle = comingraffles[0]
      if (comingraffles.length > 0 && in_a_day(nextraffle.startTime)) setNextRaffle(nextraffle)
      setTrendingRaffles(sortTrending(response))
      setRaffles(response)
    }
    getRaffle()

    // if user doesn't have push notifications configured
    const addToken = async () => {
      const response = await fetch('https://8f5d9a32.us-south.apigw.appdomain.cloud/users/edit', {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          token: await registerForPushNotifications(),
          id: user._id
        })
      })
      let json = await response.json()
      json = json.user
      return json
    }
    if (user.token && user.token !== token) {
      console.log('user.token', user.token)
      console.log('token')
      addToken()
    }

    // navigate to a particular page
    Notifications.addNotificationResponseReceivedListener(async (response) => {
      let page = response.notification.request.content.data.body.data.page
      let host = response.notification.request.content.data.body.data.host
      let raffle = await getRaffleByID(response.notification.request.content.data.body.data.raffleID)
      raffle['host'] = host

      if (page) {
        // if you're supposed to navigate to a certain raffle page
        if (raffle) {
          navigation.navigate(page, raffle)
        }
        navigation.navigate(page)
      }
    }
    );
    async function getRaffleByID(id) {
      let response = await fetch('https://8f5d9a32.us-south.apigw.appdomain.cloud/raffle/id', {
          method: "POST",
          headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
          },
          body: JSON.stringify({id : id})
      })
      response = await response.json()
      response = response.raffle
      return response
    }
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
        {(nextRaffle) ?
        (live_drawing_now(nextRaffle))?
        <Banner
        color="red"
        press={nextRaffle} navigation={navigation}
        title={"LIVE DRAWING HAPPENING NOW" } />
        :
        <View style={{height: 25}}>
        <Banner
        color="green"
        press={nextRaffle} navigation={navigation}
        title={"LIVE DRAWING " + time_from_now(nextRaffle.startTime).toUpperCase()} />
        </View>

        : null}
        <TopNav navigation={navigation} active='Home' />
        <View style={utilities.flexCenter}>

          <HorizontalScroll title="Trending" theme="light" seeAllRaffles={trendingRaffles} navigation={navigation} toggle={true}>

            {trendingRaffles.slice(0, 10).map((raffle, index) =>
              <RaffleCard raffle={raffle} navigation={navigation} />
            )}
          </HorizontalScroll>
          <HorizontalScroll title="Top 5 Donors" theme="dark">
            {top5donors.map((donor, index) =>
              <Top5Card data={donor} navigation={navigation} currUser={user} setUser={setUser} />
            )}
          </HorizontalScroll>

          <HorizontalScroll title="Donate to Enter Raffles" theme="light" seeAllRaffles={donateRaffles} navigation={navigation}>
            {donateRaffles.slice(0,10).map((raffle, index) =>
              <RaffleCard raffle={raffle} navigation={navigation} />
            )}
          </HorizontalScroll>

          <HorizontalScroll title="Latest Winners" theme="dark">
            {latestWinners.slice(0,10).map((winner, index) =>
              <LatestWinnerCard raffle={latestRaffles[index]} winner={winner} navigation={navigation} />
            )}
          </HorizontalScroll>

          <HorizontalScroll title="Enter To Buy Raffles" theme="light" seeAllRaffles={buyRaffles} navigation={navigation}>
            {buyRaffles.slice(0, 10).map((raffle, index) =>
              <RaffleCard raffle={raffle} navigation={navigation} />
            )}
          </HorizontalScroll>

          <View style={{ marginTop: '-10%' }}>
            <HorizontalScroll title="Coming Soon" theme="light" seeAllRaffles={upcomingRaffles} navigation={navigation} toggle={true}>
              {upcomingRaffles.slice(0, 10).map((raffle, index) =>
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
