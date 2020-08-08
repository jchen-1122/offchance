import React, {useEffect, useState} from 'react';
import {Text, View, Dimensions} from 'react-native'
import { WebView } from 'react-native-webview';
import { stripeCheckoutRedirectHTML } from './stripeCheckout';
import BottomNav from '../../../02_Molecules/BottomNav/BottomNav'


const PurchaseProduct = ({navigation}) => {

  return (
    <View style={{height: Dimensions.get('window').height * 0.9}}>
        <WebView
        originWhitelist={['*']}
        source={{ html: stripeCheckoutRedirectHTML('5 chances', 10) }}
        
    />
        <BottomNav navigation={navigation} active={'Account'}></BottomNav>
    </View>
    
  );
  
};

export default PurchaseProduct;