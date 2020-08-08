import React, { useContext, useState } from 'react'
import { View, ScrollView, Text, Image, Animated, Button, TouchableHighlight, Dimensions} from 'react-native'
import { WebView } from 'react-native-webview';
import { set } from 'react-native-reanimated';
import { Overlay } from 'react-native-elements';
import GlobalState from '../../../globalState';
import BottomNav from '../../../02_Molecules/BottomNav/BottomNav'
import {utilities, fonts, colors} from '../../../../settings/all_settings';
import styles from './Wallet.styling';
import BlockButton from '../../../01_Atoms/Buttons/BlockButton/BlockButton';
import { get_user } from '../../../fake_users/stub-users';
import SlidingSheet from '../../../04_Templates/SlidingSheet/SlidingSheet';


export default function Wallet({navigation}) {

    // stripe.setOptions({
    //   publishableKey:
    //   'pk_test_51HAiC0KuIZolMmjKL45leDQ1jlXegnbGEJaPQsnR44zU7JOUhWxte3jwLrS9wvP6y10Vu6vRaxaDZsWU9RAH9pLl00bYR2xNVG',
    // });

    const {user, setUser} = useContext(GlobalState)
    const [containerStyle, setContainerStyle] = useState(styles.container);
    const [sheetController, setSheetController] = useState(false); // 0 - close, 1 - open. TODO: GLOBAL STATE
    const [paymentController, setPaymentController] = useState(false);

    const { width, height } = Dimensions.get('window');

    const trigger = () => {
        setSheetController(!sheetController);

        setContainerStyle( !sheetController ?
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

    const paymentTrigger = () => {
        setPaymentController(!paymentController);

        setContainerStyle( !paymentController ?
          { // light on
          flex: 1,
          justifyContent: 'space-between',
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        } : { // light off
          flex: 1,
          justifyContent: 'space-between',
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          });

      }

    return (
        <View style={containerStyle}>

            {/* Header */}
            <View>
                <Text style={styles.header}>Balance:</Text>
                {/* TODO: Retrieve user remaining chance from backend. */}
                <Text style={styles.chance}>{user.walletChances} CHANCES</Text>
                <Text style={styles.appendix}>*Chances can be used toward raffle entries</Text>
            </View>

            {/* Content */}
            <View style={{marginTop: height * 0.05}}>
                <Text style={styles.content}>Chances can be earned by sharing and inviting friends, playing games and reloading your wallet by donating!</Text>
            </View>

            <View style={[styles.button, {marginTop: height * 0.05}]}>
                <BlockButton
                    title="ADD CHANCES"
                    color="secondary"
                    size='short'
                    onPress={() => trigger()}/>
            </View>

            {/* sliding sheet */}
            <SlidingSheet
            title='Add Chances'
            type='default'
            sheet={sheetController}
            trigger={trigger}
            paymentTrigger={paymentTrigger}
            height={480}
            content={['Wallet Balance', 'Reload Source', 'Reload Amount']}/>

            <SlidingSheet
            title='Payment'
            type='payment'
            sheet={paymentController}
            trigger={paymentTrigger}
            height={height * 0.8}
            content={['Wallet Balance', 'Reload Source', 'Reload Amount']}/>


            <BottomNav navigation={navigation} active={'Account'}></BottomNav>
        </View>
    )
}
