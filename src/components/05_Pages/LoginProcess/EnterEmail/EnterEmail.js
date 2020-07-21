import React, {useState} from 'react';
import {  View, Text, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import BlockButton from '../../../01_Atoms/Buttons/BlockButton/BlockButton';
import InputField from '../../../02_Molecules/InputField/InputField.js';
import { fonts, utilities, dimensions } from '../../../../settings/all_settings';
import TextLink from '../../../01_Atoms/Buttons/TextLinks/TextLinks';
import validator from 'validator';

export default function EnterEmail({ navigation }) {

  // Chelly don't kill me. I don't wanna make a file for this one line :(
  const styles = StyleSheet.create({
    header: {
      fontSize: 16,
      marginBottom: 30,
      width: 300
    }
  });

  const [_email, setEmail] = useState(null)
  const [_code, setCode] = useState(null)
  const [_errors, setErrors] = useState([])
  const [_sent, setSent] = useState(false)

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

  const ipaddr = require('../../../IP_ADDRESS.json');

  const emailcode = async () => {
    const response = await fetch('http://'+ipaddr.ipAddress+':3000/user/sendcode',{
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

  const verification = async () => {
    const response = await fetch('http://'+ipaddr.ipAddress+':3000/user/verifycode',{
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

  // makes a json object with all the input fields
  const makeJSON = () => {
    let data = {
      email: _email,
      code: _code
    }
    return JSON.stringify(data)
  }

  return (
    <ScrollView contentContainerStyle={utilities.scrollview}>
    <View style={utilities.flexCenter}>
      <Text style={styles.header}>{_sent ? 'Enter your email so we can send you a verification code' : 'Enter the verification code that was sent to your email'}</Text>
      <InputField label="Email" onChangeText={(text) => {
        setEmail(text)}}/>
      {_sent && <InputField label="Verification Code" onChangeText={(text) => {
        setCode(text)}}/>}
      {_errors}
      <BlockButton 
        title={_sent ? "VERIFY CODE" : "SEND CODE" }
        color="primary"
        onPress={async () => {
          if (!generateErrors()) {
            let coderes = null
            if (_sent) {
              coderes = await verification()
            } else {
              coderes = await emailcode()
            }

            // Email was sent out successfully
            if (coderes.done == "email sent") {setSent(true)} 
            else if (coderes.done == "correct code") {navigation.navigate('ChangePassword', { _id: coderes._id })}
            else if (coderes.hasOwnProperty('error')) {
              let errors = []
              errors.push(<Text style={fonts.error}>{coderes.error}</Text>)
              setErrors(errors)
            }
            else {
              let errors = []
              errors.push(<Text style={fonts.error}>An error occured. Please try again later.</Text>)
              setErrors(errors)
            }
          }
        }}
        />
        {_sent && <TextLink
          title="Resend Code"
          style={fonts.link}
          onPress={async () => {
            if (!generateErrors()) {
              const coderes = await emailcode()
          
              // Email was sent out successfully
              if (coderes.done == "email sent") {setSent(true)} 
              else if (coderes.hasOwnProperty('error')) {
                let errors = []
                errors.push(<Text style={fonts.error}>{coderes.error}</Text>)
                setErrors(errors)
              }
              else {
                let errors = []
                errors.push(<Text style={fonts.error}>An error occured. Please try again later.</Text>)
                setErrors(errors)
              }
            }
          }}
        />}
    </View>
    </ScrollView>
  );
}