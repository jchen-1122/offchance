import React, { useState, useEffect } from 'react'
import { View, Text, Linking, ScrollView, KeyboardAvoidingView, } from 'react-native';
import BlockButton from '../../01_Atoms/Buttons/BlockButton/BlockButton';
import Divider from '../../01_Atoms/Divider/Divider.js';
import InputField from '../../02_Molecules/InputField/InputField.js';
import CheckBox from '../../02_Molecules/Checkbox/Checkbox';
import Dropdown from '../../01_Atoms/DropDown/DropDown';
import { colors, fonts, utilities, dimensions } from '../../../settings/all_settings';
import validator from 'validator';
import * as Google from 'expo-google-app-auth';

export default function Signup({ navigation }) {
  const data = require('../../IP_ADDRESS.json');
  const jsonData = require('../../../functions/us_states.json')

  var us_states = []
  for (var i in jsonData) us_states.push(i)

  const sendsms = async () => {
    const response = await fetch('http://'+data.ipAddress+'/user/sendphone',{
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },  
      body: makeJSON()
    })
  }

  const checkValid = async () => {
    let errors = []
    const email = await fetch('http://' + data.ipAddress + '/user/query?query=email&val=' + _email, {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    const emailjson = await email.json()
    if (emailjson.length !== 0) {
      errors.push(<Text style={fonts.error}>Email is taken. Please try again.</Text>)
    }
    const usr = await fetch('http://' + data.ipAddress + '/user/query?query=username&val=' + _username, {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    const usrjson = await usr.json()
    if (usrjson.length !== 0) {
      errors.push(<Text style={fonts.error}>Username is taken. Please try again.</Text>)
    }
    const phone = await fetch('http://' + data.ipAddress + '/user/query?query=phoneNumber&val=' + _phoneNumber, {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    const phonejson = await phone.json()
    if (phonejson.length !== 0) {
      errors.push(<Text style={fonts.error}>Phone number already registered.</Text>)
    }
    setErrors(errors)
    if (errors.length > 0) return true
    return false
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
  const [active, setActive] = useState(null)

  // states for each input value
  const [_name, setName] = useState(null)
  const [_username, setUsername] = useState(null)
  const [_phoneNumber, setPhoneNumber] = useState(null)
  const [_email, setEmail] = useState(null)
  const [_instaHandle, setInstaHandle] = useState(null)
  const [_password, setPassword] = useState(null)
  const [_us_state, set_us_state] = useState(null)
  const [_city, setCity] = useState(null)
  const [_oauth, setOauth] = useState(false)
  const [_proPic, setProPic] = useState(null)

  // validates email input
  const isValidEmail = () => {
    return validator.isEmail(String(_email).toLowerCase());
  }

  // validates phone input
  const isValidPhoneNumber = () => {
    return validator.isMobilePhone(String(_phoneNumber).toLowerCase());
  }

  // validates the US state
  const isValidState = () => {
    return us_states.includes(_us_state)
  }

  // check for any errors in input, returns array of errors
  const generateErrors = () => {
    let errors = []
    // if passwords don't match
    if (_password != _confirm) {
      errors.push(<Text style={fonts.error}>Passwords do not match</Text>)
    }
    // if not a valid email
    if (!isValidEmail()) {
      errors.push(<Text style={fonts.error}>Email is not valid</Text>)
    }
    // if not valid phone number
    if (!isValidPhoneNumber()) {
      errors.push(<Text style={fonts.error}>Phone number is not valid</Text>)
    }
    // must agree to terms of service
    if (!state.agreement) {
      errors.push(<Text style={fonts.error}>Must agree to terms of services</Text>)
    }
    // must be a valid US state
    if (!isValidState()) {
      errors.push(<Text style={fonts.error}>Must be a valid US state (abbreviation)</Text>)
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
      city: _city,
      state: jsonData[_us_state],
      password: _password,
      isHost: state.businessAccount,
      profilePicture: (_proPic != null) ? _proPic : 'https://oc-mobile-images.s3.us-east.cloud-object-storage.appdomain.cloud/default-avatar.png'
    }
    return JSON.stringify(data)
  };

  // ============================================================================================
  return (
    <KeyboardAvoidingView
      behavior={"padding"}
      keyboardVerticalOffset={100}
      style={{ flex: 1, }}>

      <View style={{justifyContent: "flex-end", flex: 1}}>

    <ScrollView
      showsVerticalScrollIndicator={false}>
      <View style={[utilities.flexCenter, { marginTop: '5%', marginBottom: 25 }]}>
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <BlockButton
            color="facebook"
            title="Facebook"
            style={{margin: 0, marginRight: 7.5}}/>
        <BlockButton
            color="google"
            title="Google"
            style={{ margin: 0, marginLeft: 7.5 }} 
            onPress={async () => {
                try {
                  const result = await Google.logInAsync({
                    androidClientId: '566995907890-o1h8kjbnrkc62k0ft6f1a7pgjvmcq282.apps.googleusercontent.com',
                    iosClientId: '566995907890-nu7o5miq123rdqgks1v7bv2fph8ef94g.apps.googleusercontent.com',
                    scopes: ['profile', 'email'],
                  });
              
                  if (result.type === 'success') {
                    setOauth(true)
                    setName(result.user.name)
                    setEmail(result.user.email)
                    setProPic(result.user.photoUrl)
                    setPassword(result.user.id)
                    setPassword(result.user.id)
                    setConfirm(result.user.id)
                  } else {
                    return { cancelled: true };
                  }
                } catch (e) {
                  return { error: true };
                }
            }}/>
        </View>

        <View style={{ marginVertical: '2.5%', alignItems: 'center' }}>
          <Divider />
        </View>

        <InputField
          label="Full Name"
          autoCapitalize="words"
          value={_name}
          onChangeText={(text) => { setName(text) }}
          required />
        <InputField
          label="Username"
          value={_username}
          onChangeText={(text) => { setUsername(text) }}
          required />
        <InputField
          label="Phone Number"
          textContentType="telephoneNumber"
          keyboardType="phone-pad"
          value={_phoneNumber}
          onChangeText={(text) => { setPhoneNumber(text) }}
          required />
        <InputField
          label="Email"
          textContentType="emailAddress"
          keyboardType="email-address"
          value={_email} onChangeText={(text) => { setEmail(text) }} required />
        <InputField
          label="Instagram Handle"
          style={{ width: '82%' }}
          value={_instaHandle} onChangeText={(text) => { setInstaHandle(text) }}
          tooltip={true}
          tooltipContent="We use this to to give you bonus chances when you share with friends" />

        <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center', zIndex: 5 }}>
          <InputField
            autoCapitalize="words"
            style={{ width: '65%' }}
            label="City"
            value={_city} onChangeText={(text) => { setCity(text) }} />
          <Dropdown 
          options={us_states} 
          size="small" 
          placeholder="State"
          setValue={set_us_state}/>
        </View>
        
        {(_oauth) ? null : <View><InputField
          label="Password"
          value={_password}
          onChangeText={(text) => { setPassword(text) }}
          required
          password />
        <InputField
          label="Confirm Password"
          value={_confirm}
          onChangeText={(text) => { setConfirm(text) }}
          required
          password /></View>}

        <View style={{ width: '90%' }}>
          <CheckBox
            selected={state.businessAccount}
            onPress={() => setState({ businessAccount: !state.businessAccount, futureDrawings: state.futureDrawings, agreement: state.agreement })}
            text='Request to host your own drawings'
          />
        </View>
        {state.businessAccount ? (
          <View style={[utilities.flexCenter, { width: '100%' }]}>
            <InputField label="Describe the item you would like to use in a drawing" textArea required />
            <InputField label="Please provide the charity/foundation name(s) you are raising donations for" textArea required />
            <InputField label="Please provide any additional details below (business website, social media links)" textArea />
          </View>) : null}
        <View style={{ width: '90%' }}>
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
        </View>


        {/* if some input field is invalid, a red error message will pop up */}
        <View style={{ width: '90%', marginTop: 5, marginBottom: 5 }}>
          {_errors}
        </View>

        <BlockButton
          title="SIGN UP FOR 5 FREE CHANCES"
          color="secondary"
          onPress={async () => {
            //console.log(_city)
            //console.log(jsonData[_us_state])
            let isError = generateErrors()
            setState({ businessAccount: state.businessAccount, futureDrawings: state.futureDrawings, agreement: state.agreement, signedUp: true })
            if (!isError) {
              let postErrors = await checkValid()
              if (!postErrors) {
                sendsms()
                const data = makeJSON()
                navigation.navigate('PhoneVerify', { signup: data, mailing: state.futureDrawings, phone: _phoneNumber, email: _email })
              }
              /*const userObj = await postUser()
              if (userObj.keyValue == null) {
                console.log("signed up")
                if (state.futureDrawings) {
                  mailingList()
                }
                navigation.navigate('Login', { signedUp: true })
              } else {
                let errors = []
                let errMsg = ""
                if (userObj.keyValue.username) {
                  errMsg = "Username is taken. Please try again."
                } else if (userObj.keyValue.email) {
                  errMsg = "Email is taken. Please login."
                } else {
                  errMsg = "Fill in required fields"
                }
                errors.push(<Text style={fonts.error}>{errMsg}</Text>)
                setErrors(errors)
              }*/
            }
          }} />
        {state.signedUp && _errors.length == 0 ? <Text>Signing Up...</Text> : null}
      </View>
    </ScrollView>

    <View style={{ flex : 1 }} />
  </View>
  </KeyboardAvoidingView>
  );
}
