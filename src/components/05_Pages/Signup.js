import * as React from 'react';
import {  View, Text, Linking, ScrollView } from 'react-native';
import BlockButton from '../01_Atoms/Buttons/BlockButton/BlockButton';
import Divider from '../01_Atoms/Divider/Divider.js';
import InputField from '../02_Molecules/InputField/InputField.js';
import TextLink from '../01_Atoms/Buttons/TextLinks/TextLinks';

export default function Login({ navigation }) {
  return (
    <ScrollView>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 30 }}>
      <Text>Sign Up</Text>
      {/* TODO: need to implement OAUTH functionality (currently links to instagram) */}
      <BlockButton  
        title="Log in With Instagram" 
        color="instagram"
        onPress={() => Linking.openURL('https://www.instagram.com/')}/>
      {/* TODO: need to implement OAUTH functionality (currently links to facebook) */}
      <BlockButton 
        title="Log in With Facebook" 
        color="facebook"
        onPress={() => Linking.openURL('https://www.facebook.com/')}/>
      <Divider/>
      <InputField label="Full Name"></InputField>
      <InputField label="Username"></InputField>
      <InputField label="Email"></InputField>
      <InputField label="Instagram Handle"></InputField>
      <InputField label="Password"></InputField>
      <InputField label="Confirm Password"></InputField>
      <Text>Placeholder Checkbox</Text>
      <Text>Placeholder Checkbox</Text>
      <Text>Placeholder Checkbox</Text>
      {/* TODO: Links to Home (no home page currently, button is not functional) */}
      <BlockButton 
        title="LOG IN" 
        color="primary"
        onPress={() => navigation.navigate('Login')}/>
    </View>
    </ScrollView>
  );
}