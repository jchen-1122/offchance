import React, {useState, useContext} from 'react';
import {  View, Text, Linking, Dimensions, AsyncStorage } from 'react-native';
import * as Facebook from 'expo-facebook';
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
import GlobalState from '../../../globalState'

export default function Login({ navigation, route }) {
  const {user, setUser} = useContext(GlobalState)

  const data = require('../../../IP_ADDRESS.json');
  const loginUser = async () => {
    const response = await fetch('http://'+data.ipAddress+'/user/login',{
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

  const AWS = require('aws-sdk');

  AWS.config = new AWS.Config({
      accessKeyId: 'da62c56fb48940a7aada0c86062cf9a6',
      secretAccessKey: '34b18fbbeb724fe1e06a8e0d0210cd65f7f690db566eb1d6',
      endpoint: 's3.us-east.cloud-object-storage.appdomain.cloud',
      region: 'us-east-standard'
  });

  const cosClient = new AWS.S3();

  const logIn = async () => {
    /*var config = {
        endpoint: 's3.us-east.cloud-object-storage.appdomain.cloud',
        apiKeyId: 'rxdAivtC9jqXmqEPgYWsCYgq3l33AYRrS49qhyFpiab7',
        accessKeyId: 'da62c56fb48940a7aada0c86062cf9a6',
        secretAccessKey: '34b18fbbeb724fe1e06a8e0d0210cd65f7f690db566eb1d6',
        serviceInstanceId: 'crn:v1:bluemix:public:cloud-object-storage:global:a/ae9cc34bfa8043b0bf6ecd16583c8c5a:fffd9c25-4061-49e1-a321-e1fa4469e5f4::',
    };*/

    return cosClient.listObjects(
      {Bucket: 'oc-mobile-images'},
    ).promise()
    .then((data) => {
        if (data != null && data.Contents != null) {
            for (var i = 0; i < data.Contents.length; i++) {
                var itemKey = data.Contents[i].Key;
                var itemSize = data.Contents[i].Size;
                console.log(`Item: ${itemKey} (${itemSize} bytes).`)
            }
        }    
    })
    .catch((e) => {
        console.error(`ERROR: ${e.code} - ${e.message}\n`);
    });

    /*try {
      await Facebook.initializeAsync(2031545587174254);
      const {
        type,
        token,
        expires,
        permissions,
        declinedPermissions,
      } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile','email'],
      });
      if (type === 'success') {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
        const result = await response.json()
        console.log(permissions)
        console.log(declinedPermissions)
        console.log(result)
        alert("logged in as " + result.name)
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }*/
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
    <View style={[utilities.flexCenter,{justifyContent: 'flex-start', paddingTop: '10%'}]}>
    {route.params.reset && <Banner
        color="green"
        title="Your password has been updated!" />}
    {route.params.signedUp && <Banner
        color="green"
        title="You have successfully signed up!" />}
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <BlockButton
            color="facebook"
            title="Facebook"
            onPress={async () => {
              logIn()
            }}
            style={{margin: 0, marginRight: 7.5}}/>
        <BlockButton
            color="google"
            title="Google"
            style={{margin: 0, marginLeft: 7.5}}/>
        </View>

        <View style={{marginVertical: '2.5%', alignItems: 'center'}}>
        <Divider />
        </View>

      <InputField label="Email" onChangeText={(text) => {
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
        color="secondary"
        onPress={async () => {
          if (!generateErrors()) {
            const userObj = await loginUser()
            if (userObj.error == null) {
              setUser(userObj)
              await AsyncStorage.setItem('user', userObj._id)
              navigation.navigate('Home')
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
        }}/>
    </View>
    </ScrollView>
  );
}
