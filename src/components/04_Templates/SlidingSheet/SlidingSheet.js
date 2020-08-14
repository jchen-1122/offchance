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
  }, [])

  useEffect(() => {
    if (props.amount) {
      setAmount(props.amount)
    }
  }, [props.amount])

  async function subtractWallet() {
    // console.log('HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH')
    const response = await fetch('http://' + data.ipAddress + '/user/edit/' + props.user._id, {
      method: "PATCH",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ walletChances: _walletBalance - props.chances })
    })
    const json = await response.json()

    return json
  }

  // update user for entered users in the backend
  async function enterUserinRaffle() {
    // append to user schema
    // if first entered raffle
    let currEntered;
    if (!Object.keys(props.user).includes('rafflesEntered') || props.user.rafflesEntered.children.length === 0) {
      currEntered = { children: [makeEntetedRaffleSchemaJSON(0, 0)] }
    } else {
      currEntered = props.user.rafflesEntered.children
      let oldamount = 0;
      let oldchances = 0;
      for (var i = 0; i < currEntered.length; i++) {
        if (currEntered[i].raffleID === props.raffleid && currEntered[i].sizeType === props.sizeType && currEntered[i].size === props.size) {
          oldamount = currEntered[i].amountDonated
          oldchances = currEntered[i].chances
          currEntered.splice(i, 1)
        }
      }
      currEntered.push(makeEntetedRaffleSchemaJSON(oldamount, oldchances))
      currEntered = { children: currEntered }
    }

    let walletFinal = _walletBalance
    if (_method === "Wallet Chances") {
      walletFinal = _walletBalance - props.chances
    }
    let enteredRaffle = await fetch('http://' + data.ipAddress + '/user/edit/' + props.user._id, {
      method: "PATCH",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ rafflesEntered: currEntered, walletChances: walletFinal })
    })
    enteredRaffle = await enteredRaffle.json()
    return enteredRaffle
  }

  const makeEntetedRaffleSchemaJSON = (oldamount, oldchances) => {
    return {
      raffleID: props.raffleid,
      amountDonated: oldamount + props.amountDollar,
      chances: oldchances + props.chances,
      sizeType: props.sizeType,
      size: props.size,
      timeDonated: Math.floor(Date.now() / 1000)
    }
  }

  // update users, amountRaised, lastDonatedTo in raffle schema (backend)
  // how it works: https://www.youtube.com/watch?v=dQw4w9WgXcQ
  async function updateRaffle() {

    // get raffle object
    let raffle = await fetch('http://' + data.ipAddress + '/raffle/id/' + props.raffleid)
    raffle = await raffle.json()

    // update users
    let currEntered;
    if (!Object.keys(raffle).includes('users') || raffle.users.children.length === 0) {
      currEntered = { children: [makeRaffleJSON(0, 0)] }
    } else {
      currEntered = raffle.users.children
      let oldamount = 0;
      let oldchances = 0;
      for (var i = 0; i < currEntered.length; i++) {
        if (currEntered[i].userID === props.user._id && currEntered[i].sizeType === props.sizeType && currEntered[i].size === props.size) {
          oldamount = currEntered[i].amountDonated
          oldchances = currEntered[i].chances
          currEntered.splice(i, 1)
        }
      }
      currEntered.push(makeRaffleJSON(oldamount, oldchances))
      currEntered = { children: currEntered }
    }
    // update amountRaised
    let amountRaised = raffle.amountRaised
    amountRaised += props.amountDollar
    console.log(amountRaised)

    // update lastDonatedTo
    let timeNow = Math.floor(Date.now() / 1000)

    let updatedRaffle = await fetch('http://' + data.ipAddress + '/raffle/edit/' + props.raffleid, {
      method: "PATCH",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ users: currEntered, amountRaised: amountRaised, lastDonatedTo: timeNow })
    })
  }

  const makeRaffleJSON = (oldamount, oldchances) => {
    return {
      userID: props.user._id,
      amountDonated: oldamount + props.amountDollar,
      chances: oldchances + props.chances,
      sizeType: props.sizeType,
      size: props.size,
      timeDonated: Math.floor(Date.now() / 1000)
    }
  }


  const [value, onChangeText] = React.useState('');
  const [selectedValue, setSelectedValue] = useState("**** **** **** 1234");
  // const [sheetOpen, setSheetOpen] = useState(true); // isHidden
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

  const [stripe, setStripe] = useState(true)
  const [_method, setMethod] = useState(null)
  const [_amount, setAmount] = useState('$5 = 10 chances')
  const [_save, setSave] = useState(false)
  const [_buttonText, setButtonText] = useState("CONFIRM PAYMENT")
  const [_walletBalance, setWalletBalance] = useState(0)

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

  // summon payment page
  const payMe = () => {
    closeSlidingSheet();
    props.paymentTrigger();
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
            <ScrollView style={styles.slidingSheet} showsVerticalScrollIndicator={false}>
              {/* Title part with a close button */}
              <View style={styles.slidingSheet__header}>
                <TouchableOpacity onPress={() => closeSlidingSheet()}>
                  <Icon name='close' />
                </TouchableOpacity>
                <Text style={fonts.h1}>{props.title}</Text>
                <View />
              </View>
              <View style={styles.slidingSheet__save} >
                {(props.sizeType === "notselected") ?
                  <Text style={{ color: 'red', }}> *Please select a size type </Text>
                  : null}

                {(props.size === "notselected") ?
                  <Text style={{ color: 'red' }}> *Please select a size </Text>
                  : null}

                <Text style={{ color: 'red' }}>{(_method === "Wallet Chances" && props.user.walletChances - props.chances < 0) ? "*You do not have enough chances in your wallet" : ""}</Text>
              </View>

              {/* content part - with a text input */}
              {/* <View style={styles.slidingSheet__content}>
                        <Text style={styles.slidingSheet__content_text}>{props.content[0]}</Text>
                        <TextInput
                          style={{ height: 40, lineHeight: 23, }}
                          placeholder='Enter here'
                          onChangeText={text => onChangeText(text)}
                          value={value}
                        />
                    </View> */}

              <View style={[styles.slidingSheet__content, { zIndex: 2 }]}>
                <Text style={styles.slidingSheet__content_text}>{props.content[1]}</Text>
                <DropDown
                  placeholder={"PICK A PAYMENT METHOD"}
                  options={options1}
                  size='large'
                  arrowSize={18}
                  isVisible={false}
                  setValue={setMethod}
                />
              </View>

              {(_method === "Wallet Chances") ?
                <View style={styles.slidingSheet__save}>
                  <Text style={[styles.slidingSheet__content__text]}>{"Current " + props.content[0]}</Text>
                  <Text style={{ marginTop: 5 }}>{_walletBalance}</Text>
                </View>

                :

                <View style={[styles.slidingSheet__content, { zIndex: 1 }]}>
                  <Text style={styles.slidingSheet__content_text}>{props.content[2]}</Text>
                  <DropDown
                    placeholder={_amount}
                    options={options2}
                    size='large'
                    arrowSize={18}
                    isVisible={false}
                    setValue={setAmount}
                  />
                </View>}

              {(_method === '+ Add Credit Card') ? <View style={[styles.slidingSheet__save]}>
                <CheckBox
                  selected={_save}
                  onPress={() => setSave(!_save)}
                  text='Save my payment information'
                />
              </View> : null}

              {/* NEW SWIPE BUTTON */}
              <View style={{ alignItems: 'center', width: '100%' }}>
                <SwipeButton title="SWIPE TO CONFIRM" onSwipeSuccess={() => {
                  if (_method !== null) {
                    setStripe(false) // joshua made false mean that stripe appears -.-
                  }
                }} />
              </View>

              {/* <View style={styles.button}>
                {(props.wallet) ?
                  <BlockButton
                    title={_buttonText}
                    color="primary"
                    onPress={() => {
                      if (_buttonText === "CONFIRM PAYMENT" && _method !== null) {
                        setButtonText("ADD CHANCES")
                      } else if (_buttonText !== "CONFIRM PAYMENT" && _method !== null) {
                        setButtonText("CONFIRM PAYMENT")
                        setStripe(false) // if its false, stripe shows up
                      }
                    }}
                  /> :
                  // for drawings
                  <BlockButton
                    title={_buttonText}
                    color="primary"
                    onPress={async () => {
                      // keep this if statement, if they have enough chances -> update user
                      if (_buttonText === "CONFIRM PAYMENT" && _method !== null && props.sizeType !== "notselected" && props.size !== "notselected") {
                        if (_method === "Wallet Chances" && props.user.walletChances - props.chances < 0) {
                          setButtonText("CONFIRM PAYMENT")
                        } else {
                          setButtonText("ENTER DRAWING")
                        }
                      } else if (_buttonText !== "CONFIRM PAYMENT" && _method !== null) {
                        let updatedUser = await enterUserinRaffle()
                        props.setUser(updatedUser)
                        await updateRaffle()
                        if (_method === "Wallet Chances") {
                          setButtonText("CONFIRM PAYMENT")
                          props.navigation.navigate("Success", { fromRaffle: props.chances })
                        } else {
                          setButtonText("CONFIRM PAYMENT")
                          setStripe(false)
                        }
                      }
                    }}
                  />
                }
              </View> */}

            </ScrollView> : <Stripe user={props.user} setUser={props.setUser} navigation={props.navigation} method={_method} amount={_amount} save={_save} wallet={props.wallet}></Stripe>}
        </View>

      </Animated.View>
    </View>
  )
}

export default SlidingSheet;
