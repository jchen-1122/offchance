import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Welcome from './components/05_Pages/Welcome/Welcome'
import Login from './components/05_Pages/LoginProcess/Login/Login'
import Signup from './components/05_Pages/Signup'
import EnterEmail from './components/05_Pages/LoginProcess/EnterEmail/EnterEmail';
import EnterCode from './components/05_Pages/LoginProcess/EnterCode/EnterCode';
import ChangePassword from './components/05_Pages/LoginProcess/ChangePassword/ChangePassword';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Sign Up" component={Signup} />
        <Stack.Screen name="Log In" component={Login} />
        <Stack.Screen name="Forgot Password" component={EnterEmail} />
        <Stack.Screen name="Enter Your Code" component={EnterCode} />
        <Stack.Screen name="Update Password" component={ChangePassword} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
