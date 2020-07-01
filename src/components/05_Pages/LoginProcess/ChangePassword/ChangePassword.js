import * as React from 'react';
import {  View, Text } from 'react-native';
import BlockButton from '../../../01_Atoms/Buttons/BlockButton/BlockButton';
import InputField from '../../../02_Molecules/InputField/InputField.js';
import TextLink from '../../../01_Atoms/Buttons/TextLinks/TextLinks';

export default function ChangePassword({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Update Password</Text>
      <InputField label="New Password"></InputField>
      <InputField label="Confirm Password"></InputField>
    {/* TODO: Click to redirect to login and display green banner */}
      <BlockButton 
        title="UPDATE PASSWORD" 
        color="primary"
        onPress={() => navigation.navigate('Login', { reset: true })}/>
    </View>
  );
}