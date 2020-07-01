import * as React from 'react';
import {  View, Text } from 'react-native';
import BlockButton from '../../../01_Atoms/Buttons/BlockButton/BlockButton';
import InputField from '../../../02_Molecules/InputField/InputField.js';
import TextLink from '../../../01_Atoms/Buttons/TextLinks/TextLinks';

export default function EnterCode({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Enter Your Code</Text>
      <Text>Enter the verification code that was sent to your email</Text>
      <InputField label="Verification Code"></InputField>
      <BlockButton 
        title="SUBMIT" 
        color="primary"
        onPress={() => navigation.navigate('Update Password')}/>
      <View style={{flexDirection: 'row'}}>
        <Text>Don't see a code?</Text>
        {/* TODO: Click to re-send code (currently, button is not functional) */}
        <TextLink
          title="Send it again."
          style={{color: 'black', textDecorationLine: 'underline'}}
          onPress={() => navigation.navigate('Enter Your Code')}/>
      </View>
    </View>
  );
}