import React, {useState} from 'react';
import {  View, Text, Linking, ScrollView } from 'react-native';
import BlockButton from '../01_Atoms/Buttons/BlockButton/BlockButton';
import Divider from '../01_Atoms/Divider/Divider.js';
import InputField from '../02_Molecules/InputField/InputField.js';
import CheckBox from '../02_Molecules/Checkbox/Checkbox';
import {colors, fonts, utilities} from '../../settings/all_settings';

export default function Signup({ navigation }) {
  const [state, setState] = useState({
    businessAccount: false,
    futureDrawings: false,
    agreement: false,
    signedUp: false,
    confirm: null // for confirming password
  })

  // states for each input value
  const [_name, setName] = useState(null)
  const [_username, setUsername] = useState(null)
  const [_phoneNumber, setPhoneNumber] = useState(null)
  const [_email, setEmail] = useState(null)
  const [_instaHandle, setInstaHandle] = useState(null)
  const [_password, setPassword] = useState(null)

  // makes a json object with all the input fields
  const makeJSON = () => {
    let data = {
      name: _name,
      username: _username,
      phoneNumber: _phoneNumber,
      email: _email,
      instaHandle: _instaHandle,
      password: _password
    }
    console.log(JSON.stringify(data))
  };

  return (
    <ScrollView>
      <View style={[utilities.flexCenter, {marginBottom: 25}]}>
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

      <InputField 
        label="Full Name" 
        autoCapitalize="words" 
        value={_name} 
        onChangeText={(text) => {setName(text)}} 
        required />
      <InputField 
        label="Username" 
        value={_username} 
        onChangeText={(text) => {setUsername(text)}} 
        required/>
      <InputField 
        label="Phone Number" 
        textContentType="telephoneNumber"
        // maxLength={10} 
        keyboardType="phone-pad" 
        value={_phoneNumber} 
        onChangeText={(text) => {setPhoneNumber(text)}}
        required/>
      <InputField 
        label="Email" 
        textContentType="emailAddress"
        keyboardType="email-address" 
        value={_email} onChangeText={(text) => {setEmail(text)}} required/>
      <InputField 
        label="Instagram Handle" 
        value={_instaHandle} onChangeText={(text) => {setInstaHandle(text)}}
        required 
        tooltip={true} 
        tooltipContent="We use this to to give you bonus chances when you share with friends"/>
      <InputField 
        label="Password" 
        value={_password} 
        onChangeText={(text) => {setPassword(text)}}
        required 
        password/>
      <InputField 
        label="Confirm Password" 
        value={state.confirm}
        onChangeText={(text) => {setState({confirm: text})}}
        required 
        password/>

      <CheckBox 
        selected={state.businessAccount} 
        onPress={() => setState({ businessAccount: !state.businessAccount, futureDrawings: state.futureDrawings, agreement: state.agreement})}
        text='Request a business account to host your own drawings'
      />
      {state.businessAccount ? (
        <View style={[utilities.flexCenter, {width: 300}]}>
          <InputField label="Describe the item you would like to use in a drawing" required />
          <InputField label="Please provide the charity/foundation name(s) you are raising donations for" required />
          <InputField label="Please provide any additional details below (business website, social media links)" />
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
      {/* TODO: Links to Home (no home page currently, button is not functional)
          Right now, the button imitates a database POST request with a one second timeout */}
      <BlockButton  
        title="SIGN UP" 
        color="primary"
        onPress={() => {
          // check that passwords match
          if (_password == state.confirm){
            setState({businessAccount: state.businessAccount, futureDrawings: state.futureDrawings, agreement: state.agreement, signedUp: true, name: state.name})
            setTimeout(() => {navigation.navigate('Login', { reset: false })}, 1000)
            makeJSON()
          }

          }}/>
      {state.signedUp ? <Text>Signing Up...</Text> : null}
    </View>
    </ScrollView>
  );
}