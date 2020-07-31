import React, { useState, useEffect } from 'react';
import { StatusBar} from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Welcome from './components/05_Pages/Welcome/Welcome'
import Login from './components/05_Pages/LoginProcess/Login/Login'
import Signup from './components/05_Pages/Signup/Signup'
import PhoneVerify from './components/05_Pages/Signup/PhoneVerify'
import EnterEmail from './components/05_Pages/LoginProcess/EnterEmail/EnterEmail';
import EnterCode from './components/04_Templates/EnterCode/EnterCode';
import ChangePassword from './components/05_Pages/LoginProcess/ChangePassword/ChangePassword';
import Home from './components/05_Pages/Home/Home'
import Raffle from './components/05_Pages/Home/Raffle/Raffle'
import PlayGame from './components/05_Pages/Home/PlayGame/PlayGame'
import Game from './components/05_Pages/Home/Game/Game'
import Search from './components/05_Pages/Search/Search'
import Likes from './components/05_Pages/Likes/Likes'
import Social from './components/05_Pages/Social/Social'

import EditProfile from './components/05_Pages/EditProfile/EditProfile'
import Following from './components/05_Pages/Following/Following'
import Followers from './components/05_Pages/Followers/Followers'
import Top5List from './components/02_Molecules/Top5List/Top5List'
import YourFeed from './components/05_Pages/Home/YourFeed/YourFeed';
import Explore from './components/05_Pages/Home/Explore/Explore';
import OtherUser from './components/05_Pages/OtherUser/OtherUser'

import GameController from './components/GameController';
import RaffleResult from './components/05_Pages/Home/RaffleResult/RaffleResult'
import EnteredUsers from './components/05_Pages/Home/EnteredUsers/EnteredUsers';
import { Button, Text } from 'react-native'
import { startClock } from 'react-native-reanimated';
import GlobalState from './components/globalState'

// Account page import
import Account from './components/05_Pages/Account/Account';
import Profile from './components/05_Pages/Account/Profile/Profile';
import Wallet from './components/05_Pages/Account/Wallet/Wallet';
import HowItWorks from './components/05_Pages/Account/HowItWorks/HowItWorks';
import FAQ from './components/05_Pages/Account/FAQ/FAQ';
import ReqBusAcc from './components/04_Templates/ReqBusAcc/ReqBusAcc';
import MyDrawings from './components/05_Pages/Account/MyDrawings/MyDrawings';
import NotLogin from './components/05_Pages/Account/NotLogin/NotLogin';

// Host pages import
import AskRaffleType from './components/05_Pages/Host/AskRaffleType/AskRaffleType';
import NewRaffle from './components/05_Pages/Host/NewRaffle/NewRaffle';
import io from 'socket.io-client'

const Stack = createStackNavigator();
console.disableYellowBox = true;

function App() {
  const [user, setUser] = useState({})
  const ip = require('./components/IP_ADDRESS.json')
  const [socket, setSocket] = useState(io('http://'+ip.ipAddress+''))
  return (
    <GlobalState.Provider value={{ user, setUser, socket }}>
      <NavigationContainer>
        <StatusBar backgroundColor="white" barStyle="light-content"/>
        <Stack.Navigator initialRouteName="Welcome"
          screenOptions={{
            headerStyle: {
              backgroundColor: 'black',
            },
            headerTintColor: '#fff',
          }}>
          <Stack.Screen name=" " component={Welcome} options={{ headerShown: false }} />
          <Stack.Screen name="Signup" component={Signup} options={{ title: 'Sign Up' }} />
          <Stack.Screen name="PhoneVerify" component={PhoneVerify} options={{ title: 'Verify Account' }} />
          <Stack.Screen name="Login" component={Login} options={{ title: 'Log In' }} />
          <Stack.Screen name="EnterEmail" component={EnterEmail} options={{ title: 'Forgot Password' }}/>
          <Stack.Screen name="EnterCode" component={EnterCode} options={{ title: 'Forgot Password' }}/>
          <Stack.Screen name="ChangePassword" component={ChangePassword} options={{ title: 'New Password' }}/>
          <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
          <Stack.Screen name="YourFeed" component={YourFeed} options={{ headerShown: false }} />
          {/* <Stack.Screen name="Explore" component={Explore} /> */}
          <Stack.Screen name="Raffle" component={Raffle} options={({ route }) => ({ title: route.params.name })}/>
          <Stack.Screen name="PlayGame" component={PlayGame} />
          <Stack.Screen name="Game" component={Game} />
          <Stack.Screen name="Search" component={Search} options={{ headerLeft: null }}/>
          <Stack.Screen name="Social" component={Social}  options={{ headerLeft: null }}/>
          <Stack.Screen name="Likes" component={Likes}  options={{ headerLeft: null }}/>
          <Stack.Screen name="Account" component={Account} options={{ headerLeft: null }}/>
          <Stack.Screen name="Profile" component={Profile} options={{
            title: user.name, }} />
          <Stack.Screen name="Wallet" component={Wallet} />
          <Stack.Screen name="HowItWorks" component={HowItWorks} options={{ title: 'How It Works' }}/>
          <Stack.Screen name="FAQ" component={FAQ} />
          <Stack.Screen name="MyDrawings" component={MyDrawings} options={{ title: 'My Drawings' }}/>
          <Stack.Screen name="NotLogin" component={NotLogin} options={{ title: '' }}/>
          <Stack.Screen name="EditProfile" component={EditProfile} options={{title: 'Edit Profile'}}/>
          <Stack.Screen name="Following" component={Following} />
          <Stack.Screen name="Followers" component={Followers} />
          <Stack.Screen name="Top5List" component={Top5List} />
          <Stack.Screen name="OtherUser" component={OtherUser} options={({ route }) => ({ title: route.params.user.name })} />
          <Stack.Screen name="GameController" component={GameController} options={{ title: '' }}/>
          <Stack.Screen name="RaffleResult" component={RaffleResult} />
          <Stack.Screen name="EnteredUsers" component={EnteredUsers} options={{ title: 'Entered' }}/>
          <Stack.Screen name="AskRaffleType" component={AskRaffleType} options={{ title: 'New Raffle' }}/>
          <Stack.Screen name="NewRaffle" component={NewRaffle} options={{ title: 'Submit Raffle' }}/>
          <Stack.Screen name="ReqBusAcc" component={ReqBusAcc} options={{ title: 'Submit Raffle' }}/>

        </Stack.Navigator>
      </NavigationContainer>
    </GlobalState.Provider>
  );
}

export default App;
