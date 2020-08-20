import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, TextInput, ScrollView, Picker, Animated, Alert, Dimensions, Image } from 'react-native'
import { Icon, Overlay } from 'react-native-elements'
import CheckBox from '../../02_Molecules/Checkbox/Checkbox'
import SwipeButton from '../../01_Atoms/Buttons/SwipeButton/SwipeButton';

import { utilities, fonts, colors } from '../../../settings/all_settings';

// https://www.npmjs.com/package/react-native-dropdown-picker
import DropDown from '../../../components/01_Atoms/DropDown/DropDown';
import BlockButton from '../../../components/01_Atoms/Buttons/BlockButton/BlockButton';
import PaymentButton from '../../../components/01_Atoms/Buttons/PaymentButton/PaymentButton';
import styles from './OverlaySheet.styles';
// https://github.com/alinz/react-native-dropdown
// import {option, select} from 'react-native-dropdown'
import Stripe from '../../05_Pages/Account/Wallet/Stripe'
import { setStatusBarTranslucent } from 'expo-status-bar';
import { user_logged_in } from '../../../functions/user_functions';


// Sliding Sheet update: Removed visible prop, since the sheet will be invisible after sliding off the screen.
function OverlaySheet(props) {
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
    //console.log(amountRaised)

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
  const [visible, setVisible] = useState(false);
  const [sheetController, setSheetController] = useState(true);

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


  const [stripe, setStripe] = useState(true)
  const [_method, setMethod] = useState(null)
  const [_amount, setAmount] = useState('$5 = 10 chances')
  const [_save, setSave] = useState(false)
  const [_buttonText, setButtonText] = useState("CONFIRM PAYMENT")
  const [_buttonColor, setButtonColor] = useState("confirm")
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

  const toggleOverlay = () => {
    if (!visible) {
      // if not visible, turn visible, set sheetController = false
      setVisible(true);
      setSheetController(false);
    } else {
      // if visible, turn invisible, set sheetController = true
      setVisible(false);
      props.trigger();
      setSheetController(true)
    }
  }


  if (props.sheet && sheetController) {
    toggleOverlay();
  } else {
    null;
  }

  // close this sliding sheet
  const closeSlidingSheet = () => {
    toValue = 1000;
    toggleSheet();
    props.trigger();
  }

  return (
    <View>
      <Overlay isVisible={visible}
        onBackdropPress={() => { toggleOverlay() }}
        overlayStyle={styles.overlay}>

        {stripe ? <View >

          {/* Title part with a close button */}
          <View style={styles.slidingSheet__header}>
            <TouchableOpacity onPress={() => { toggleOverlay() }}>
              <Icon name='close' />
            </TouchableOpacity>
            <Text style={fonts.h1}>{props.title}</Text>
            <View />
          </View>

          <View style={styles.slidingSheet__save}>
            {(props.sizeType === "notselected") ?
              <Text style={{ color: 'red', }}> *Please select a size type </Text>
              : <Text style={{ color: 'green' }}>  Size Type: {props.sizeType} </Text>}

            {(props.size === "notselected") ?
              <Text style={{ color: 'red' }}> *Please select a size </Text>
              : <Text style={{ color: 'green' }}>  Size: {props.size} </Text>}

            <Text style={{ color: 'red' }}>{(_method === "Wallet Chances" && props.user.walletChances - props.chances < 0) ? "*You do not have enough chances in your wallet" : ""}</Text>
          </View>

          <View style={styles.slidingSheet__content}>
            <Text style={styles.slidingSheet__content_text}>Payment Method</Text>
            <PaymentButton
              type="applePay"
              onPress={() => setMethod('applepay')}
              selected={_method == 'applepay'} />
            <PaymentButton
              type="paypal"
              onPress={() => setMethod('Paypal')}
              selected={_method == 'Paypal'} />
            {(!props.wallet) ?
              <BlockButton
                color="light" title={_walletBalance + " Wallet Chances"}
                type="payment"
                selected={_method == "Wallet Chances"}
                disabled={props.user.walletChances - props.chances < 0}
                onPress={() => setMethod('Wallet Chances')}
                style={{ marginVertical: 5 }}
                icon={(<Icon name="wallet" type="material-community" color={colors.darkGreen} style={{ marginRight: 5 }} />)}
              />
              : null
            }

            {(!last4) ?
              <BlockButton
                color="secondary" title="+ Add Credit Card"
                type="payment"
                selected={_method == "+ Add Credit Card"}
                style={{ marginVertical: 5 }}
                onPress={() => setMethod('+ Add Credit Card')} />
              :
              <PaymentButton
                type="visa"
                last4={last4}
                selected={_method == ('**** **** **** ' + last4)}
                onPress={() => setMethod('**** **** **** ' + last4)} />
            }
          </View>

          {(props.type === 2) ? null :
            <View style={[styles.slidingSheet__content, { zIndex: 1 }]}>
              <Text style={styles.slidingSheet__content_text}>Purchase Amount</Text>
              {Object.keys(props).includes('entertobuy') ? <Text style={styles.slidingSheet__content_text}>${props.amountDollar}</Text> : <DropDown
                placeholder={_amount}
                options={options2}
                size='large'
                arrowSize={18}
                isVisible={false}
                setValue={setAmount}
              />}
            </View>}

          {(_method === '+ Add Credit Card') ?
            <View style={[styles.slidingSheet__save]}>
              <CheckBox
                selected={_save}
                onPress={() => setSave(!_save)}
                text='Save my payment information'
              />
            </View> : null}

          <View style={{ alignItems: 'center', width: '100%' }}>
            <BlockButton title="SWIPE TO CONFIRM" color="primary" onPress={async () => {
              // if they've selected a size, sizetype, and payment method
              if (_method !== null && props.entertobuy) {
                setStripe(false)
              } else if (_method !== null && props.sizeType !== "notselected" && props.size !== "notselected") {
                let updatedUser = await enterUserinRaffle()
                props.setUser(updatedUser)
                await updateRaffle()
                // if using wallet chances
                if (_method === "Wallet Chances") {

                  // if they have enough chances
                  if (props.user.walletChances - props.chances > 0) {
                    toggleOverlay();
                    props.navigation.navigate("Success", { fromRaffle: props.chances })
                  }
                }

                // if using a payment method
                else {
                  console.log(_method)
                  setStripe(false)
                  //toggleOverlay();
                }
              }
            }} />
            {/* <SwipeButton title="SWIPE TO CONFIRM" onSwipeSuccess={async() => {
                  // if they've selected a size, sizetype, and payment method
                  if (_method !== null && props.sizeType !== "notselected" && props.size !== "notselected") {

                    // if using wallet chances
                    if (_method === "Wallet Chances"){
                      // if they have enough chances
                      if (props.user.walletChances - props.chances > 0){
                        let updatedUser = await enterUserinRaffle()
                        props.setUser(updatedUser)
                        await updateRaffle()
                        toggleOverlay();
                        props.navigation.navigate("Success", { fromRaffle: props.chances })
                      }
                    }

                    // if using a payment method
                    else {
                      let updatedUser = await enterUserinRaffle()
                      props.setUser(updatedUser)
                      await updateRaffle()
                      toggleOverlay();
                      setStripe(false)
                    }
                  }
                }} /> */}
          </View>

        </View> : <Stripe user={props.user} setUser={props.setUser} navigation={props.navigation} method={_method} amount={_amount} save={_save} wallet={props.wallet} entertobuy={Object.keys(props).includes('entertobuy') ? true : false}></Stripe>}

      </Overlay>
    </View>
  )
}

export default OverlaySheet;
