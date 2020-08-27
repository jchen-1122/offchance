import React, { useState, useContext, useRef } from 'react';
import { View, Text, Alert, Keyboard, Button, TouchableOpacity, Image, Dimensions } from 'react-native';
import BlockButton from '../../../../01_Atoms/Buttons/BlockButton/BlockButton';
import InputField from '../../../../02_Molecules/InputField/InputField';
import { global, utilities } from '../../../../../settings/all_settings';
import { ScrollView } from 'react-native-gesture-handler';
import GlobalState from '../../../../globalState';
import BottomNav from '../../../../02_Molecules/BottomNav/BottomNav';
import Dropdown from '../../../../01_Atoms/DropDown/DropDown';
import SizeCarousel from '../../../../01_Atoms/SizeCarousel/SizeCarousel';
import Checkbox from '../../../../02_Molecules/Checkbox/Checkbox';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { format_date } from '../../../../../functions/convert_dates';
import ImageCarousel from '../../../../02_Molecules/ImageCarousel/ImageCarousel'
import TextLink from '../../../../01_Atoms/Buttons/TextLinks/TextLinks';
import { getPushTokens } from '../../../../../functions/pushNotifs/getPushTokens'

export default function AdminEdit({ navigation, route }) {
    console.log(route.params)
    var _type = route.params.type
    var shirtSizes = ['S', 'M', 'L', 'XL']
    var shoeSizes = [];
    for (var i = 4; i <= 14; i += 0.5) {
        shoeSizes.push(i.toString())
    }
    //console.log(route.params)

    const [buttonTitle, setButtonTitle] = useState('Submit')
    // states for each input value
    const [_name, setName] = useState(route.params.name)
    const [_price, setPrice] = useState(route.params.productPrice || 0)
    const [_value, setValue] = useState(route.params.valuedAt || 0)
    const [_numProducts, setNumProducts] = useState(route.params.numProducts || 1)
    const [_description, setDescription] = useState(route.params.description)
    const [_goal, setGoal] = useState(null)
    const [_charities, setCharities] = useState(route.params.charities)
    const [_sizeTypes, setSizeTypes] = useState(route.params.sizeTypes || ['One Size'])
    const [_sizes, setSizes] = useState(route.params.sizes)
    const [_productType, setProductType] = useState(route.params.productType)
    const [_drawingDuration, setDrawingDuration] = useState(route.params.drawingDuration || 1)
    const [_drawingRadius, setDrawingRadius] = useState(route.params.radius)
    const [_address, setAddress] = useState(null)
    const [_startTime, setStartTime] = useState((route.params.approved) ? route.params.startTime : null)
    const [_status, setStatus] = useState((route.params.approved) ? (route.params.live) ? 'Live' : 'Coming Soon' : null)
    const [_approved, setApproved] = useState(route.params.approved)
    const [_raffle, setRaffle] = useState(route.params)
    // sup matt, this is the reason you're sending throught the request body
    const [_reason, setReason] = useState('')

    let images = [];
    for (let i in route.params.images) {
        images.push({ uri: route.params.images[i] })
    }

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
        date = new Date(date).getTime() / 1000
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
        setRaffle(json)
        return json
    }

    const deleteRaffle = async () => {
        // delete from user rafflesPosted
        let user = await fetch('http://' + data.ipAddress + '/user/id/' + route.params.hostedBy)
        user = await user.json()
        let res = []
        for (var i = 0; i < user.rafflesPosted.length; i++) {
            if (route.params._id !== user.rafflesPosted[i]) {
                res.push(user.rafflesPosted[i])
            }
        }
        const updatedUser = await fetch('http://' + data.ipAddress + '/user/edit/' + route.params.hostedBy, {
            method: "PATCH",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({rafflesPosted: res})
        })
        const response = await fetch('http://' + data.ipAddress + '/raffle/del/' + route.params._id, {
            method: "DELETE",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
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
            approved: (_status !== 'Resubmit') ? true : false,
            startTime: (_status !== 'Live') ? null : _startTime,
            live: (_status == 'Live') ? true : (_status == 'Coming Soon') ? false : null
        }
        return JSON.stringify(data)
    };

    // for sending a notification when the raffle goes live/approved--------------------------------------------------------------------------------------------------------------
    
    // takes in a body, sends request via user route
    const postMessage = async (body) => {
        console.log('body', body)
        const response = await fetch('http://' + data.ipAddress + '/user/message', {
            method: "POST",
            headers: {
                'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
                'Content-Type': 'application/json'
            },
            body: body
        })
        const json = await response.text()
        return json
    }

    const sendSMS = async (msg) => {
        const response = await fetch('https://verify-sample-2928-dev.twil.io/host', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: SMSJson(msg)
        })
        const json = await response.text()
        return json
    }

    // checks conditions on when to send the notification
    const sendLiveNotif = async (justApproved) => {
        // console.log('approved', route.params.approved)
        // console.log('prev live', route.params.live)
        // console.log('status', _status)

        // if you changed it from 'Coming Soon' to 'Live'
        if (route.params.approved && (!route.params.live) && _status == 'Live') {
            return await postMessage(await makeJSONpush(
                await getPushTokens(route.params.likedUsers || []),
                "A raffle you liked is now open!",
                _name + " is now open for entries."
            ))
        }
        console.log('route.params.approved', route.params.approved)
        console.log('_approved', justApproved)
        // if you changed it from !approved to approved
        if (!route.params.approved && justApproved){
            console.log('followers', route.params.host.followers)
            console.log('host', route.params.host.username)
            sendSMS('OffChance: Your raffle for ' + _name + ' has been approved!')
            return await postMessage(await makeJSONpush(
                await getPushTokens(route.params.host.followers),
                "A host you're following has posted a drawing!",
                route.params.host.username + " just posted a drawing for " + _name
            ))
        }
        return null
    };

    // takes in params and constructs the push notif data
    const makeJSONpush = async (users, title, message) => {
        console.log('users', users)
        let data = {
            pushTokens: users,
            title: title,
            message: message,
            page: 'Raffle',
            raffleID: _raffle._id,
            host: _raffle.host
            // raffle: _raffle
        }
        return JSON.stringify(data)
    }

    const SMSJson = (msg) => {
        console.log('+1' + route.params.host.phoneNumber)
        let data = {
            to: '+1' + route.params.host.phoneNumber,
            message: msg
        }
        console.log(JSON.stringify(data))
        return JSON.stringify(data)
    }

    return (
        <View style={utilities.container}>
            <ScrollView>
                <KeyboardAwareScrollView
                    style={{ backgroundColor: 'transparent' }}
                    resetScrollToCoords={{ x: 0, y: 0 }}
                >
                    <View style={{ margin: 25 }}>
                        <Text style={{ fontStyle: "italic" }}>Hosted by:</Text>
                        <View style={{ flexDirection: 'row', marginTop: 5 }}>
                            <Image source={{ uri: route.params.host.profilePicture }} style={{ width: 30, height: 30, borderRadius: 30 / 2, marginRight: 5 }}></Image>
                            <Text style={{ marginTop: 5, fontSize: 18 }}>@{route.params.host.username}</Text>
                        </View>
                    </View>

                    <View style={ {margin: 25, }}>
                        <InputField
                            label="Name of Product"
                            autoCapitalize="words"
                            value={_name}
                            onChangeText={(text) => { setName(text) }}
                            onSubmitEditing={(_type == 1) ? () => valueRef.current.focus() : () => priceRef.current.focus()}
                            required />
                        {(_type == 2) ?
                            <InputField
                                label="Buy It Now Price"
                                keyboardType="number-pad"
                                value={_price.toString()}
                                onChangeText={(text) => { setPrice(text) }}
                                returnKeyType='done'
                                onSubmitEditing={() => numProductsRef.current.focus()}
                                ref={priceRef}
                                required /> :
                            <InputField
                                label="Prize Value"
                                keyboardType="number-pad"
                                value={_value.toString()}
                                onChangeText={(text) => { setValue(text) }}
                                returnKeyType='done'
                                onSubmitEditing={() => goalRef.current.focus()}
                                ref={valueRef}
                                required />
                        }
                        {(_type == 2) ?
                            <InputField
                                label="# of Products Available"
                                keyboardType="number-pad"
                                value={_numProducts.toString()}
                                onChangeText={(text) => { setNumProducts(text) }}
                                returnKeyType='done'
                                onSubmitEditing={() => descriptionRef.current.focus()}
                                ref={numProductsRef}
                                required /> : null}

                        {(_type == 1) ?
                            <InputField
                                label="Donation Goal ($)"
                                keyboardType="number-pad"
                                value={_goal ? _goal.toString() : null}
                                onChangeText={(text) => { setGoal(text) }}
                                returnKeyType='done'
                                onSubmitEditing={() => charityRef.current.focus()}
                                ref={goalRef} /> : null
                        }
                        {(_type == 1) ?
                            <InputField
                                label="Charity Partners (sep. by commas)"
                                autoCapitalize="words"
                                value={_charities.toString()}
                                onChangeText={(text) => {
                                    const cs = text.split(",")
                                    setCharities(cs)
                                    //console.log(_charities)
                                }}
                                onSubmitEditing={() => descriptionRef.current.focus()}
                                ref={charityRef}
                                required /> : null
                        }
                        <InputField
                            label="Description"
                            value={_description}
                            onChangeText={(text) => { setDescription(text) }}
                            ref={descriptionRef}
                            required
                            textArea />

                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '90%', zIndex: 2, marginVertical: 15 }}>
                            <Text style={global.label}>Drawing Duration (Days)*</Text>
                            <Dropdown options={['1', '3', '5', '7', '14', '21', '30']} placeholder={_drawingDuration.toString()} setValue={setDrawingDuration} />
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '90%', zIndex: 1 }}>
                            <Text style={global.label}>Drawing Radius* (mi)</Text>
                            <Dropdown options={['None', 1, 5, 10, 20, 50, 100, 200, 1000]} placeholder={_drawingRadius} setValue={setDrawingRadius} />
                        </View>

                        <View style={{ width: '100%', marginVertical: 15 }}>
                            <Text style={global.label}>Type of Product*</Text>
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
                                    value={_productType || ''}
                                    onChangeText={(text) => { setProductType(text) }}
                                    returnKeyType='done'
                                /> : null}
                        </View>

                        {_productType == 'sneaker' ?
                            <View style={{ height: 75 }}>
                                <Text style={[global.label]}>Available Sizes*</Text>
                                <SizeCarousel sizes={route.params.sizes} type='multiple' default={1} setSize={setSizes} />
                            </View>
                            : null}
                        {_productType == 'clothing' ?
                            <View style={{ height: 75, width: '95%' }}>
                                <Text style={[global.label]}>Available Sizes*</Text>
                                <SizeCarousel sizes={route.params.sizes} type='multiple' default={1} setSize={setSizes} />
                            </View>
                            : null}
                        <View style={{ width: '95%', marginVertical: '5%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Text style={[global.label]}>Product Pictures*</Text>
                            <BlockButton color="secondary" title="CHOOSE" size="small" />
                        </View>

                        {route.params.images.length > 1 ? <ImageCarousel images={images}></ImageCarousel> :
                                <Image source={{ uri: route.params.images[0] }}
                                    style={{ height: Dimensions.get('window').height * 0.3, width: Dimensions.get('window').width, resizeMode: 'contain', marginBottom: '5%' }}></Image>}
                        <View style={{ width: '100%', marginVertical: 10 }}>
                            <Text style={global.label}>Status*</Text>
                            <View style={{ flexDirection: 'row' }}>
                                {['Live', 'Coming Soon', 'Resubmit'].map((status, index) =>
                                    <Checkbox
                                        selected={_status == status}
                                        onPress={() => { 
                                            if (status === 'Live') {
                                                setReason("Your drawing for " + _name + " has been approved and set to live!")
                                            } else if (status === 'Coming Soon') {
                                                setReason("Your drawing for " + _name + " has been approved and is coming soon!")
                                            } else if (status === 'Resubmit') {
                                                setReason("Your drawing for " + _name + " needs to be modified in order to be approved.")
                                            }
                                            
                                            setStatus(status) }}
                                        text={status}
                                    />
                                )}
                            </View>
                        </View>

                        {/* WE NEED THIS FOR ADMIN */}
                        {/* // sup chelly, can u also set the _startTime to the correct format */}
                        {(_status === 'Live') ? <View style={{ width: '100%',  marginTop: 15 }}>
                            <Text style={global.label}>Drawing Time*</Text>
                            <View style={{ width: '95%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Text style={global.label}>{_startTime == null ? "Pick A Start Date" : format_date(new Date(_startTime * 1000))}</Text>
                                <BlockButton color="secondary" size="small" title={(route.params.approved) ? 'CHANGE' : 'CHOOSE'} onPress={showDatePicker} />
                            </View>
                        </View> : null}
                        <DateTimePickerModal
                            isVisible={isDatePickerVisible}
                            mode="datetime"
                            headerTextIOS="Pick a start date"
                            onConfirm={handleConfirm}
                            onCancel={hideDatePicker}
                            pickerContainerStyleIOS={{ backgroundColor: 'white' }}
                        />

                        <InputField
                            label="Response to Host"
                            value={_reason}
                            onChangeText={(text) => { setReason(text)}}
                            required
                            textArea />

                        <Text style={{ color: 'red' }}>{(_status === null) ? "Approved drawings must be either live or coming soon" : null}</Text>
                        <Text style={{ color: 'red' }}>{(_startTime === null && _status === 'Live') ? "Approved drawings must have a starting time" : null}</Text>

                        <BlockButton title={(route.params.approved) ? "EDIT" : "SUBMIT AND NOTIFY HOST"} color="primary" onPress={() => {
                            if (_status !== null && (_status !== 'Live' || _startTime !== null)) {
                                Alert.alert(
                                    "Confirm",
                                    "The raffle will be modified, approved, and publicly posted.",
                                    [
                                        {
                                            text: "OK", onPress: () => {
                                                editRaffle()
                                                // if it was already approved
                                                if (route.params.approved) {
                                                    sendLiveNotif(false)
                                                    navigation.navigate('Active')
                                                } else {
                                                    sendLiveNotif(true)
                                                    navigation.navigate('AdminHome')
                                                }

                                            }
                                        },
                                        {
                                            text: "Cancel", onPress: () => {
                                            }
                                        }
                                    ],
                                    { cancelable: true }
                                );
                            }
                        }} />
                        <TextLink style={{textAlign: 'center'}}title={"Delete Request (Permanent)"} onPress={() => {
                            Alert.alert(
                                "Confirm",
                                "Delete Drawing Permanently",
                                [
                                    {
                                        text: "OK", onPress: () => {
                                            Alert.alert(
                                                "Confirm",
                                                "This action cannot be undone",
                                                [
                                                    {
                                                        text: "YES", onPress: () => {
                                                            deleteRaffle()
                                                            navigation.navigate('AdminHome')

                                                        }
                                                    },
                                                    {
                                                        text: "Cancel", onPress: () => {
                                                        }
                                                    }
                                                ],
                                                { cancelable: true }
                                            );

                                        }
                                    },
                                    {
                                        text: "Cancel", onPress: () => {
                                        }
                                    }
                                ],
                                { cancelable: true }
                            );
                        }}></TextLink>
                    </View>
                </KeyboardAwareScrollView>
            </ScrollView>
            <BottomNav navigation={navigation} active={'AdminHome'} admin={true} />
        </View>

    );
}