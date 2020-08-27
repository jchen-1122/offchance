  
import React, {useEffect, useState, useContext} from 'react';
import {Text, View, Dimensions} from 'react-native'
import { WebView } from 'react-native-webview';
import { stripeCheckoutRedirectHTML } from './stripeCheckout';
import { stripeFirstPayment } from './stripeFirstPayment'
import { stripeSavedPayment } from './stripeSavedPayment'
import Paypal from '../Wallet/paypal'
import BottomNav from '../../../02_Molecules/BottomNav/BottomNav'
import GlobalState from '../../../globalState'


const PurchaseProduct = (props) => {
  const [loaded, setLoaded] = useState(false)
  console.log('STRIPE', props)
  let chances = 10
  let amount = 5
  let options = ['$5 = 10 chances', '$10 = 40 chances', '$20 = 50 chances', '$50 = 150 chances', '$100 = 400 chances', '$250 = 1100 chances']
  if (props.amount === options[0]) {
    chances = 10
    amount = 5
  } else if (props.amount === options[1]) {
    chances = 40
    amount = 10
  } else if (props.amount === options[2]) {
    chances = 50
    amount = 20
  } else if (props.amount === options[3]) {
    chances = 150
    amount = 50
  } else if (props.amount === options[4]) {
    chances = 400
    amount = 100
  } else if (props.amount === options[5]) {
    chances = 1100
    amount = 250
  } else if (props.entertobuy) {
    chances = 0
    amount = parseInt(props.amount)
  }
  let ip = require('../../../IP_ADDRESS.json')
  async function loadChances() {
      const finalChances = props.user.walletChances + chances
      const response = await fetch('https://8f5d9a32.us-south.apigw.appdomain.cloud/users/edit', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({walletChances: finalChances, id: props.user._id })
        })
        let json = await response.json()
        json = json.user
        return json
  }
 
  return (
    <View style={{height: Dimensions.get('window').height * 0.95, flex: 1}}>  
        {(props.method === '+ Add Credit Card' && !props.save) ? 
        // stripe w/o saving
        <WebView
        originWhitelist={['*']}
        source={{ html: stripeCheckoutRedirectHTML(chances + " chances", amount) }}
        onError={() => props.navigation.navigate('Account')}
        onNavigationStateChange={async (e) => {
            if (e.title === 'blank') {
              if (!loaded) {
                setLoaded(true)
                if (props.wallet) {
                  let updatedUser = await loadChances()
                  props.setUser(updatedUser)
                  props.navigation.reset({
                    index: 0,
                    routes: [{ name: 'Success' }]
                  })
                } else {
                  props.navigation.reset({
                    index: 0,
                    routes: [{ name: 'Success', params: {fromRaffle: chances, raffleid: props.raffleid} }],
    
                  })
                }
              }
            }
        }}
      /> 
      : 
      (props.method === '+ Add Credit Card' && props.save) ? 
      // stripe w/ saving
      <WebView
      originWhitelist={['*']}
      source={{ html: stripeFirstPayment(chances + " chances", amount) }}
      onError={() => props.navigation.navigate('Account')}
      onNavigationStateChange={async (e) => {
        if (e.title === 'blank') {
            if (!loaded) {
              setLoaded(true)
              if (props.wallet) {
                let updatedUser = await loadChances()
                props.setUser(updatedUser)
                props.navigation.reset({
                  index: 0,
                  routes: [{ name: 'Success', params: {save: true} }]
                })
              } else {
                props.navigation.reset({
                  index: 0,
                  routes: [{ name: 'Success', params: {fromRaffle: chances, save: true, raffleid: props.raffleid} }],
  
                })
              }
            }
          }
        }
      }
    /> : 
    ((props.method !== 'Paypal') ? 
    // paypal
    <WebView
      originWhitelist={['*']}
      source={{ html: stripeSavedPayment(amount) }}
      onError={() => props.navigation.navigate('Account')}
      onNavigationStateChange={async (e) => {
        if (e.loading === false) {
          if (!loaded) {
            setLoaded(true)
            if (props.wallet) {
              let updatedUser = await loadChances()
              props.setUser(updatedUser)
              props.navigation.reset({
                index: 0,
                routes: [{ name: 'Success' }]
              })
            } else {
              props.navigation.reset({
                index: 0,
                routes: [{ name: 'Success', params: {fromRaffle: chances, raffleid: props.raffleid} }],

              })
            }
          }
        }
      }}
    /> : <WebView 
        containerStyle={{marginBottom: 100}}
        originWhitelist={['*']}
        source={{ uri: "http://" + ip.ipAddress + "/user/paypal", method: "POST", headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}, body: JSON.stringify({ name: chances + " chances", amount: amount + "" }) }}
        onNavigationStateChange={async (data) => {
          if (data.navigationType === "backforward") {
            props.navigation.navigate('Account')
          }
          if (data.url.includes("success") && !loaded) {
            setLoaded(true)
            if (props.wallet) {
              let updatedUser = await loadChances()
              props.setUser(updatedUser)
              props.navigation.reset({
                index: 0,
                routes: [{ name: 'Success' }]
              })
            } else  {
              props.navigation.reset({
                index: 0,
                routes: [{ name: 'Success', params: {fromRaffle: chances, raffleid: props.raffleid} }],

              })
            }
          }
        }}
        injectedJavaScript={`document.f1.submit()`}
        />)}
    </View>
    
  );
  
};

export default PurchaseProduct;