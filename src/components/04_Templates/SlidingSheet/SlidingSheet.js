import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, TextInput, ScrollView, Picker, Animated, Alert, Dimensions } from 'react-native'
import { Icon } from 'react-native-elements'
import CheckBox from '../../02_Molecules/Checkbox/Checkbox'
import DropDownPicker from 'react-native-dropdown-picker';
import SwipeButton from '../../01_Atoms/Buttons/SwipeButton/SwipeButton';

import { utilities, fonts } from '../../../settings/all_settings';

// https://www.npmjs.com/package/react-native-dropdown-picker
import DropDown from '../../../components/01_Atoms/DropDown/DropDown';
import BlockButton from '../../../components/01_Atoms/Buttons/BlockButton/BlockButton';

import styles from './SlidingSheet.styles';
// https://github.com/alinz/react-native-dropdown
// import {option, select} from 'react-native-dropdown'
import Stripe from '../../05_Pages/Account/Wallet/Stripe'
import { setStatusBarTranslucent } from 'expo-status-bar';
import { user_logged_in } from '../../../functions/user_functions';


// Sliding Sheet update: Removed visible prop, since the sheet will be invisible after sliding off the screen.
function SlidingSheet(props) {
  const [last4, setlast4] = useState(null)
  const data = require('../../IP_ADDRESS.json')

  const [stripe, setStripe] = useState(true)
  const [_method, setMethod] = useState(null)
  const [_amount, setAmount] = useState(null)
  const [_save, setSave] = useState(false)
  const [_walletBalance, setWalletBalance] = useState(0)
  const [refresh, setRefresh] = useState(true)


  useEffect(() => {
    async function getLast4() {
      let response = await fetch('http://' + data.ipAddress + '/user/id/' + props.user._id)
      response = await response.json()
      if (Object.keys(response).includes('last4')) {
        setlast4(response.last4)
      }
      setWalletBalance(response.walletChances)
    }
    getLast4()

  }, [_method, _amount])

  // useEffect(() => {
  //   if (props.amount) {
  //     setAmount(props.amount)
  //   }
  // }, [props.amount])

  const [bounceValue, setBounceValue] = useState(new Animated.Value(1000)); // initial position of sheet (1000 is at the bottom)

  let options1 = []
  if (last4 !== null) {
    options1.push('**** **** **** ' + last4)
    options1.push('Paypal')
    if (!props.wallet) {
      options1.push('Wallet Chances')
    }
  } else {
    options1.push('+ Add Credit Card')
    options1.push('Paypal')
    if (!props.wallet) {
      options1.push('Wallet Chances')
    }
  }
  let options2 = ['$5 = 10 chances', '$10 = 40 chances', '$20 = 50 chances', '$50 = 150 chances', '$100 = 400 chances', '$250 = 1100 chances']

  let slidingStyle = [styles.subView];
  slidingStyle.push({ height: props.height });

  var toValue = 1000;
  const toggleSheet = () => {

    Animated.spring(
      bounceValue, {
      toValue: toValue,
      velocity: 3,
      tension: 2,
      friction: 8,
      useNativeDriver: true
    }).start();

  };

  if (props.sheet) {
    toValue = 0;
    toggleSheet();
  } else {
    null;
  }

  // close this sliding sheet
  const closeSlidingSheet = () => {
    toValue = 1000;
    toggleSheet();
    props.trigger();
  }

  // console.log('AMOUNT DOLLAR: ', props.amountDollar); // 5, 10, 20, 50, 100, 250

  // console.log(props.sheet); 101010
  // TODO: Add a dropdown/button for stripe and apple pay
  return (
    <View style={styles.container}>
      <Animated.View
        style={[slidingStyle,
          { transform: [{ translateY: bounceValue }] }]}>

        <View style={styles.container}>
          {stripe ?
            <View style={styles.slidingSheet}>
              {/* Title part with a close button */}
              <View style={styles.slidingSheet__header}>
                <TouchableOpacity onPress={() => closeSlidingSheet()}>
                  <Icon name='close' />
                </TouchableOpacity>
                <Text style={fonts.h1}>{props.title}</Text>
                <View />
              </View>

              <View style={[styles.slidingSheet__content, { zIndex: 2 }]}>
                <Text style={styles.slidingSheet__content_text}>{props.content[1]}</Text>
                <DropDown
                  // placeholder={"PICK A PAYMENT METHOD"}
                  options={options1}
                  size='large'
                  setValue={setMethod}
                />
              </View>

              <View style={[styles.slidingSheet__content, { zIndex: 1 }]}>
                <Text style={styles.slidingSheet__content_text}>{props.content[2]}</Text>
                <DropDown
                  // placeholder={'PICK A RELOAD AMOUNT'}
                  options={options2}
                  size='large'
                  setValue={setAmount}
                />
              </View>

              {/* NEW SWIPE BUTTON */}
              <View style={{ alignItems: 'center', width: '100%' }}>

              <SwipeButton title="SWIPE TO SUBMIT" onSwipeSuccess={() => {
                  // setRefresh(!refresh)
                  console.log('----THIS SWIPES------')
                  // console.log('walletBalance', _walletBalance)
                  console.log('method', _method)
                  console.log('amount', _amount)
                  if (_method !== null) {
                    setStripe(false) // joshua made false mean that stripe appears -.-
                  }
                }} />
              </View>
                {/* <Text>METHOD {_method ? _method : 'null'}</Text>
                <Text>AMOUNT {_amount ? _amount : 'null'}</Text> */}

              {/* <BlockButton
                  color="primary"
                  title="test"
                  onPress={() => {
                    // console.log('walletBalance',_walletBalance)
                    console.log('method', _method)
                    console.log('amount', _amount)
                  }} />  */}


            </View> : <Stripe user={props.user} setUser={props.setUser} navigation={props.navigation} method={_method} amount={_amount} save={_save} wallet={props.wallet}></Stripe>}
        </View>

      </Animated.View>
    </View>
  )
}

export default SlidingSheet;
