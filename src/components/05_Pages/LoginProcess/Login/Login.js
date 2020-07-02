import * as React from 'react';
import {  View, Text, Linking, Dimensions } from 'react-native';
import BlockButton from '../../../01_Atoms/Buttons/BlockButton/BlockButton';
import Divider from '../../../01_Atoms/Divider/Divider.js';
import InputField from '../../../02_Molecules/InputField/InputField.js';
import TextLink from '../../../01_Atoms/Buttons/TextLinks/TextLinks';
import Banner from '../../../01_Atoms/Banner/Banner.js';
import {fonts, utilities} from '../../../../settings/all_settings';
import { styles } from '../../../01_Atoms/Buttons/BlockButton/BlockButton.styling';
import { ScrollView } from 'react-native-gesture-handler';


export default function Login({ navigation, route }) {
  return (
    <ScrollView contentContainerStyle={utilities.scrollview}>
    <View style={utilities.flexCenter}>
    {route.params.reset && <Banner
        color="red"
        title="Your password has been updated!" />}
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
      <InputField label="Email / Username" />
      <InputField label="Password" password />
      {/* DONE: Links to Forgot Password (no forgot password currently, button is not functional) */}
      {/* Added redirect to EnterEmail */}
      <View style={[utilities.flexEndX, {width: '80%'}]}>
        <TextLink
          title="Forgot Password?"
          style={fonts.link}
          onPress={() => navigation.navigate('Enter Email')}/>
      </View>

        
      {/* TODO: Links to Home (no home page currently, button is not functional) */}
      <BlockButton 
        title="LOG IN" 
        color="primary"
        onPress={() => navigation.navigate('Log In')}/>
    </View>
    </ScrollView>
  );
}