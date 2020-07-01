import * as React from 'react';
import {  View, Text, Linking } from 'react-native';
import BlockButton from '../../../01_Atoms/Buttons/BlockButton/BlockButton';
import Divider from '../../../01_Atoms/Divider/Divider.js';
import InputField from '../../../02_Molecules/InputField/InputField.js';
import TextLink from '../../../01_Atoms/Buttons/TextLinks/TextLinks';
import Banner from '../../../01_Atoms/Banner/Banner.js';
import {fonts, utilities} from '../../../../settings/all_settings';


export default function Login({ navigation, route }) {
  return (
    <View style={utilities.flexCenter}>
    {route.params.reset && <Banner 
        title="Your password has been updated!" />}
      <Text style={fonts.h1}>Log In</Text>
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
      <InputField label="Email / Username"></InputField>
      <InputField label="Password"></InputField>
      {/* DONE: Links to Forgot Password (no forgot password currently, button is not functional) */}
      {/* Added redirect to EnterEmail */}
      <TextLink
        title="Forgot Password?"
        style={fonts.link}
        onPress={() => navigation.navigate('EnterEmail')}/>
        
      {/* TODO: Links to Home (no home page currently, button is not functional) */}
      <BlockButton 
        title="LOG IN" 
        color="primary"
        onPress={() => navigation.navigate('Login')}/>
    </View>
  );
}