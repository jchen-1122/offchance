import * as React from 'react';
import {  View, Text } from 'react-native';
import BlockButton from '../01_Atoms/Buttons/BlockButton/BlockButton';
import InputField from '../02_Molecules/InputField/InputField.js';

export default function EnterEmail({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Forgot Password</Text>
      <Text>Enter your email so we can send you a verification code</Text>
      <InputField label="Email"></InputField>
      <BlockButton 
        title="SEND CODE" 
        color="primary"
        onPress={() => navigation.navigate('EnterCode')}/>
    </View>
  );
}