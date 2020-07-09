import React, {useState} from 'react';
import {  View, Text, Linking, Dimensions } from 'react-native';
import BlockButton from '../../../01_Atoms/Buttons/BlockButton/BlockButton';
import Divider from '../../../01_Atoms/Divider/Divider.js';
import InputField from '../../../02_Molecules/InputField/InputField.js';
import TextLink from '../../../01_Atoms/Buttons/TextLinks/TextLinks';
import Banner from '../../../01_Atoms/Banner/Banner.js';
import users, { get_user } from '../..//../fake_users/stub-users'
import {fonts, utilities} from '../../../../settings/all_settings';
import { styles } from '../../../01_Atoms/Buttons/BlockButton/BlockButton.styling';
import { ScrollView } from 'react-native-gesture-handler';


export default function Login({ navigation, route }) {
  const [state, setState] = useState(0)

  return (
    <ScrollView contentContainerStyle={utilities.scrollview}>
    <View style={utilities.flexCenter}>
    {route.params.reset && <Banner
        color="green"
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
      <InputField label="Email / Username" state={state} setState={setState}/>
      <InputField label="Password" password />
      {/* DONE: Links to Forgot Password (no forgot password currently, button is not functional) */}
      {/* Added redirect to EnterEmail */}
      <View style={[utilities.flexEndX, {width: '80%'}]}>
        <TextLink
          title="Forgot Password?"
          style={fonts.link}
          onPress={() => navigation.navigate('EnterEmail')}/>
      </View>

        
      {/* TODO: Links to Home (no home page currently, button is not functional) */}
      <BlockButton 
        title="LOG IN" 
        color="primary"
        onPress={() => {
          navigation.navigate('Profile', get_user(state))}}/>
    </View>
    </ScrollView>
  );
}