import React, {useState, useEffect} from 'react'
import { View, Text, TouchableOpacity, TextInput, ScrollView, Picker, Animated, Alert } from 'react-native'
import { Icon } from 'react-native-elements'
import CheckBox from '../../02_Molecules/Checkbox/Checkbox'
import DropDownPicker from 'react-native-dropdown-picker';

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
        console.log('http://' + data.ipAddress + '/user/id/' + props.user._id)
        let response = await fetch('http://' + data.ipAddress + '/user/id/' + props.user._id)
        response = await response.json()
        if (Object.keys('last4').includes('last4')) {
          setlast4(response.last4)
        }
      }
      getLast4()
    }, [])

    const [value, onChangeText] = React.useState('');
    const [selectedValue, setSelectedValue] = useState("**** **** **** 1234");
    // const [sheetOpen, setSheetOpen] = useState(true); // isHidden
    const [bounceValue, setBounceValue] = useState(new Animated.Value(1000)); // initial position of sheet (1000 is at the bottom)

    let options1 = ['Paypal']
    if (last4 !== null) {
      options1.unshift('**** **** **** ' + last4)
    } else {
      options1.push('+ Add Credit Card')
    }
    let options2 = ['$5 = 10 chances', '$10 = 40 chances', '$20 = 50 chances', '$50 = 150 chances', '$100 = 400 chances', '$250 = 1100 chances']

    let slidingStyle = [styles.subView];
    slidingStyle.push({height: props.height});

    const [stripe, setStripe] = useState(true)
    const [_method, setMethod] = useState(null)
    const [_amount, setAmount] = useState('$5 = 10 chances')
    const [_save, setSave] = useState(false)

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


    // console.log(props.sheet); 101010

    return (
      <View style={styles.container}>
        <Animated.View
            style={[slidingStyle,
            { transform: [{ translateY: bounceValue }] }]}>

            <View style={styles.container}>
                {stripe ? <ScrollView style={styles.slidingSheet}>
                    {/* Title part with a close button */}
                    <View style={styles.slidingSheet__header}>
                        <TouchableOpacity onPress={ () => closeSlidingSheet() }>
                            <Icon name='close' />
                        </TouchableOpacity>
                        <Text style={fonts.h1}>{props.title}</Text>
                        <View/>
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
                    <View style={[styles.slidingSheet__content, {zIndex: 2}]}>
                        <Text style={styles.slidingSheet__content_text}>{props.content[1]}</Text>
                        <DropDown
                          options={options1}
                          size='large'
                          arrowSize={18}
                          isVisible={false}
                          setValue={setMethod}
                          />
                    </View>

                    <View style={[styles.slidingSheet__content, {zIndex: 1}]}>
                        <Text style={styles.slidingSheet__content_text}>{props.content[2]}</Text>
                        <DropDown
                          options={options2}
                          size='large'
                          arrowSize={18}
                          isVisible={false}
                          setValue={setAmount}
                          />
                    </View>
                    
                    <View style={[styles.slidingSheet__save]}>
                    <CheckBox
                      selected={_save}
                      onPress={() => setSave(!_save)}
                      text='Save my payment information'
                    />
                    </View>

                    <View style={styles.button}>
                        <BlockButton
                            title="ADD CHANCES"
                            color="primary"
                            onPress={() => {
                              setStripe(false)}}
                            />
                    </View>

                </ScrollView> : <Stripe navigation={props.navigation} method={_method} amount={_amount} save={_save}></Stripe>}
            </View>

        </Animated.View>
      </View>
    )
}

export default SlidingSheet;
