import * as React from 'react';
import {  View, Text } from 'react-native';
import BlockButton from '../../../01_Atoms/Buttons/BlockButton/BlockButton';
import InputField from '../../../02_Molecules/InputField/InputField.js';
import TextLink from '../../../01_Atoms/Buttons/TextLinks/TextLinks';
import { ScrollView } from 'react-native-gesture-handler';
import {fonts, utilities, dimensions} from '../../../../settings/all_settings';

export default function EnterCode({ navigation }) {
  return (
    <ScrollView contentContainerStyle={utilities.scrollview}>
    <View style={utilities.flexCenter}>
      <Text style={[fonts.p, {width: dimensions.width}]}>Enter the verification code that was sent to your email</Text>
      <InputField label="Verification Code" keyboardType="number-pad"></InputField>
      <BlockButton 
        title="SUBMIT" 
        color="primary"
        onPress={() => navigation.navigate('ChangePassword')}/>
      <View style={{flexDirection: 'row'}}>
        <Text style={fonts.p}>Don't see a code?</Text>
        {/* TODO: Click to re-send code (currently, button is not functional) */}
        <TextLink
          title="Send it again."
          style={fonts.link}
          onPress={() => navigation.navigate('EnterCode')}/>
      </View>
    </View>
    </ScrollView>
  );
}