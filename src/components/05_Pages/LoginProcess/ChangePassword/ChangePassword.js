import React, {useState} from 'react';
import {  View, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import BlockButton from '../../../01_Atoms/Buttons/BlockButton/BlockButton';
import InputField from '../../../02_Molecules/InputField/InputField.js';
import TextLink from '../../../01_Atoms/Buttons/TextLinks/TextLinks';
import { utilities, fonts } from '../../../../settings/all_settings';

export default function ChangePassword({ navigation, route }) {

  const ipaddr = require('../../../IP_ADDRESS.json');

  const userid = route.params._id;

  const [_password, setPassword] = useState(null)
  const [_confirm, setConfirm] = useState(null)
  const [_errors, setErrors] = useState([])

  const generateErrors = () => {
    let errors = []
    // if passwords don't match
    if (_password != _confirm){
      errors.push(<Text style={fonts.error}>Passwords do not match</Text>)
    }
    setErrors(errors)
    if (errors.length > 0) return true
    return false
  }

  const changePW = async () => {
    const response = await fetch('https://8f5d9a32.us-south.apigw.appdomain.cloud/users/edit',{
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },  
      body: makeJSON()
    })
    let json = await response.json()
    json = json.user
    return json
  }

  const makeJSON = () => {
    let data = {
      password: _password
    }
    data["id"] = userid
    return JSON.stringify(data)
  }

  return (
    <ScrollView contentContainerStyle={utilities.scrollview}>
    <View style={utilities.flexCenter}>
      <InputField 
        label="New Password" 
        onChangeText={(text) => {setPassword(text)}}
        required 
        password/>
      <InputField 
        label="Confirm Password" 
        onChangeText={(text) => {setConfirm(text)}}
        required 
        password/>
    {_errors}
    {/* TODO: Click to redirect to login and display green banner */}
      <BlockButton 
        title="UPDATE PASSWORD" 
        color="primary"
        onPress={() => navigation.navigate('Login', { reset: true })}
        onPress={async () => {
          if (!generateErrors()) {
            const userObj = await changePW()
            if (userObj.error == null) {
              navigation.navigate('Login', { reset: true })
            } else {
              let errors = []
              errors.push(<Text style={fonts.error}>Password is not valid</Text>)
              setErrors(errors)
            }
          }
        }}
      />
    </View>
    </ScrollView>
  );
}