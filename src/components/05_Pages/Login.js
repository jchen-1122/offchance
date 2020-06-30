import * as React from 'react';
import { View, Text, Linking } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import BlockButton from '../01_Atoms/Buttons/BlockButton/BlockButton';

export default function Login() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {/* need to implement OAUTH functionality (currently links to instagram) */}
      <BlockButton 
        title="Log in With Instagram" 
        color="instagram"
        onPress={() => Linking.openURL('https://www.instagram.com/')}/>
      {/* need to implement OAUTH functionality (currently links to facebook) */}
      <BlockButton 
        title="Log in With Facebook" 
        color="facebook"
        onPress={() => Linking.openURL('https://www.facebook.com/')}/>
      <Text>Placeholder Login Page</Text>
      <TextInput>Enter Your Email Here:</TextInput>

    </View>
  );
}