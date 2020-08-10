import React, {useState} from 'react'
import { View, Text, TouchableOpacity, TextInput, ScrollView, Picker, Animated, } from 'react-native'
import { Icon } from 'react-native-elements';
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


// Sliding Sheet update: Removed visible prop, since the sheet will be invisible after sliding off the screen.
function SlidingSheet(props) {

    const [value, onChangeText] = React.useState('');
    const [selectedValue, setSelectedValue] = useState("**** **** **** 1234");
    // const [sheetOpen, setSheetOpen] = useState(true); // isHidden
    const [bounceValue, setBounceValue] = useState(new Animated.Value(1000)); // initial position of sheet (1000 is at the bottom)

    let options1 = ['**** **** **** 1234', 'Google Pay', 'Apple Pay', 'Paypal', '+ Add Payment Method']
    let options2 = ['$5 = 10 chances', '$10 = 40 chances', '$20 = 50 chances', '$50 = 150 chances', '$100 = 400 chances', '$250 = 1100 chances']

    let slidingStyle = [styles.subView];
    slidingStyle.push({height: props.height});

    const [stripe, setStripe] = useState(true)
    const [_amount, setAmount] = useState(5)

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
    // TODO: Add a dropdown/button for stripe and apple pay
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
                    <View style={styles.slidingSheet__content}>
                        <Text style={styles.slidingSheet__content_text}>{props.content[0]}</Text>
                        <TextInput
                          style={{ height: 40, lineHeight: 23, }}
                          placeholder='Enter here'
                          onChangeText={text => onChangeText(text)}
                          value={value}
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

                    {/* <View style={[styles.slidingSheet__content, {zIndex: 1}]}>
                        <Text style={styles.slidingSheet__content_text}>{props.content[1]}</Text>
                        <DropDown
                          options={options1}
                          size='large'
                          arrowSize={18}
                          isVisible={false}
                          parentFunction={payMe}
                          />
                    </View> */}

                    <View style={styles.button}>
                        <BlockButton
                            title="ADD CHANCES"
                            color="primary"
                            onPress={() => {
                              setStripe(false)}}
                            />
                    </View>

                </ScrollView> : <Stripe navigation={props.navigation} amount={_amount}></Stripe>}
            </View>

        </Animated.View>
      </View>
    )
}

export default SlidingSheet;
