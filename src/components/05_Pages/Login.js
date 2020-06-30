  import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

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