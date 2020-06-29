import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import BlockButton from './components/01_Atoms/Buttons/BlockButton/BlockButton.js';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Offchance App</Text>
      <Text>Joshua's Second Edit</Text>
      <BlockButton />
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
