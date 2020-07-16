import React, {useState, useEffect, Component} from 'react';
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
import validator from 'validator'

export default function Login({ navigation, route }) {
  const data = require('../../../IP_ADDRESS.json');

  // useEffect(() => {
  //   console.log('using effect')
  //   if (_errors.length == 0 && renderToggle) {
  //     console.log('set email valid to true')
  //     setEmailValid(true)
  //   }
  //   setRender(true)
  // }, [_email])

  const loginUser = () => {
    fetch('http://'+data.ipAddress+':3000/user/login',{
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: makeJSON()
    })
      .then((response) => response.json())
      .then((json) => {
        let errors = []
        errors.push(<Text style={styles.error}>Logging you in...</Text>)
        setErrors(errors)
        if (json.error) {
          console.log('error found')
          passInvalid = true
          let errors = []
          errors.push(<Text style={styles.error}>Password Incorrect</Text>)
          setErrors(errors)
        } else {
          console.log(json)
          setUserObj(json)
        }})
      .catch((error) => {console.log(error)})
  }

  const [_errors, setErrors] = useState([])

  // states for each input value
  const [_email, setEmail] = useState(null)
  const [_password, setPassword] = useState(null)
  const [emailValid, setEmailValid] = useState(false)
  const [renderToggle, setRender] = useState(false)
 
  // validates email input
  const isValidEmail = () => {
    return validator.isEmail(String(_email).toLowerCase());
  }

  // check for any errors in input, returns array of errors
  const generateErrors = async () => {
    let errors = []
    // if not a valid email
    if (!isValidEmail()) {
      errors.push(<Text style={styles.error}>Email is not valid</Text>)
      setErrors(errors)
    } else {
      setErrors([])
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
      <InputField label="Email / Username" onChangeText={(text) => {
        setEmail(text)}}/>  
      <InputField label="Password" password onChangeText={(text) => {
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
        color="primary"
        onPress={async () => {
          await generateErrors()
          if (_errors.length == 0) {
            navigation.navigate('Profile')
          }
        }}/>
    </View>
    </ScrollView>
  );
}