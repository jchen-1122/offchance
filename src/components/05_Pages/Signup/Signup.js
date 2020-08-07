import React, { useState, useRef } from 'react'
import { View, Text, Button, ScrollView, Keyboard, } from 'react-native';
// import ReqBusAcc from '../../04_Templates/ReqBusAcc/ReqBusAcc';
import BlockButton from '../../01_Atoms/Buttons/BlockButton/BlockButton';
import Divider from '../../01_Atoms/Divider/Divider.js';
import InputField from '../../02_Molecules/InputField/InputField.js';
import CheckBox from '../../02_Molecules/Checkbox/Checkbox';
import Dropdown from '../../01_Atoms/DropDown/DropDown';
import { colors, fonts, utilities, dimensions } from '../../../settings/all_settings';
import validator from 'validator';
import * as Google from 'expo-google-app-auth';
import * as Facebook from 'expo-facebook';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default function Signup({ navigation }) {
  const data = require('../../IP_ADDRESS.json');

  // array of states in the us
  const jsonData = require('../../../functions/us_states.json')
  var us_states = []
  for (var i in jsonData) us_states.push(i)

  const sendsms = async () => {
    const response = await fetch('http://' + data.ipAddress + '/user/sendphone', {
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
    let rUser = null
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

    if (_ref.length !== 0) {
      const refcode = await fetch('http://' + data.ipAddress + '/user/query?query=referralCode&val=' + _ref.toUpperCase(), {
        method: "GET",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
      const refjson = await refcode.json()
      if (refjson.length === 0) {
        errors.push(<Text style={fonts.error}>Referral code does not exist</Text>)
      } else {
        // pass the referral giver to the next page
        rUser = refjson[0]._id
      }
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
  const [focused, setFocused] = useState(null)

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
  const [_ref, setRef] = useState('')
  const [_refUser, setRefUser] = useState('')

  // for going to the next text input
  const usernameRef = useRef()
  const phoneNumberRef = useRef()
  const emailRef = useRef()
  const instaRef = useRef()
  const cityRef = useRef()
  const passwordRef = useRef()
  const confirmPasswordRef = useRef()
  const referralRef = useRef()

  // validates email input
  const isValidEmail = () => {
    return validator.isEmail(String(_email).toLowerCase());
  }
  // validates phone input
  const isValidPhoneNumber = () => {
    return validator.isMobilePhone(String(_phoneNumber).toLowerCase());
  }
  // validates referral code
  const isValidRef = async () => {
    return false;
  }

  // check for any errors in input, returns array of errors
  const generateErrors = async () => {
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
      profilePicture: (_proPic != null) ? _proPic : 'https://oc-mobile-images.s3.us-east.cloud-object-storage.appdomain.cloud/default-avatar.png',
    }
    return JSON.stringify(data)
  };

  const getRefUser = async () => {
    if (_ref.length !== 0) {
      const refcode = await fetch('http://' + data.ipAddress + '/user/query?query=referralCode&val=' + _ref.toUpperCase(), {
        method: "GET",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
      const refjson = await refcode.json()
      if (refjson.length === 0) {
        return 'L'
      } else {
        // pass the referral giver to the next page
        return refjson[0]._id
      }
    }
  }

  // ============================================================================================
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}>
      <KeyboardAwareScrollView
        style={{ backgroundColor: 'transparent' }}
        resetScrollToCoords={{ x: 0, y: 0 }}>
        <View style={[utilities.flexCenter, { marginTop: '5%', marginBottom: 25 }]}>

          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <BlockButton
              color="facebook"
              title="Facebook"
              style={{ margin: 0, marginRight: 7.5 }}
              onPress={async () => {
                try {
                  await Facebook.initializeAsync(2031545587174254);
                  const {
                    type,
                    token,
                    expires,
                    permissions,
                    declinedPermissions,
                  } = await Facebook.logInWithReadPermissionsAsync({

                  });
                  if (type === 'success') {
                    // Get the user's name using Facebook's Graph API
                    const response = await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,email,name,picture.type(large)`);
                    const result = await response.json()
                    setOauth(true)
                    setName(result.name)
                    setEmail(result.email)
                    setProPic(result.picture.data.url)
                    setPassword(result.id)
                    setConfirm(result.id)
                  } else {
                    // type === 'cancel'
                    alert("authentication error")
                  }
                } catch ({ message }) {
                  alert(`Facebook Login Error: ${message}`);
                }
              }}
            />
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
                    setConfirm(result.user.id)
                  } else {
                    return { cancelled: true };
                  }
                } catch (e) {
                  return { error: true };
                }
              }} />
          </View>

          <View style={{ marginVertical: '2.5%', alignItems: 'center' }}>
            <Divider />
          </View>


          <InputField
            label="Full Name"
            autoCapitalize="words"
            value={_name}
            onChangeText={(text) => { setName(text) }}
            onSubmitEditing={() => usernameRef.current.focus()}
            required />

          <InputField
            label="Username"
            value={_username}
            onChangeText={(text) => { setUsername(text) }}
            onSubmitEditing={() => phoneNumberRef.current.focus()}
            ref={usernameRef}
            required />

          <InputField
            label="Phone Number"
            textContentType="telephoneNumber"
            keyboardType="phone-pad"
            value={_phoneNumber}
            returnKeyType='done'
            onChangeText={(text) => { setPhoneNumber(text) }}
            onSubmitEditing={() => emailRef.current.focus()}
            ref={phoneNumberRef}
            required />

          <InputField
            label="Email"
            textContentType="emailAddress"
            keyboardType="email-address"
            value={_email}
            onChangeText={(text) => { setEmail(text) }}
            onSubmitEditing={() => instaRef.current.focus()}
            ref={emailRef}
            required />
          <InputField
            label="Instagram Handle"
            style={{ width: '82%' }}
            value={_instaHandle} 
            onChangeText={(text) => { setInstaHandle(text) }}
            onSubmitEditing={() => cityRef.current.focus()}
            ref={instaRef}
            tooltip={true}
            tooltipContent="We use this to to give you bonus chances when you share with friends" />

          <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center', zIndex: 5, width: '100%' }}>
            <InputField
              autoCapitalize="words"
              style={{ width: '65%' }}
              label="City"
              value={_city} 
              onChangeText={(text) => { setCity(text) }}
              onSubmitEditing={() => passwordRef.current.focus()}
              ref={cityRef}/>
            <Dropdown
              options={us_states}
              placeholder="State"
              setValue={set_us_state} />
          </View>

          {(_oauth) ? null : <View><InputField
            label="Password"
            value={_password}
            onChangeText={(text) => { setPassword(text) }}
            onSubmitEditing={() => confirmPasswordRef.current.focus()}
            ref={passwordRef}
            required
            password />
            <InputField
              label="Confirm Password"
              value={_confirm}
              onChangeText={(text) => { setConfirm(text) }}
              onSubmitEditing={() => referralRef.current.focus()}
              ref={confirmPasswordRef}
              required
              password /></View>}

          <InputField
            label="Referral Code"
            value={_ref}
            ref={referralRef}
            returnKeyType='done'
            onChangeText={(text) => { setRef(text) }} 
            onSubmitEditing={() => Keyboard.dismiss()}/>

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
              let isError = await generateErrors()
              setState({ businessAccount: state.businessAccount, futureDrawings: state.futureDrawings, agreement: state.agreement, signedUp: true })
              if (!isError) {
                let postErrors = await checkValid()
                if (!postErrors) {
                  sendsms()
                  const data = makeJSON()
                  const rUser = await getRefUser()
                  console.log('DATA-------------')
                  console.log(data)
                  console.log('\nDATA.HOST_ITEM-------------')
                  console.log(JSON.parse(data).host_item)
                  navigation.navigate('PhoneVerify', { signup: data, mailing: state.futureDrawings, phone: _phoneNumber, email: _email })
                }
              }
            }} />
          {state.signedUp && _errors.length == 0 ? <Text>Signing Up...</Text> : null}
        </View>
      </KeyboardAwareScrollView>
    </ScrollView>

  );
}
