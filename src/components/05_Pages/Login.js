  import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import BlockButton from '../01_Atoms/Buttons/BlockButton/BlockButton';

export default function Login() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Placeholder Login Page</Text>
      <TextInput>Enter Your Email Here:</TextInput>
      <Button
        title="submit">
      </Button>
    </View>
  );
}