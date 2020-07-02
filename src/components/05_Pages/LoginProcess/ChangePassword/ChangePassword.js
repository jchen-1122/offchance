import * as React from 'react';
import {  View, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import BlockButton from '../../../01_Atoms/Buttons/BlockButton/BlockButton';
import InputField from '../../../02_Molecules/InputField/InputField.js';
import TextLink from '../../../01_Atoms/Buttons/TextLinks/TextLinks';
import { utilities } from '../../../../settings/all_settings';

export default function ChangePassword({ navigation }) {
  return (
    <ScrollView contentContainerStyle={utilities.scrollview}>
    <View style={utilities.flexCenter}>
      <InputField label="New Password" password />
      <InputField label="Confirm Password" password />
    {/* TODO: Click to redirect to login and display green banner */}
      <BlockButton 
        title="UPDATE PASSWORD" 
        color="primary"
        onPress={() => navigation.navigate('Login', { reset: true })}/>
    </View>
    </ScrollView>
  );
}