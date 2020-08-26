import React, { useState, useEffect } from 'react'
import {  View, Text, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { fonts, utilities, dimensions } from '../../../settings/all_settings';
import InputField from '../../02_Molecules/InputField/InputField';
import BlockButton from '../../01_Atoms/Buttons/BlockButton/BlockButton'
import TextLink from '../../01_Atoms/Buttons/TextLinks/TextLinks';
import { ImageZoomProps } from 'react-native-image-pan-zoom';

export default function PhoneVerify({ navigation, route }) {
    const data = require('../../IP_ADDRESS.json');

    const [_errors, setErrors] = useState([])
    const [_code, setCode] = useState(null)
    const [_timeLeft, setTimeLeft] = useState(0);

    useEffect(() => {
      // exit early when we reach 0
      if (!_timeLeft) return;
  
      // save intervalId to clear the interval when the
      // component re-renders
      const intervalId = setInterval(() => {
        setTimeLeft(_timeLeft - 1);
      }, 1000);
  
      // clear interval on re-render to avoid memory leaks
      return () => clearInterval(intervalId);
      // add timeLeft as a dependency to re-rerun the effect
      // when we update it
    }, [_timeLeft]);

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
        // add referral code
        if (route.params.refUser === undefined) {
          return json
        } else {
          // add 5 to signing up user
          console.log('http://' + data.ipAddress + '/user/edit/' + json._id)
          const first = await fetch('http://' + data.ipAddress + '/user/edit/' + json._id, {
          method: "PATCH",
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({"walletChances": 5})
          })
          

          // get refUser
          const second = await fetch('http://' + data.ipAddress + '/user/id/' + route.params.refUser)
          const secondJson = await second.json()
          let prevWalletChances = secondJson.walletChances

          const third = await fetch('http://' + data.ipAddress + '/user/edit/' + route.params.refUser, {
          method: "PATCH",
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({"walletChances": 5 + prevWalletChances})
          })
        }
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

    const sendsms = async () => {
        const response = await fetch('https://verify-sample-2928-dev.twil.io/start-verify', {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: phoneJSON()
        })
      }

    const verifysms = async () => {
        const response = await fetch('https://verify-sample-2928-dev.twil.io/check-verify',{
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
              to: '+1'+route.params.phone,
              channel: "sms",
              verification_code: _code
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
                    if (coderes.message !== "Verification success.") {
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
                            // this is unnecessary
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
            {(_timeLeft === 0) ? <View style={{flexDirection: 'row'}}>
              <Text style={fonts.p}>Don't see a code?</Text>
              <TextLink
                title="Send it again."
                style={fonts.link}
                onPress={() => {
                  setTimeLeft(30)
                  sendsms()
                }}/>
            </View> : <Text style={fonts.p}>Try again in {_timeLeft}</Text>}
        </View>
        </ScrollView>
    );
}
