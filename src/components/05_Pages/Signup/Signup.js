import React, {useState, useEffect} from 'react'
import {  View, Text, Linking, ScrollView } from 'react-native';
import BlockButton from '../../01_Atoms/Buttons/BlockButton/BlockButton';
import Divider from '../../01_Atoms/Divider/Divider.js';
import InputField from '../../02_Molecules/InputField/InputField.js';
import CheckBox from '../../02_Molecules/Checkbox/Checkbox';
import {colors, fonts, utilities, dimensions} from '../../../settings/all_settings';
import validator from 'validator'

export default function Signup({ navigation }) {
  const data = require('../../IP_ADDRESS.json');

  // posts user to database
  const postUser = () => {
    fetch('http://'+data.ipAddress+':3000/user/signup/',{
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: makeJSON()
    })
      .then((response) => response.json())
      .then((json) => console.log(json))
      .catch((error) => console.log(error))
  }

  const [state, setState] = useState({
    businessAccount: false,
    futureDrawings: false,
    agreement: false,
    signedUp: false,
    confirm: null, // for confirming password
  })
  const [_errors, setErrors] = useState([])
  const [_confirm, setConfirm] = useState(null)

  // states for each input value
  const [_name, setName] = useState(null)
  const [_username, setUsername] = useState(null)
  const [_phoneNumber, setPhoneNumber] = useState(null)
  const [_email, setEmail] = useState(null)
  const [_instaHandle, setInstaHandle] = useState(null)
  const [_password, setPassword] = useState(null)

  // validates email input
  const isValidEmail = () => {
    // regex expression
    //const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return validator.isEmail(String(_email).toLowerCase());
  }

  // validates phone input
  const isValidPhoneNumber = () => {
    //const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    return validator.isMobilePhone(String(_phoneNumber).toLowerCase());
  }

  // check for any errors in input, returns array of errors
  const generateErrors = () => {
    let errors = []
    // if passwords don't match
    if (_password != _confirm){
      errors.push(<Text style={fonts.error}>Passwords do not match</Text>)
    }
    // if not a valid email
    if (!isValidEmail()){
      errors.push(<Text style={fonts.error}>Email is not valid</Text>)
    }
    // if not valid phone number
    if (!isValidPhoneNumber()){
      errors.push(<Text style={fonts.error}>Phone number is not valid</Text>)
    }
    // must agree to terms of service
     if (!state.agreement){
       errors.push(<Text style={fonts.error}>Must agree to terms of services</Text>)
     }
    setErrors(errors)
    if (errors.length > 0) return true
    return false
  }

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
    return JSON.stringify(data)
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
        // maxLength={11} 
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
        value={_confirm}
        onChangeText={(text) => {setConfirm(text)}}
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
  
      {/* if some input field is invalid, a red error message will pop up */} 
      {_errors}
      
      <BlockButton  
        title="SIGN UP" 
        color="primary"
        onPress={() => {
          let isError = generateErrors()
          setState({businessAccount: state.businessAccount, futureDrawings: state.futureDrawings, agreement: state.agreement, signedUp: true})
          //console.log(_errors)
          if (!isError){
            setTimeout(() => {navigation.navigate('Login', { reset: false })}, 1000)
            postUser()
          }
          }}/>
      {state.signedUp && _errors.length == 0? <Text>Signing Up...</Text> : null}
    </View>
    </ScrollView>
  );
}