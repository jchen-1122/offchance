import React, { useState, useContext, useRef } from 'react';
import { View, Text, Alert, Keyboard, Button, TouchableOpacity, Image, Dimensions } from 'react-native';
import BlockButton from '../../../../01_Atoms/Buttons/BlockButton/BlockButton';
import InputField from '../../../../02_Molecules/InputField/InputField';
import { fonts, utilities } from '../../../../../settings/all_settings';
import { ScrollView } from 'react-native-gesture-handler';
import GlobalState from '../../../../globalState';
import BottomNav from '../../../../02_Molecules/BottomNav/BottomNav';
import Dropdown from '../../../../01_Atoms/DropDown/DropDown';
import SizeCarousel from '../../../../01_Atoms/SizeCarousel/SizeCarousel';
import Checkbox from '../../../../02_Molecules/Checkbox/Checkbox';
import { styles } from './AdminEdit.styling';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { format_date } from '../../../../../functions/convert_dates';
import ImageCarousel from '../../../../02_Molecules/ImageCarousel/ImageCarousel'

export default function AdminEdit({ navigation, route }) {
    var _type = route.params.type
    var shirtSizes = ['S', 'M', 'L', 'XL']
    var shoeSizes = [];
    for (var i = 4; i <= 14; i += 0.5) {
        shoeSizes.push(i.toString())
    }
    console.log(route.params)

    const [buttonTitle, setButtonTitle] = useState('Submit')
    // states for each input value
    const [_name, setName] = useState(route.params.name)
    const [_price, setPrice] = useState(route.params.productPrice || 0)
    const [_value, setValue] = useState(177)
    const [_numProducts, setNumProducts] = useState(null)
    const [_description, setDescription] = useState(route.params.description)
    const [_goal, setGoal] = useState(null)
    const [_charities, setCharities] = useState(route.params.charities)
    const [_sizeTypes, setSizeTypes] = useState(['One Size'])
    const [_sizes, setSizes] = useState(route.params.sizes)
    const [_productType, setProductType] = useState(route.params.productType)
    const [_drawingDuration, setDrawingDuration] = useState(route.params.drawingDuration || 1)
    const [_drawingRadius, setDrawingRadius] = useState(route.params.radius)
    const [_address, setAddress] = useState(null)
    const [_startTime, setStartTime] = useState(null)

    // for going to the next text input
    const priceRef = useRef()
    const valueRef = useRef()
    const goalRef = useRef()
    const charityRef = useRef()
    const descriptionRef = useRef()
    const numProductsRef = useRef()

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
    const data = require('../../../../IP_ADDRESS.json');
    const editRaffle = async () => {
        const response = await fetch('http://' + data.ipAddress + '/raffle/edit/' + route.params._id, {
            method: "PATCH",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: makeJSON()
        })
        const json = await response.json()
        return json
    }

    // makes a json object with all the input fields
    const makeJSON = () => {
        let data = {
            images: (route.params.images.length === 0) ? ["https://oc-mobile-images.s3.us-east.cloud-object-storage.appdomain.cloud/oc-logo.png"] : route.params.images, //hardcoded for demo
            name: _name,
            productPrice: _price,
            description: _description,
            charities: _charities,
            productType: _productType,
            drawingDuration: _drawingDuration,
            radius: _drawingRadius === 'None' ? 25000 : _drawingRadius,
            // CHANGE LATER
            sizeTypes: _sizeTypes,
            sizes: _sizes,
            startTime: Math.floor(Date.now() / 1000), //should be _startTime @chelly
            approved: true
        }
        console.log(JSON.stringify(data))
        return JSON.stringify(data)
    };
    return (

        <View style={utilities.container}>

            <ScrollView>
                <KeyboardAwareScrollView
                    style={{ backgroundColor: 'transparent' }}
                    resetScrollToCoords={{ x: 0, y: 0 }}
                >   
                    <View style={{margin: 25}}>
                        <Text style={{fontStyle: "italic"}}>Hosted by:</Text>
                        <View style={{flexDirection: 'row', marginTop: 5}}>
                            <Image source={{ uri: route.params.host.profilePicture }} style={{width:30, height: 30, borderRadius: 30/2, marginRight: 5}}></Image>
                            <Text style={{marginTop: 5, fontSize: 18}}>@{route.params.host.username}</Text>
                        </View>
                    </View>
                    <View style={[utilities.flexCenter, { marginBottom: 25}]}>
                        <InputField
                            label="Name of Product"
                            autoCapitalize="words"
                            value={_name}
                            onChangeText={(text) => { setName(text) }}
                            required />
                        <InputField
                            label="Description"
                            value={_description}
                            onChangeText={(text) => { setDescription(text) }}
                            ref={descriptionRef}
                            returnKeyType='done'
                            required
                            textArea />
                        <InputField
                            label="Prize Value"
                            value={_price.toString()}
                            onChangeText={(text) => { setPrice(text) }}
                            keyboardType="number-pad"
                            required
                            />
                        <InputField
                            label="Charities (separated by comma)"
                            value={_charities.toString()}
                            onChangeText={(text) => { 
                                const cs = text.split(",")
                                setCharities(cs)
                                console.log(_charities)
                            }}
                            required
                            />

                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '90%', zIndex: 2 }}>
                            <Text style={styles.InputField__label}>Drawing Duration (Days)*</Text>
                            <Dropdown options={[1, 3, 5, 7, 14, 21, 30]} placeholder={_drawingDuration} setValue={setDrawingDuration} />
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '90%', zIndex: 1 }}>
                            <Text style={styles.InputField__label}>Drawing Radius* (mi)</Text>
                            <Dropdown options={['None', 1, 5, 10, 20, 50, 100, 200, 1000]} placeholder={_drawingRadius} setValue={setDrawingRadius} />
                        </View>

                        <View style={{ width: '100%', marginLeft: '10%', marginVertical: 15 }}>
                            <Text style={styles.InputField__label}>Type of Product*</Text>
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
                                    onChangeText={(text) => { setProductType(text) }}
                                    returnKeyType='done'
                                     /> : null}
                        </View>

                        {_productType == 'sneaker' ?
                            <View style={{ height: 75, marginLeft: '5%' }}>
                                <Text style={[styles.InputField__label]}>Available Sizes*</Text>
                                <SizeCarousel sizes={route.params.sizes} type='multiple' default={1} setSize={setSizes} />
                            </View>
                            : null}
                        {_productType == 'clothing' ?
                            <View style={{ height: 75, marginLeft: '5%', width: '95%' }}>
                                <Text style={[styles.InputField__label]}>Available Sizes*</Text>
                                <SizeCarousel sizes={route.params.sizes} type='multiple' default={1} setSize={setSizes} />
                            </View>
                            : null}
                        <View style={{ width: '95%', marginLeft: '5%', marginVertical: '5%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Text style={[styles.InputField__label]}>Product Pictures*</Text>
                            <BlockButton color="secondary" title="CHOOSE" size="small" />
                        </View>
                        
                    
                    <View >
                        {route.params.images.length > 1 ? <ImageCarousel images={route.params.images}></ImageCarousel> : 
                        <Image source={{uri: route.params.images[0]}} 
                        style={{height: Dimensions.get('window').height*0.3, width: Dimensions.get('window').width, resizeMode: 'contain', marginBottom: '5%'}}></Image>}
                    </View>
                    {/* WE NEED THIS FOR ADMIN */}
                    {/* // sup chelly, can u also set the _startTime to the correct format */}
                    <View style={{ width: '100%', marginLeft: '10%', marginVertical: 15 }}>
                        <Text style={styles.InputField__label}>Drawing Time<Text style={{ color: 'red' }}>*</Text></Text>
                        <BlockButton color="secondary" size="short" title={_startTime == null ? "Pick A Start Date" : format_date(_startTime)} onPress={showDatePicker} />
                    </View>
                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="datetime"
                        headerTextIOS="Pick a start date"
                        onConfirm={handleConfirm}
                        onCancel={hideDatePicker}
                    />
                        <BlockButton title="SUBMIT FOR APPROVAL" color="primary" onPress={() => {
                            Alert.alert(
                                "Confirm",
                                "The raffle will be modified, approved, and publicly posted.",
                                [
                                    { text: "OK", onPress: () => {
                                        editRaffle()
                                        navigation.navigate('AdminHome')
                                    } },
                                    {
                                       text: "Cancel", onPress: () => {
                                           navigation.navigate('AdminEdit', route.params)
                                       }
                                    }
                                ],
                                { cancelable: true }
                            );
                        }} />
                    </View>
                </KeyboardAwareScrollView>
            </ScrollView>
            <BottomNav navigation={navigation} active={'AdminHome'} admin={true}/>
        </View>

    );
}