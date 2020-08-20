import React, { useState, useEffect, useContext } from 'react'
import { View, Text, TouchableOpacity, TextInput, ScrollView, Picker, Animated, Alert, Dimensions } from 'react-native'
import { Icon } from 'react-native-elements'
import SwipeButton from '../../01_Atoms/Buttons/SwipeButton/SwipeButton';
import GlobalState from '../../globalState';
import { utilities, fonts } from '../../../settings/all_settings';
import DropDown from '../../../components/01_Atoms/DropDown/DropDown';
import BlockButton from '../../../components/01_Atoms/Buttons/BlockButton/BlockButton';
import styles from './SlidingSheet.styles';
import Stripe from '../../05_Pages/Account/Wallet/Stripe'

//create your forceUpdate hook
function useForceUpdate(){
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
  const [refresh, setRefresh] = useState(true)

  const [bounceValue, setBounceValue] = useState(new Animated.Value(1000)); // initial position of sheet (1000 is at the bottom)

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

  const renderSwipeButton = () => (
    <SwipeButton title="SWIPE TO SUBMIT" onSwipeSuccess={() => {
      console.log('----THIS SWIPES------')
      console.log('method', _method)
      console.log('amount', _amount)
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
                <Text style={styles.slidingSheet__content_text}>PAYMENT METHOD</Text>
                <DropDown
                  placeholder={"PICK A PAYMENT METHOD"}
                  options={props.methodOptions}
                  size='large'
                  setValue={setMethod}
                  forceUpdate={forceUpdate}
                />
              </View>

              <View style={[styles.slidingSheet__content, { zIndex: 1 }]}>
                <Text style={styles.slidingSheet__content_text}>RELOAD AMOUNT</Text>
                <DropDown
                  placeholder={'PICK A RELOAD AMOUNT'}
                  options={['$5 = 10 chances', '$10 = 40 chances', '$20 = 50 chances', '$50 = 150 chances', '$100 = 400 chances', '$250 = 1100 chances']}
                  size='large'
                  setValue={setAmount}
                  forceUpdate={forceUpdate}
                />
              </View>

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


            </View> : <Stripe user={props.user} setUser={props.setUser} navigation={props.navigation} method={_method} amount={_amount} save={_save} wallet={props.wallet}></Stripe>}
        </View>

      </Animated.View>
    </View>
  )
}

export default SlidingSheet;
