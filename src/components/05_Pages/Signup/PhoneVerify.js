import React, { useState, useEffect } from 'react'
import {  View, Text, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { fonts, utilities, dimensions } from '../../../settings/all_settings';
import InputField from '../../02_Molecules/InputField/InputField';
import BlockButton from '../../01_Atoms/Buttons/BlockButton/BlockButton'

export default function PhoneVerify({ navigation, route }) {
    const data = require('../../IP_ADDRESS.json');

    const [_errors, setErrors] = useState([])
    const [_code, setCode] = useState(null)

    const styles = StyleSheet.create({
        header: {
          fontSize: 16,
          marginBottom: 30,
          width: 300
        }
    });

      // posts user to database
    const postUser = async () => {
        const response = await fetch('http://' + data.ipAddress + '/user/signup/', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: route.params.signup
        })
        const json = await response.json()
        //console.log(json)
        return json
    }

    const mailingList = async () => {
        var bearer = 'Bearer ' + data.sendGrid;
        const response = await fetch('https://api.sendgrid.com/v3/marketing/contacts', {
          method: "PUT",
          withCredentials: true,
          credentials: 'include',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": bearer
          },
          body: emailJSON()
        })
        const json = await response.json()
        console.log(json)
        return json
      }

    const verifysms = async () => {
        const response = await fetch('http://'+data.ipAddress+'/user/verifyphone',{
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },  
          body: phoneJSON()
        })
        const json = await response.json()
        //console.log(json)
        return json
    }

    const emailJSON = () => {
        //console.log(data)
        let data = {
          contacts: [
            {
              email: route.params.email
            }
          ]
        }
        return JSON.stringify(data)
      };

    const phoneJSON = () => {
        let data = 
            {
              phoneNumber: route.params.phone,
              code: _code
            }
        return JSON.stringify(data)
      };
    

    return (
        <ScrollView contentContainerStyle={utilities.scrollview}>
        <View style={utilities.flexCenter}>
            <Text style={[styles.header,{width: '90%'}]}>Enter the verification code that was sent to your phone</Text>
            <InputField           textContentType="numeric"
label="Verification Code" onChangeText={(text) => {
                setCode(text)}}/>
            <View style={{width: '90%', marginTop: 5, marginBottom: 5}}>
                {_errors}
            </View>
            <BlockButton 
                title="SIGN UP"
                color="primary"
                onPress={async () => {
                    let coderes = await verifysms()
                    if (coderes.done !== "correct code") {
                        setErrors(<Text style={fonts.error}>Invalid Code</Text>)
                    }
                    else {
                        const userObj = await postUser()
                        if (userObj.keyValue == null) {
                            console.log("signed up")
                            if (route.params.mailing) {
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
                        }
                    }
                }}
            />
        </View>
        </ScrollView>
    );
}
