import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import BlockButton from './components/01_Atoms/Buttons/BlockButton/BlockButton.js';
import {blackLogin, instaLogin, FBLogin} from "./components/01_Atoms/Buttons/BlockButton/BlockButton.styling";
import FBLogo from "../assets/FBLogo.png";
import InstaLogo from "../assets/InstaLogo.png";

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Offchance App</Text>
      <Text>Joshua's Second Edit</Text>
      <BlockButton btnType={blackLogin} content="LOG IN"/>
      <BlockButton btnType={instaLogin} content="Log In With Instagram" logo={InstaLogo}/>
      <BlockButton btnType={FBLogin} content="Log In With Facebook" logo={FBLogo}/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
