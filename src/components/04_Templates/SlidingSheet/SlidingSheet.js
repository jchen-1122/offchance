import React, { useState, useEffect, useContext } from 'react'
import { View, Text, TouchableOpacity, TextInput, ScrollView, Picker, Animated, Alert, Dimensions } from 'react-native'
import { Icon } from 'react-native-elements'
import SwipeButton from '../../01_Atoms/Buttons/SwipeButton/SwipeButton';
import GlobalState from '../../globalState';
import { utilities, fonts } from '../../../settings/all_settings';
import DropDown from '../../../components/01_Atoms/DropDown/DropDown';
import BlockButton from '../../../components/01_Atoms/Buttons/BlockButton/BlockButton';
import styles from './SlidingSheet.styles';
import Stripe from '../../05_Pages/Account/Wallet/Stripe';
import PaymentButton from '../../../components/01_Atoms/Buttons/PaymentButton/PaymentButton';

//create your forceUpdate hook
function useForceUpdate() {
  const [value, setValue] = useState(0); // integer state
  return () => setValue(value => ++value); // update the state to force render
}

// Sliding Sheet update: Removed visible prop, since the sheet will be invisible after sliding off the screen.
function SlidingSheet(props) {
  const forceUpdate = useForceUpdate();

  const [stripe, setStripe] = useState(true)
  const [_method, setMethod] = useState(null)
  const [_amount, setAmount] = useState(null)
  const [_save, setSave] = useState(false)
  const [_deleted, setDeleted] = useState(false)
  const [last4, setLast4] = useState(props.last4)
  const [brand, setBrand] = useState(props.brand)
  useEffect(() => {
    async function updated4() {
      const ip = require('../../IP_ADDRESS.json')
      let response = await fetch('http://' + ip.ipAddress + '/user/id/' + props.user._id)
      response = await response.json()
      setLast4(response.last4)
      setBrand(response.brand)
    }
    updated4()
  }, [])
  const [bounceValue, setBounceValue] = useState(new Animated.Value(1000)); // initial position of sheet (1000 is at the bottom)

  let slidingStyle = [styles.subView];
  slidingStyle.push({ height: props.height });

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

  const renderSwipeButton = () => (
    <SwipeButton title="SWIPE TO SUBMIT" onSwipeSuccess={() => {
      if (_method !== null) {
        setStripe(false) // joshua made false mean that stripe appears -.-
      }
    }} />
  )

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
                <Text style={styles.slidingSheet__content_text}>RELOAD AMOUNT</Text>
                <DropDown
                  placeholder={'PICK A RELOAD AMOUNT'}
                  options={['$5 = 10 chances', '$10 = 40 chances', '$20 = 50 chances', '$50 = 150 chances', '$100 = 400 chances', '$250 = 1100 chances']}
                  size='large'
                  setValue={setAmount}
                  forceUpdate={forceUpdate}
                />
              </View>

              <View style={[styles.slidingSheet__content, { zIndex: 1 }]}>
                <Text style={styles.slidingSheet__content_text}>PAYMENT METHOD</Text>
                <View style={{ width: '100%', alignItems: 'center' }}>
                  <PaymentButton
                    type="applePay"
                    onPress={() => setMethod('applepay')}
                    selected={_method == 'applepay'} />
                  <PaymentButton
                    type="paypal"
                    onPress={() => setMethod('Paypal')}
                    selected={_method == 'Paypal'} />
                  {(!last4) ?
                    <BlockButton
                      color="secondary" title="+ Add Credit Card"
                      type="payment"
                      selected={_method == "+ Add Credit Card"}
                      style={{ marginVertical: 5 }}
                      onPress={() => {setMethod('+ Add Credit Card')}} />
                    
                    :
                    // @ JOSHUA - PLS CHANGE WHAT TYPE OF CARD IT IS, TYPES ARE:
                    // amex, diners, discover,jcb, maestro, mastercard, unionpay, visa
                    <PaymentButton
                      type={brand}
                      last4={last4}
                      selected={_method == ('**** **** **** ' + last4)}
                      onPress={() => setMethod('**** **** **** ' + last4)} 
                      onLongPress={() => {
                        // delete credit card
                        Alert.alert(
                          "Delete this Credit Card",
                          "",
                          [
                              {
                                  text: "Delete", onPress: async () => {
                                    await deleteCreditCard()
                                  }
                              },
                              {
                                  text: "Cancel", onPress: () => {
                                  }
                              }
                          ],
                          { cancelable: true }
                      );
                      }}/>
                  }
                </View>
              </View>

              {/* not rendering for some reason */}
              {/* {(_method === '+ Add Credit Card') ?
              <View style={[styles.slidingSheet__save]}>
                <CheckBox
                  selected={_save}
                  onPress={() => setSave(!_save)}
                  text='Save my payment information'
                />
              </View> : null} */}
            
              {/* NEW SWIPE BUTTON */}
              <View style={{ alignItems: 'center', width: '100%' }}>
                {(_method !== null && _amount !== null) ? renderSwipeButton() : null}

              </View>

              {/* <BlockButton
                  color="primary"
                  title="test"
                  onPress={() => {
                    // console.log('walletBalance',_walletBalance)
                    console.log('method', _method)
                    console.log('amount', _amount)
                  }} />  */}


            </View> : <Stripe user={props.user} setUser={props.setUser} navigation={props.navigation} method={_method} amount={_amount} save={true} wallet={props.wallet}></Stripe>}
        </View>

      </Animated.View>
    </View>
  )
}

export default SlidingSheet;
