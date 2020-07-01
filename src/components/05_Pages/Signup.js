import React, {useState} from 'react';
import {  View, Text, Linking, ScrollView } from 'react-native';
import BlockButton from '../01_Atoms/Buttons/BlockButton/BlockButton';
import Divider from '../01_Atoms/Divider/Divider.js';
import InputField from '../02_Molecules/InputField/InputField.js';
import TextLink from '../01_Atoms/Buttons/TextLinks/TextLinks';
import CheckBox from '../02_Molecules/Checkbox/Checkbox'

export default function Signup({ navigation }) {
  const [state, setState] = useState({
    businessAccount: false,
    futureDrawings: false,
    agreement: false
  })

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
      <CheckBox 
        selected={state.businessAccount} 
        onPress={() => setState({ businessAccount: !state.businessAccount, futureDrawings: state.futureDrawings, agreement: state.agreement})}
        text='Request a business account to host your own drawings'
      />
      {state.businessAccount ? (
        <View>
          <InputField label="Describe the item you would like to use in a drawing"></InputField>
          <InputField label="Please provide the charity/foundation name(s) you are raising donations for"></InputField>
          <InputField label="Please provide any additional details below (business website, social media links)"></InputField>
        </View>) : null}
      <CheckBox 
        selected={state.futureDrawings} 
        onPress={() => setState({ businessAccount: state.businessAccount, futureDrawings: !state.futureDrawings, agreement: state.agreement })}
        text='Please keep me informed about future drawings'
      />
      <CheckBox 
        selected={state.agreement} 
        onPress={() => setState({ businessAccount: state.businessAccount, futureDrawings: state.futureDrawings, agreement: !state.agreement })}
        text='I agree with terms of service'
      />
      {/* TODO: Links to Home (no home page currently, button is not functional) */}
      <BlockButton 
        title="LOG IN" 
        color="primary"
        onPress={() => navigation.navigate('Login')}/>
    </View>
    </ScrollView>
  );
}