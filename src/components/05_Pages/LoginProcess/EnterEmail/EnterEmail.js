import * as React from 'react';
import {  View, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import BlockButton from '../../../01_Atoms/Buttons/BlockButton/BlockButton';
import InputField from '../../../02_Molecules/InputField/InputField.js';
import { fonts, utilities, dimensions } from '../../../../settings/all_settings';

export default function EnterEmail({ navigation }) {
  return (
    <ScrollView contentContainerStyle={utilities.scrollview}>
    <View style={utilities.flexCenter}>
      <Text style={[fonts.p, {width: dimensions.width}]}>Enter your email so we can send you a verification code.</Text>
      <InputField label="Email"></InputField>
      <BlockButton 
        title="SEND CODE" 
        color="primary"
        onPress={() => navigation.navigate('Enter Code')}/>
    </View>
    </ScrollView>
  );
}