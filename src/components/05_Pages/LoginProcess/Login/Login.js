import React, { useState, useContext, useRef } from 'react';
import { View, Text, Linking, Dimensions, AsyncStorage, Keyboard } from 'react-native';
import BlockButton from '../../../01_Atoms/Buttons/BlockButton/BlockButton';
import Divider from '../../../01_Atoms/Divider/Divider.js';
import InputField from '../../../02_Molecules/InputField/InputField.js';
import TextLink from '../../../01_Atoms/Buttons/TextLinks/TextLinks';
import Banner from '../../../01_Atoms/Banner/Banner.js';
import users, { get_user } from '../..//../fake_users/stub-users'
import { fonts, utilities } from '../../../../settings/all_settings';
import { styles } from '../../../01_Atoms/Buttons/BlockButton/BlockButton.styling';
import { ScrollView } from 'react-native-gesture-handler';
import validator from 'validator'
import GlobalState from '../../../globalState'
import * as Google from 'expo-google-app-auth';
import * as Facebook from 'expo-facebook';

export default function Login({ navigation, route }) {
  const { user, setUser } = useContext(GlobalState)
  const [buttonText, setButtonText] = useState('LOG IN')

  const data = require('../../../IP_ADDRESS.json');
  const loginUser = async () => {
    const response = await fetch('http://' + data.ipAddress + '/user/login', {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: makeJSON()
    })
    const json = await response.json()
    return json
  }

  // states for each input value
  const [_email, setEmail] = useState(null)
  const [_password, setPassword] = useState(null)
  const [_errors, setErrors] = useState([])

  // for going to the next text input
  const passwordRef = useRef()

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
      <View style={[utilities.flexCenter, { justifyContent: 'flex-start', paddingTop: '10%' }]}>
        {route.params.reset && <Banner
          color="green"
          title="Your password has been updated!" />}
        {route.params.signedUp && <Banner
          color="green"
          title="You have successfully signed up!" />}
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
                  console.log(result)
                  setEmail(result.email)
                  setPassword(result.id)
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
                  setEmail(result.user.email)
                  setPassword(result.user.id)
                } else {
                  return { cancelled: true };
                }
              } catch (e) {
                return { error: true };
              }
            }}
          />
        </View>

        <View style={{ marginVertical: '2.5%', alignItems: 'center' }}>
          <Divider />
        </View>

        <InputField label="Email"
          value={_email}
          textContentType="emailAddress"
          keyboardType="email-address"
          onChangeText={(text) => { setEmail(text) }}
          onSubmitEditing={() => passwordRef.current.focus()}
        />

        <InputField label="Password"
          value={_password}
          password
          onChangeText={(text) => { setPassword(text) }}
          onSubmitEditing={() => Keyboard.dismiss()}
          returnKeyType='done'
          ref={passwordRef} />
        {/* DONE: Links to Forgot Password (no forgot password currently, button is not functional) */}
        {/* Added redirect to EnterEmail */}
        <View style={[utilities.flexEndX, { width: '80%' }]}>
          <TextLink
            title="Forgot Password?"
            style={fonts.link}
            onPress={() => navigation.navigate('EnterEmail')} />
        </View>

        {/* if some input field is invalid, a red error message will pop up */}
        {_errors}

        {/* TODO: Links to Home (no home page currently, button is not functional) */}
        <BlockButton
          title={buttonText}
          color="secondary"
          disabled={buttonText == "LOGGING IN..."}
          onPress={async () => {
            if (!generateErrors()) {
              setButtonText("LOGGING IN...")
              const userObj = await loginUser()
              if (userObj.error == null) {
                setUser(userObj)
                await AsyncStorage.setItem('user', userObj._id)
                if (userObj.email === 'admin@admin.com') {
                  // console.log(userObj)
                  navigation.navigate('AdminHome')
                  setButtonText("LOG IN")
                } else {
                  navigation.navigate('Home')
                  setButtonText("LOG IN")
                }
                {/* TODO: Comment out for the sake of convenience. At the end of the day modify plz.
                 {/* https://stackoverflow.com/questions/42831685/disable-back-button-in-react-navigation}
              navigation.reset({
                index: 0,
                // routes: [{ name: 'HowItWorks' }],
                actions: [navigation.navigate('HowItWorks', {fromLogin: true})]}) */}
              } else {
                let errors = []
                errors.push(<Text style={fonts.error}>Password is not valid</Text>)
                setErrors(errors)
              }
            }
          }} />
      </View>
    </ScrollView>
  );
}
