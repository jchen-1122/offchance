import React, { useState, useContext } from 'react';
import { View, Text, Button, Dimensions, TouchableOpacity } from 'react-native';
import BlockButton from '../../../01_Atoms/Buttons/BlockButton/BlockButton';
import InputField from '../../../02_Molecules/InputField/InputField';
import { fonts, utilities } from '../../../../settings/all_settings';
import { ScrollView } from 'react-native-gesture-handler';
import validator from 'validator'
import GlobalState from '../../../globalState';
import BottomNav from '../../../02_Molecules/BottomNav/BottomNav';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Dropdown from '../../../01_Atoms/DropDown/DropDown';
import SizeCarousel from '../../../01_Atoms/SizeCarousel/SizeCarousel';
import { RadioButton } from 'react-native-paper';
import Checkbox from '../../../02_Molecules/Checkbox/Checkbox';
import { format_date } from '../../../../functions/convert_dates';
import { styles } from './NewRaffle.styling';
import { colors } from '../../../../settings/all_settings'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default function NewRaffle({ navigation, route }) {
    var shirtSizes = ['S', 'M', 'L', 'XL']
    var shoeSizes = [];
    for (var i = 4; i <= 14; i += 0.5) {
        shoeSizes.push(i.toString())
    }

    // states for each input value
    const [_name, setName] = useState(null)
    const [_price, setPrice] = useState(null)
    const [_description, setDescription] = useState(null)
    const [_startTime, setStartTime] = useState(null)
    const [_goal, setGoal] = useState(null)
    const [_charities, setCharities] = useState([])
    const [_sizeTypes, setSizeTypes] = useState(['One Size'])
    const [_sizes, setSizes] = useState(['One Size'])
    const [_productType, setProductType] = useState('sneaker')
    const [_drawingDuration, setDrawingDuration] = useState(null)
    const [_drawingRadius, setDrawingRadius] = useState(null)

    // stuff for date picker (start time)
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };
    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };
    const handleConfirm = (date) => {
        setStartTime(date)
        hideDatePicker();
    };

    const productTypes = ['sneaker', 'clothing', 'collectibles', 'art']
    const { user, setUser } = useContext(GlobalState)
    //console.log(typeof user._id)

    // METHOD FOR POSTING RAFFLE
    const data = require('../../../IP_ADDRESS.json');
    const postRaffle = async () => {
        const response = await fetch('http://' + data.ipAddress + '/raffle/new', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: makeJSON()
        })
        const json = await response.json()
        //console.log(json)
        return json
    }

    //   // states for each input value
    //   const [_email, setEmail] = useState(null)
    //   const [_password, setPassword] = useState(null)
    //   const [_errors, setErrors] = useState([])

    //   // validates email input
    //   const isValidEmail = () => {
    //     return validator.isEmail(String(_email).toLowerCase());
    //   }

    //   // check for any errors in input, returns array of errors
    //   const generateErrors = () => {
    //     let errors = []
    //     // if not a valid email
    //     if (!isValidEmail()) {
    //       errors.push(<Text style={fonts.error}>Email is not valid</Text>)
    //       setErrors(errors)
    //       return true
    //     } else {
    //       setErrors([])
    //       return false
    //     }

    //   }

    // makes a json object with all the input fields
    const makeJSON = () => {
        let data = {
            images: ["https://oc-mobile-images.s3.us-east.cloud-object-storage.appdomain.cloud/oc-logo.png"], //hardcoded for demo
            type: route.params.type,
            hostedBy: user._id,
            name: _name,
            productPrice: _price,
            description: _description,
            //startTime: _startTime.getTime() / 1000, // convert to unix timestamp
            donationGoal: _goal,
            charities: (_charities.length > 0) ? _charities.split(',').map(item => item.trim()) : null,
            productType: _productType,
            drawingDuration: _drawingDuration,
            radius: _drawingRadius === 'None' ? -1 : _drawingRadius,
            // CHANGE LATER
            sizeTypes: _sizeTypes,
            sizes: _sizes
        }
        //console.log(JSON.stringify(data))
        return JSON.stringify(data)
    };

    return (

        <View style={utilities.container}>

            <ScrollView>
            <KeyboardAwareScrollView
        style={{ backgroundColor: 'transparent' }}
        resetScrollToCoords={{ x: 0, y: 0 }}
      >
                <View style={[utilities.flexCenter, { marginBottom: 25 }]}>
                    <InputField
                        label="Name of Product"
                        autoCapitalize="words"
                        value={_name}
                        onChangeText={(text) => { setName(text) }}
                        required />
                    <InputField
                        label="Prize Value"
                        keyboardType="phone-pad"
                        value={_price}
                        onChangeText={(text) => { setPrice(text) }}
                        required />

                    {(route.params.type == 1) ?
                        <InputField
                            label="Donation Goal ($)"
                            keyboardType="phone-pad"
                            value={_goal}
                            onChangeText={(text) => { setGoal(text) }}
                            required /> : null
                    }
                    {(route.params.type == 1) ?
                        <InputField
                            label="Charity names (sep. by commas)"
                            autoCapitalize="words"
                            value={_charities}
                            onChangeText={(text) => { setCharities(text) }}
                            required /> : null
                    }
                    <InputField
                        label="Description"
                        value={_description}
                        onChangeText={(text) => { setDescription(text) }}
                        required
                        textArea />

                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '90%', zIndex: 2 }}>
                        <Text style={styles.InputField__label}>Drawing Duration (Days) <Text style={{ color: 'red' }}>*</Text></Text>
                        <Dropdown options={[1, 3, 5, 7, 14, 21, 30]} placeholder="Days" setValue={setDrawingDuration} />
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '90%', zIndex: 1, marginVertical: '3%' }}>
                        <Text style={styles.InputField__label}>Drawing Radius (mi) <Text style={{ color: 'red' }}>*</Text></Text>
                        <Dropdown options={['None', 50, 100, 200, 1000]} placeholder="Miles" setValue={setDrawingRadius} />
                    </View>

                    {/* WE NEED THIS FOR ADMIN */}
                    {/* <View style={{ width: '100%', marginLeft: '10%', marginVertical: 15 }}>
                        <Text style={styles.InputField__label}>Drawing Time<Text style={{ color: 'red' }}>*</Text></Text>
                        <BlockButton color="secondary" size="short" title={_startTime == null ? "Pick A Start Date" : format_date(_startTime)} onPress={showDatePicker} />
                    </View>
                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="datetime"
                        headerTextIOS="Pick a start date"
                        onConfirm={handleConfirm}
                        onCancel={hideDatePicker}
                    /> */}

                    <View style={{ width: '100%', marginLeft: '10%', marginVertical: 15 }}>
                        <Text style={styles.InputField__label}>Type of Product<Text style={{ color: 'red' }}>*</Text></Text>
                        {productTypes.map((type, index) =>
                            <Checkbox
                                text={type.charAt(0).toUpperCase() + type.slice(1)}
                                selected={_productType === type}
                                onPress={() => setProductType(type)}
                            />)}
                        <Checkbox
                            text='Other'
                            selected={!productTypes.includes(_productType)}
                            onPress={() => setProductType('Other')} />
                                                    {!productTypes.includes(_productType) ?
                            <InputField
                                autoCapitalize="words"
                                value={_productType}
                                onChangeText={(text) => { setProductType(text) }} /> : null}
                    </View>

                    {_productType == 'sneaker' ?
                        <View style={{ height: 75, marginLeft: '5%' }}>
                            <Text style={[styles.InputField__label]}>Sneaker Sizes <Text style={{ color: 'red' }}>*</Text></Text>
                            <SizeCarousel sizes={shoeSizes} type='multiple' default={1} setSize={setSizes} />
                        </View>
                        : null}
                    {_productType == 'clothing' ?
                        <View style={{ height: 75, marginLeft: '5%', width: '95%' }}>
                            <Text style={[styles.InputField__label]}>Sizes <Text style={{ color: 'red' }}>*</Text></Text>
                            <SizeCarousel sizes={shirtSizes} type='multiple' default={1} setSize={setSizes} />
                        </View>
                        : null}
                    <View style={{ width: '95%', marginLeft: '5%', marginVertical: '5%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={[styles.InputField__label]}>Product Pictures <Text style={{ color: 'red' }}>*</Text></Text>
                        <BlockButton color="secondary" title="CHOOSE" size="small" />
                    </View>
                    <BlockButton title="SUBMIT FOR APPROVAL" color="primary" onPress={() => {
                        //console.log('sizes',_sizes)
                        postRaffle()
                        navigation.navigate('Home')
                    }} />
                </View>
                </KeyboardAwareScrollView>
            </ScrollView>
            <BottomNav navigation={navigation} active={'Home'} />
        </View>

    );
}