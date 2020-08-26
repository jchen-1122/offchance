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

//create your forceUpdate hook
function useForceUpdate() {
  const [value, setValue] = useState(0); // integer state
  return () => setValue(value => ++value); // update the state to force render
}

// Sliding Sheet update: Removed visible prop, since the sheet will be invisible after sliding off the screen.
function OverlaySheet(props) {
  const forceUpdate = useForceUpdate();

  const [stripe, setStripe] = useState(true)
  const [_method, setMethod] = useState(null)
  const [_amount, setAmount] = useState('$5 = 10 chances')
  const [_save, setSave] = useState(false)
  const [_deleted, setDeleted] = useState(false)
  const [last4, setlast4] = useState(null)
  const [brand, setBrand] = useState(null)

  // Update 8/22 for weird overviewsheet
  const [overlayStyle, setOverlayStyle] = useState([styles.OverlaySheet]);


  const data = require('../../IP_ADDRESS.json')
  useEffect(() => {
    async function getLast4() {
      let response = await fetch('http://' + data.ipAddress + '/user/id/' + props.user._id)
      response = await response.json()
      if (Object.keys(response).includes('last4')) {
        setlast4(response.last4)
        setBrand(response.brand)
      }
      setWalletBalance(response.walletChances)
    }
    getLast4()
  }, [overlayStyle])


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
      let tempCurr = []
      let existed = false
      for (var i = 0; i < currEntered.length; i++) {
        //  && currEntered[i].sizeType === props.sizeType && currEntered[i].size === props.size (different sizes now count as the same entry)
        if (currEntered[i].raffleID === props.raffleid) {
          oldamount = currEntered[i].amountDonated
          oldchances = currEntered[i].chances
          tempCurr.push(makeEntetedRaffleSchemaJSON(oldamount, oldchances))
          existed = true
        } else {
          tempCurr.push(currEntered[i])
        }
      }
      if (!existed) {
        tempCurr.push(makeEntetedRaffleSchemaJSON(0, 0))
      }
      currEntered = { children: tempCurr }
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
      let tempCurr = []
      let existedR = false
      for (var i = 0; i < currEntered.length; i++) {
        //  && currEntered[i].sizeType === props.sizeType && currEntered[i].size === props.size (different sizes now count as the same entry)
        if (currEntered[i].userID === props.user._id) {
          oldamount = currEntered[i].amountDonated
          oldchances = currEntered[i].chances
          tempCurr.push(makeRaffleJSON(oldamount, oldchances))
          existedR = true
        } else {
          tempCurr.push(currEntered[i])
        }
      }
      if (!existedR) {
        tempCurr.push(makeRaffleJSON(0, 0))
      }
      currEntered = { children: tempCurr }
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

  const deleteCreditCard = async () => {
    const data = require('../../IP_ADDRESS.json')
    await fetch('http://' + data.ipAddress + '/user/edit/' + props.user._id, {
      method: "PATCH",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ last4: null, paymentInfo: null })
    })
    setLast4(null)
  }

  // const [sheetOpen, setSheetOpen] = useState(true); // isHidden

  const [visible, setVisible] = useState(false);
  const [sheetController, setSheetController] = useState(true);
  const [_walletBalance, setWalletBalance] = useState(0)
  const [bounceValue, setBounceValue] = useState(new Animated.Value(1000)); // initial position of sheet (1000 is at the bottom)

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

  const toggleOverlay = () => {
    toValue = 1000;
    toggleSheet();
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

  const renderSwipeButton = () => (
    <SwipeButton title="SWIPE TO CONFIRM" onSwipeFailure={() => console.log('failed')} onSwipeSuccess={async () => {
      //console.log('swiped')
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
            props.navigation.navigate("Success", { fromRaffle: props.chances, raffleid: props.raffleid })
          }
        }

        // if using a payment method
        else {
          //console.log(_method)
          // setOverlayStyle(styles.OverlaySheetPay);
          setStripe(false)
          // toggleOverlay();
        }
      }
    }} />
  )
  let slidingStyle = [styles.OverlaySheet];
  slidingStyle.push({ height: props.height });
  return (
    <View>
            {/* <Animated.View
        style={[styles.OverlaySheet,
          { transform: [{ translateY: bounceValue }] }]}> */}
      <Overlay isVisible={visible}
        onBackdropPress={() => { toggleOverlay() }}
        overlayStyle={styles.OverlaySheet}>

        {stripe ?
          <View>
            {/* Title part with a close button */}
            <View style={styles.OverlaySheet__header}>
              <TouchableOpacity onPress={() => { toggleOverlay() }}>
                <Icon name='close' />
              </TouchableOpacity>
              <Text style={fonts.h1}>{props.title}</Text>
              <View />
            </View>

            <View style={styles.OverlaySheet__save}>
              {(props.sizeType === "notselected") ?
                <Text style={{ color: 'red', }}> *Please select a size type </Text>
                : <Text style={{ color: 'green' }}>  Size Type: {props.sizeType} </Text>}

              {(props.size === "notselected") ?
                <Text style={{ color: 'red' }}> *Please select a size </Text>
                : <Text style={{ color: 'green' }}>  Size: {props.size} </Text>}

              <Text style={{ color: 'red' }}>{(_method === "Wallet Chances" && props.user.walletChances - props.chances < 0) ? "*You do not have enough chances in your wallet" : ""}</Text>
            </View>

            <View style={styles.OverlaySheet__content}>
              <Text style={styles.OverlaySheet__content_text}>Payment Method</Text>
              {/* <PaymentButton
                type="applePay"
                onPress={() => setMethod('applepay')}
                selected={_method == 'applepay'} /> */}
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
                // @ JOSHUA - PLS CHANGE WHAT TYPE OF CARD IT IS, TYPES ARE:
                // amex, dinersclub, discover,jcb, maestro, mastercard, unionpay, visa
                <PaymentButton
                  type={brand}
                  last4={last4}
                  selected={_method == ('**** **** **** ' + last4)}
                  onPress={() => setMethod('**** **** **** ' + last4)} />
              }
            </View>

            {(_method === '+ Add Credit Card') ?
              <View style={[styles.OverlaySheet__savepayment]}>
                <CheckBox
                  selected={_save}
                  onPress={() => setSave(!_save)}
                  text='Save my payment information'
                />
              </View> : null}


            <View style={{ alignItems: 'center'}}>
              {(_method !== null) ? renderSwipeButton() : null}
            </View>


          </View> : <Stripe raffleid={props.raffleid} user={props.user} setUser={props.setUser} navigation={props.navigation} method={_method} amount={_amount} save={_save} wallet={props.wallet} entertobuy={Object.keys(props).includes('entertobuy') ? true : false}></Stripe>}
{/* </Animated.View> */}
      </Overlay>
    </View>
  )
}

export default OverlaySheet;
