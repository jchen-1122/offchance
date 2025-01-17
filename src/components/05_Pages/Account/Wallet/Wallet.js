import React, { useContext, useState, useEffect } from 'react'
import { View, ScrollView, Text, Image, Animated, Button, TouchableHighlight, Dimensions } from 'react-native'
import { WebView } from 'react-native-webview';
import { set } from 'react-native-reanimated';
import { Overlay } from 'react-native-elements';
import GlobalState from '../../../globalState';
import BottomNav from '../../../02_Molecules/BottomNav/BottomNav'
import { utilities, fonts, colors } from '../../../../settings/all_settings';
import styles from './Wallet.styling';
import BlockButton from '../../../01_Atoms/Buttons/BlockButton/BlockButton';
import { get_user } from '../../../fake_users/stub-users';
import SlidingSheet from '../../../04_Templates/SlidingSheet/SlidingSheet';
import Stripe from './Stripe'

export default function Wallet({ navigation }) {

  const { user, setUser } = useContext(GlobalState)
  const [containerStyle, setContainerStyle] = useState(styles.Wallet);
  const [sheetController, setSheetController] = useState(false); // 0 - close, 1 - open. TODO: GLOBAL STATE
  const [paymentController, setPaymentController] = useState(false);
  const [methodOptions, setMethodOptions] = useState(['Paypal'])

  const { width, height } = Dimensions.get('window');

  useEffect(() => {
    let options = ['Paypal']
    if (user.last4) {
      options.push('**** **** **** ' + user.last4)
    }
    else {
      options.push('+ Add Credit Card')
    }
    setMethodOptions(options)
  }, [])

  const trigger = () => {
    setSheetController(!sheetController);

    setContainerStyle(!sheetController ?
      { // light on
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      } : { // light off
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: "rgba(255, 255, 255, 0.1)",
      });

    // console.log(sheetController); 101010
  }

  return (
    <View style={containerStyle}>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.Wallet__title}>Chances:</Text>
        <View style={[styles.Wallet__chances]}>
          <Text style={styles.Wallet__chances__value}>{user.walletChances}</Text>
        </View>
        <Text style={fonts.h3}>*Chances can be used toward raffle entries</Text>
      </View>

      {/* Content */}
      <View style={{ marginTop: 25, alignItems: 'center' }}>
        <Text style={[fonts.h3, {width: '90%'}]}>Chances can be earned by sharing and inviting friends, playing games and reloading your wallet by donating!</Text>
      </View>

      <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: '15%',marginTop: height * 0.05 }}>
        <BlockButton
          title="ADD CHANCES"
          color="secondary"
          size='short'
          onPress={() => trigger()} />
      </View>

      {/* sliding sheet */}
      <SlidingSheet
        title='Add Chances'
        type='default'
        sheet={sheetController}
        trigger={trigger}
        height={height * 0.7}
        user={user}
        setUser={setUser}
        methodOptions={methodOptions}
        last4={user.last4}
        brand={user.brand}
        navigation={navigation}
        wallet={true} />
      <BottomNav navigation={navigation} active={'Account'}></BottomNav>
    </View>
  )
}
