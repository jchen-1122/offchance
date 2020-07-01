import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Welcome from './components/05_Pages/Welcome';
import Login from './components/05_Pages/Login';
import Signup from './components/05_Pages/Signup';
import EnterEmail from './components/05_Pages/EnterEmail';
import EnterCode from './components/05_Pages/EnterCode';
import ChangePassword from './components/05_Pages/ChangePassword';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="EnterEmail" component={EnterEmail} />
        <Stack.Screen name="EnterCode" component={EnterCode} />
        <Stack.Screen name="ChangePassword" component={ChangePassword} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
