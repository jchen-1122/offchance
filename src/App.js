import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Welcome from './components/05_Pages/Welcome/Welcome'
import Login from './components/05_Pages/LoginProcess/Login/Login'
import Signup from './components/05_Pages/Signup/Signup'
import EnterEmail from './components/05_Pages/LoginProcess/EnterEmail/EnterEmail';
import EnterCode from './components/04_Templates/EnterCode/EnterCode';
import ChangePassword from './components/05_Pages/LoginProcess/ChangePassword/ChangePassword';
import Home from './components/05_Pages/Home/Home'
import Raffle from './components/05_Pages/Home/Raffle/Raffle'
import PlayGame from './components/05_Pages/Home/PlayGame/PlayGame'
import Game from './components/05_Pages/Home/Game/Game'
import Drawings from './components/05_Pages/Drawings/Drawings'
import Likes from './components/05_Pages/Likes/Likes'
import Profile from './components/05_Pages/Profile/Profile'
import EditProfile from './components/05_Pages/EditProfile/EditProfile'
import Following from './components/05_Pages/Following/Following'
import Followers from './components/05_Pages/Followers/Followers'
import YourFeed from './components/05_Pages/Home/YourFeed/YourFeed';
import Explore from './components/05_Pages/Home/Explore/Explore';
import OtherUser from './components/05_Pages/OtherUser/OtherUser'
import GameController from './components/GameController';
import RaffleResult from './components/05_Pages/Home/RaffleResult/RaffleResult'
import EnteredUsers from './components/05_Pages/Home/EnteredUsers/EnteredUsers';
import HowItWorks from './components/05_Pages/Home/HowItWorks/HowItWorks';
import {Button, Text} from 'react-native'
import { startClock } from 'react-native-reanimated';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name=" " component={Welcome} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="EnterEmail" component={EnterEmail} />
        <Stack.Screen name="EnterCode" component={EnterCode} />
        <Stack.Screen name="ChangePassword" component={ChangePassword} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="YourFeed" component={YourFeed}/>
        <Stack.Screen name="Explore" component={Explore} />
        <Stack.Screen name="Raffle" component={Raffle} />
        <Stack.Screen name="PlayGame" component={PlayGame} />
        <Stack.Screen name="Game" component={Game} />
        <Stack.Screen name="Drawings" component={Drawings} />
        <Stack.Screen name="Likes" component={Likes} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="Following" component={Following} />
        <Stack.Screen name="Followers" component={Followers} />
        <Stack.Screen name="OtherUser" component={OtherUser} />
        <Stack.Screen name="GameController" component={GameController} />
        <Stack.Screen name="RaffleResult" component={RaffleResult} />
        <Stack.Screen name="EnteredUsers" component={EnteredUsers} />
        <Stack.Screen name="HowItWorks" component={HowItWorks} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
