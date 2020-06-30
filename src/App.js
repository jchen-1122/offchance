import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import BlockButton from './components/01_Atoms/Buttons/BlockButton/BlockButton.js';
import LikeButton from './components/01_Atoms/Buttons/LikeButton/LikeButton.js';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Offchance App</Text>
      <Text>Joshua's Second Edit</Text>
      <LikeButton title="like" />
      <BlockButton title="PRIMARY BUTTON" color="primary"/>
      <BlockButton title="SECONDARY BUTTON" color="secondary"/>
      <BlockButton title="INSTAGRAM" color="instagram"/>
      <BlockButton title="FACEBOOK" color="facebook"/>
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
