import React, {useState, useContext} from 'react';
import {  View, Text, Linking, Dimensions } from 'react-native';
import BlockButton from '../../../01_Atoms/Buttons/BlockButton/BlockButton';
import Divider from '../../../01_Atoms/Divider/Divider.js';
import InputField from '../../../02_Molecules/InputField/InputField.js';
import TextLink from '../../../01_Atoms/Buttons/TextLinks/TextLinks';
import Banner from '../../../01_Atoms/Banner/Banner.js';
import {fonts, utilities} from '../../../../settings/all_settings';
import { ScrollView } from 'react-native-gesture-handler';
import validator from 'validator'
import GlobalState from '../../../globalState'

export default function Login({ navigation, route }) {
  const {user, setUser} = useContext(GlobalState)

  const data = require('../../../IP_ADDRESS.json');
  const loginUser = async () => {
    const response = await fetch('http://'+data.ipAddress+':3000/user/login',{
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: makeJSON()
    })
    const json = await response.json()
    console.log(json)
    return json
  }

  // states for each input value
  const [_email, setEmail] = useState(null)
  const [_password, setPassword] = useState(null)
  const [_errors, setErrors] = useState([])

  // validates email input
  const isValidEmail = () => {
    return validator.isEmail(String(_email).toLowerCase());
  }

  // check for any errors in input, returns array of errors
  const generateErrors = () => {
    let errors = []
    // if not a valid email
    if (!isValidEmail()) {
      errors.push(<Text style={fonts.error}>Email is not valid</Text>)
      setErrors(errors)
      return true
    } else {
      setErrors([])
      return false
    }

  }

  // makes a json object with all the input fields
  const makeJSON = () => {
    let data = {
      email: _email,
      password: _password
    }
    return JSON.stringify(data)
  };

  return (
    <ScrollView contentContainerStyle={utilities.scrollview}>
    <View style={utilities.flexCenter}>
    {route.params.reset && <Banner
        color="green"
        title="Your password has been updated!" />}
    {route.params.signedUp && <Banner
        color="green"
        title="You have successfully signed up!" />}
      {/* TODO: need to implement OAUTH functionality (currently links to instagram) */}
      <BlockButton
        title="Log in With Google"
        color="google"
        onPress={() => Linking.openURL('https://www.instagram.com/')}/>

      {/* TODO: need to implement OAUTH functionality (currently links to facebook) */}
      <BlockButton
        title="Log in With Facebook"
        color="facebook"
        onPress={() => Linking.openURL('https://www.facebook.com/')}/>

      <Divider/>
      <InputField label=" Email" onChangeText={(text) => {
        setEmail(text)}}/>
      <InputField label=" Password" password onChangeText={(text) => {
        setPassword(text)}}/>
      {/* DONE: Links to Forgot Password (no forgot password currently, button is not functional) */}
      {/* Added redirect to EnterEmail */}
      <View style={[utilities.flexEndX, {width: '80%'}]}>
        <TextLink
          title="Forgot Password?"
          style={fonts.link}
          onPress={() => navigation.navigate('EnterEmail')}/>
      </View>

      {/* if some input field is invalid, a red error message will pop up */}
      {_errors}

      {/* TODO: Links to Home (no home page currently, button is not functional) */}
      <BlockButton
        title="LOG IN"
        color="secondary"
        onPress={async () => {
          if (!generateErrors()) {
            const userObj = await loginUser()
            if (userObj.error == null) {
              setUser(userObj)
              {/* https://stackoverflow.com/questions/42831685/disable-back-button-in-react-navigation */}
              navigation.reset({
                index: 0,
                // routes: [{ name: 'HowItWorks' }],
                actions: [navigation.navigate('HowItWorks', {fromLogin: true})],
              })
            } else {
              let errors = []
              errors.push(<Text style={fonts.error}>Password is not valid</Text>)
              setErrors(errors)
            }
          }
        }}/>
    </View>
    </ScrollView>
  );
}
