import React, { useState, useEffect } from 'react';
import { StatusBar, SafeAreaView} from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Notifications from 'expo-notifications';
import { useFonts } from 'expo-font';
import Welcome from './components/05_Pages/Welcome/Welcome'
import Login from './components/05_Pages/LoginProcess/Login/Login'
import Signup from './components/05_Pages/Signup/Signup'
import PhoneVerify from './components/05_Pages/Signup/PhoneVerify'
import EnterEmail from './components/05_Pages/LoginProcess/EnterEmail/EnterEmail';
import EnterCode from './components/04_Templates/EnterCode/EnterCode';
import ChangePassword from './components/05_Pages/LoginProcess/ChangePassword/ChangePassword';
import Home from './components/05_Pages/Home/Home'
import SeeAll from './components/05_Pages/Home/SeeAll/SeeAll';
import Raffle from './components/05_Pages/Home/Raffle/Raffle'
import PlayGame from './components/05_Pages/Home/RPS/PlayGame/PlayGame'
import Game from './components/05_Pages/Home/RPS/Game/Game'
import Search from './components/05_Pages/Search/Search'
import Social from './components/05_Pages/Social/Social'

import EditProfile from './components/05_Pages/Account/EditProfile/EditProfile'
import Following from './components/05_Pages/Account/Following/Following'
import Followers from './components/05_Pages/Account/Followers/Followers'
import Top5List from './components/02_Molecules/Top5List/Top5List'
import YourFeed from './components/05_Pages/Home/YourFeed/YourFeed';
import Likes from './components/05_Pages/Account/Likes/Likes'
import OtherUser from './components/05_Pages/OtherUser/OtherUser'

import GameController from './components/05_Pages/Home/RPS/GameController';
import LoadingScreen from './components/05_Pages/Home/Raffle/LoadingScreen/LoadingScreen'
import RaffleResult from './components/05_Pages/Home/RaffleResult/RaffleResult'
import EnteredUsers from './components/05_Pages/Home/EnteredUsers/EnteredUsers';

import GlobalState from './components/globalState'

// Account page import
import Account from './components/05_Pages/Account/Account';
import Profile from './components/05_Pages/Account/Profile/Profile';
import Wallet from './components/05_Pages/Account/Wallet/Wallet';
import Stripe from './components/05_Pages/Account/Wallet/Stripe'
import Success from './components/05_Pages/Account/Wallet/Success'
import HowItWorks from './components/05_Pages/Account/HowItWorks/HowItWorks';
import FAQ from './components/05_Pages/Account/FAQ/FAQ';
import MyDrawings from './components/05_Pages/Account/MyDrawings/MyDrawings';
import NotLogin from './components/05_Pages/Account/NotLogin/NotLogin';

// Host pages import
import HostDashboard from './components/05_Pages/Host/HostDashboard/HostDashboard';
import AskRaffleType from './components/05_Pages/Host/AskRaffleType/AskRaffleType';
import NewRaffle from './components/05_Pages/Host/NewRaffle/NewRaffle';
import ReqBusAcc from './components/05_Pages/Host/ReqBusAcc/ReqBusAcc';

// Admin pages
import AdminHome from './components/05_Pages/Home/Admin/AdminHome'
import AdminHomeHosts from './components/05_Pages/Home/Admin/AdminHomeHosts'
import AdminEdit from './components/05_Pages/Home/Admin/AdminEdit/AdminEdit'
import AdminEditHost from './components/05_Pages/Home/Admin/AdminEditHost/AdminEditHost'
import Report from './components/05_Pages/Home/Admin/Report/Report'
import Active from './components/05_Pages/Home/Admin/Active'
import ActiveLive from './components/05_Pages/Home/Admin/ActiveLive'

import io from 'socket.io-client'
const Stack = createStackNavigator();
console.disableYellowBox = true;

function App() {
  const [user, setUser] = useState({})
  const ip = require('./components/IP_ADDRESS.json')
  const [socket, setSocket] = useState(io('http://'+ip.ipAddress+''))

    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
      }),
    });

        // load fonts for the cards
        const [loaded, error] = useFonts({
          'Roboto_medium': require('../assets/fonts/Roboto_medium.ttf')
      });
      if (!loaded) {
          return null;
      }

      
  return (
    <GlobalState.Provider value={{ user, setUser, socket }}>
      <NavigationContainer>
        <StatusBar backgroundColor="black" barStyle="light-content"/>
        <SafeAreaView style={{ flex: 0, backgroundColor: 'black' }} />
        <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }} >

        <Stack.Navigator initialRouteName="Welcome"
          screenOptions={{
            headerStyle: {
              backgroundColor: 'black',
            },
            headerTitleStyle: {
              textAlign: 'center'
            },
            headerTintColor: '#fff',
          }
          }>
          <Stack.Screen name=" " component={Welcome} options={{ headerShown: false }} />
          <Stack.Screen name="Signup" component={Signup} options={{ title: 'Sign Up' }} />
          <Stack.Screen name="PhoneVerify" component={PhoneVerify} options={{ title: 'Verify Account' }} />
          <Stack.Screen name="Login" component={Login} options={{ title: 'Log In' }} />
          <Stack.Screen name="EnterEmail" component={EnterEmail} options={{ title: 'Forgot Password' }}/>
          <Stack.Screen name="EnterCode" component={EnterCode} options={{ title: 'Forgot Password' }}/>
          <Stack.Screen name="ChangePassword" component={ChangePassword} options={{ title: 'New Password' }}/>
          <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
          <Stack.Screen name="SeeAll" component={SeeAll} options={({ route }) => ({ title: route.params.title })}/>
          <Stack.Screen name="YourFeed" component={YourFeed} options={{ headerShown: false }} />
          {/* <Stack.Screen name="Explore" component={Explore} /> */}
          <Stack.Screen name="Raffle" component={Raffle} options={({ route }) => ({ title: route.params.name })}/>
          <Stack.Screen name="PlayGame" component={PlayGame} options={{ headerShown: false }}/>
          <Stack.Screen name="Game" component={Game} options={{ headerShown: false }}/>
          <Stack.Screen name="Search" component={Search} options={{ headerLeft: null }}/>
          <Stack.Screen name="Social" component={Social}  options={{ headerLeft: null }}/>
          <Stack.Screen name="Likes" component={Likes}/>
          <Stack.Screen name="Account" component={Account} options={{ headerLeft: null }}/>
          <Stack.Screen name="Profile" component={Profile} options={{
            title: user.name, }} />
          <Stack.Screen name="Wallet" component={Wallet} />
          <Stack.Screen name="Stripe" component={Stripe} />
          <Stack.Screen name="Success" component={Success} />
          <Stack.Screen name="HowItWorks" component={HowItWorks} options={{ title: 'How It Works' }}/>
          <Stack.Screen name="FAQ" component={FAQ} />
          <Stack.Screen name="MyDrawings" component={MyDrawings} options={{ title: 'My Drawings' }}/>
          <Stack.Screen name="NotLogin" component={NotLogin} options={{ title: '' }}/>
          <Stack.Screen name="EditProfile" component={EditProfile} options={{title: 'Edit Profile'}}/>
          <Stack.Screen name="Following" component={Following} />
          <Stack.Screen name="Followers" component={Followers} />
          <Stack.Screen name="Top5List" component={Top5List} />
          <Stack.Screen name="OtherUser" component={OtherUser} options={({ route }) => ({ title: route.params.user.name })} />
          <Stack.Screen name="GameController" component={GameController} options={{ headerShown: false }}/>
          <Stack.Screen name="LoadingScreen" component={LoadingScreen} />
          <Stack.Screen name="RaffleResult" component={RaffleResult} />
          <Stack.Screen name="EnteredUsers" component={EnteredUsers} options={{ title: 'Entered' }}/>
          <Stack.Screen name="AskRaffleType" component={AskRaffleType} options={{ title: 'New Drawing' }}/>
          <Stack.Screen name="NewRaffle" component={NewRaffle} options={{ title: 'Submit Drawing' }}/>
          <Stack.Screen name="ReqBusAcc" component={ReqBusAcc} options={{ title: 'Get Verified' }}/>
          <Stack.Screen name="HostDashboard" component={HostDashboard} options={{ title: 'Your Drawings' }}/>
          <Stack.Screen name="AdminHome" component={AdminHome} options={{ headerShown: false, title: 'Drawings' }}/>
          <Stack.Screen name="AdminEdit" component={AdminEdit} options={({ route }) => ({ title: route.params.name })}/>
          <Stack.Screen name="AdminHomeHosts" component={AdminHomeHosts} options={{ headerShown: false, title: 'Hosts' }}/>
          <Stack.Screen name="AdminEditHost" component={AdminEditHost} options={({ route }) => ({ title: route.params.name })}/>
          <Stack.Screen name="Report" component={Report} />
          <Stack.Screen name="Active" component={Active} />
          <Stack.Screen name="ActiveLive" component={ActiveLive} />
        </Stack.Navigator>
        </SafeAreaView>
      </NavigationContainer>
    </GlobalState.Provider>
  );
}

export default App;
