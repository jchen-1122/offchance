  
import React, {useEffect, useState, useContext} from 'react';
import {Text, View, Dimensions} from 'react-native'
import { WebView } from 'react-native-webview';
import { stripeCheckoutRedirectHTML } from './stripeCheckout';
import { stripeFirstPayment } from './stripeFirstPayment'
import { stripeSavedPayment } from './stripeSavedPayment'
import BottomNav from '../../../02_Molecules/BottomNav/BottomNav'
import GlobalState from '../../../globalState'


const PurchaseProduct = (props) => {
  let {user, setUser} = useContext(GlobalState)
  const [loaded, setLoaded] = useState(false)
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
  }

  async function loadChances() {
      let ip = require('../../../IP_ADDRESS.json')
      const currUser = await fetch('http://' + ip.ipAddress + '/user/id/' + user._id)
      const jsonUser = await currUser.json()
      console.log(jsonUser.walletChances + chances)
      const response = await fetch('http://' + ip.ipAddress + '/user/edit/' + user._id, {
            method: "PATCH",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({walletChances: jsonUser.walletChances + chances})
        })
        const json = await response.json()
        return json
  }
 
  return (
    <View style={{height: Dimensions.get('window').height * 0.95, flex: 1}}>  
        {(props.method === '+ Add Credit Card' && !props.save) ? <WebView
        originWhitelist={['*']}
        source={{ html: stripeCheckoutRedirectHTML(chances + " chances", amount) }}
        onError={() => props.navigation.navigate('Account')}
        onNavigationStateChange={async (e) => {
            if (e.title === 'blank') {
              if (!loaded) {
                let updatedUser = await loadChances()
                setUser(updatedUser)
                setLoaded(true)
                props.navigation.reset({
                  index: 0,
                  routes: [{ name: 'Success' }]
                })
              }
            }
        }}
      /> : (props.method === '+ Add Credit Card' && props.save) ? <WebView
      originWhitelist={['*']}
      source={{ html: stripeFirstPayment(chances + " chances", amount) }}
      onError={() => props.navigation.navigate('Account')}
      onNavigationStateChange={async (e) => {
          if (e.title === 'blank') {
            if (!loaded) {
              let updatedUser = await loadChances()
              setUser(updatedUser)
              setLoaded(true)
              props.navigation.reset({
                index: 0,
                routes: [{ name: 'Success' }]
              })
            }
          }
      }}
    /> : 
    <WebView
      originWhitelist={['*']}
      source={{ html: stripeSavedPayment(amount) }}
      onError={() => props.navigation.navigate('Account')}
      onNavigationStateChange={async (e) => {
          if (!loaded) {
            let updatedUser = await loadChances()
            setUser(updatedUser)
            setLoaded(true)
            props.navigation.reset({
              index: 0,
              routes: [{ name: 'Success' }]
            })
          }
      }}
    />}
    </View>
    
  );
  
};

export default PurchaseProduct;