import React, { useState, useContext, useRef } from 'react';
import { View, Text, Alert, Keyboard, Button, Image } from 'react-native';
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
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import AssetUtils from 'expo-asset-utils';
import * as Abuffer from 'base64-arraybuffer';

export default function NewRaffle({ navigation, route }) {
    var _type = route.params.type
    var shirtSizes = ['S', 'M', 'L', 'XL']
    var shoeSizes = [];
    for (var i = 4; i <= 14; i += 0.5) {
        shoeSizes.push(i.toString())
    }

    const [buttonTitle, setButtonTitle] = useState('Submit')
    // states for each input value
    const [_name, setName] = useState(null)
    const [_price, setPrice] = useState(null)
    const [_value, setValue] = useState(null)
    const [_numProducts, setNumProducts] = useState(null)
    const [_description, setDescription] = useState(null)
    const [_goal, setGoal] = useState(null)
    const [_charities, setCharities] = useState([])
    const [_sizeTypes, setSizeTypes] = useState(['One Size'])
    const [_sizes, setSizes] = useState(['One Size'])
    const [_productType, setProductType] = useState('sneaker')
    const [_drawingDuration, setDrawingDuration] = useState(null)
    const [_drawingRadius, setDrawingRadius] = useState(null)
    const [_address, setAddress] = useState(null)
    const [_charityImg, setCharityImg] = useState([])
    const [_previewImg, setPreviewImg] = useState([])
    const [_charityName, setCharityName] = useState([])
    const [_productImg, setProductImg] = useState([])
    const [_productprevImg, setProductPrevImg] = useState([])
    const [_productName, setProductName] = useState([])
    const [_errors, setErrors] = useState([])
    // only for admin
    const [_startTime, setStartTime] = useState(null)
    const [_status, setStatus] = useState(null)

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
        // date = new Date(date).getTime() / 1000
        setStartTime(date)
        hideDatePicker();
    };

    const admins = require('../../../05_Pages/Home/Admin/admin_emails.json')
    const productTypes = ['sneaker', 'clothing', 'collectibles', 'art']
    const { user, setUser } = useContext(GlobalState)
    //console.log(typeof user._id)

    // METHOD FOR POSTING RAFFLE
    const AWS = require('aws-sdk');
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
        console.log(json)
        return json
    }

    async function getPermissionAsync() {
        if (Constants.platform.ios) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
                return false;
            }
        }
        return true;
    }

    const _pickImage = async (char) => {
        //console.log(char)
        if (await getPermissionAsync()) {
            try {
                let result = await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.All,
                    allowsEditing: true,
                    allowsMultipleSelection: true,
                    aspect: [4, 3],
                    quality: 1,
                });
                if (!result.cancelled) {
                    //setNewimg(result.uri);
                    if (char) {
                        var temp = _charityImg
                        temp.push(result.uri)
                        //console.log(temp)
                        setCharityImg(temp)
                        setPreviewImg(_charityImg.map((charimg) =>
                            <Image source={{ uri: charimg }} style={{ width: 100, height: 100 }} />))
                    }
                    else {
                        var temp = _productImg
                        temp.push(result.uri)
                        //console.log(temp)
                        setProductImg(temp)
                        setProductPrevImg(_productImg.map((prodimg) =>
                            <Image source={{ uri: prodimg }} style={{ width: 100, height: 100 }} />))
                    }
                    //setImgname(_username + Math.round((new Date()).getTime() / 1000) + '.jpeg')
                }

                //console.log(result);
            } catch (E) {
                console.log(E);
            }
        }
    };

    AWS.config = new AWS.Config({
        accessKeyId: data.IBMaccessKeyId,
        secretAccessKey: data.IBMsecretAccessKey,
        endpoint: 's3.us-east.cloud-object-storage.appdomain.cloud',
        region: 'us-east-standard'
    });

    const cosClient = new AWS.S3();

    const _multiUpload = () => {
        console.log(user.username)
        let imgname = user.username + Math.round((new Date()).getTime() / 1000)
        _charityImg.map((charimg, index) => {
            _uploadImage(charimg, 'oc-charity-images', index, imgname)
            let temp = _charityName
            temp.push('https://oc-charity-images.s3.us-east.cloud-object-storage.appdomain.cloud/' + imgname + '-' + index + '.jpeg')
            setCharityName(temp)
        })
        _productImg.map((prodimg, index) => {
            _uploadImage(prodimg, 'oc-drawing-images', index, imgname)
            let temp = _productName
            temp.push('https://oc-drawing-images.s3.us-east.cloud-object-storage.appdomain.cloud/' + imgname + '-' + index + '.jpeg')
            setProductName(temp)
        })
    };

    const _uploadImage = async (imguri, bucketname, index, imgname) => {
        //console.log(imgname + '-' + index + '.jpeg')
        const asset = await AssetUtils.base64forImageUriAsync(imguri);
        const arrayBuffer = Abuffer.decode(asset.data);
        let contentType = 'image/jpeg';
        //console.log(arrayBuffer)
        //const { localUri, width, height } = asset;
        return cosClient.putObject({
            Bucket: bucketname,
            Key: imgname + '-' + index + '.jpeg',
            Body: arrayBuffer,
            ContentType: contentType
        }).promise()
            .then(() => {
                console.log('Item: created!');
            })
            .catch((e) => {
                console.error(`ERROR: ${e.code} - ${e.message}\n`);
            })
    };

    //   // states for each input value
    //   const [_email, setEmail] = useState(null)
    //   const [_password, setPassword] = useState(null)
    //   const [_errors, setErrors] = useState([])

    //   // validates email input
    //   const isValidEmail = () => {
    //     return validator.isEmail(String(_email).toLowerCase());
    //   }

       // check for any errors in input, returns array of errors
    const generateErrors = () => {
        let errors = []
        switch(_type) {
            case 1:
                if (!_value) {
                    errors.push(<Text style={fonts.error}>Please Fill In Product Value</Text>)
                }
                if (_charities.length == 0) {
                    errors.push(<Text style={fonts.error}>Please List Charities To Donate To</Text>)
                }
                // CHECK CHARITY IMAGES, Currently we are not doing anything with the images..
                if (_charityImg.length == 0) {
                    errors.push(<Text style={fonts.error}>Charity Images</Text>)
                }
                break;
            case 2:
                if (!_price) {
                    errors.push(<Text style={fonts.error}>Please Fill In Purchase Price</Text>)
                }
                if (!_numProducts) {
                    errors.push(<Text style={fonts.error}>Please Input Amount of Products</Text>)
                }
                break;
        }
        if (!_name) {
            errors.push(<Text style={fonts.error}>Please Fill in Product Name</Text>)
        }
        if (!_description) {
            errors.push(<Text style={fonts.error}>Please Provide a Description</Text>)
        }
        if (!_drawingDuration) {
            errors.push(<Text style={fonts.error}>Please Specify Drawing Duration</Text>)
        }
        if (!_drawingRadius) {
            errors.push(<Text style={fonts.error}>Please Specify Drawing Radius</Text>)
        }
        if (_drawingRadius != null && _drawingRadius != 'None' && !_address) {
            errors.push(<Text style={fonts.error}>Please Fill In Address</Text>)
        }
        if ((_productType == 'sneaker' || _productType == 'clothing') && !_sizes) {
            errors.push(<Text style={fonts.error}>Please Input Product Sizes</Text>)
        }
        if (_productImg.length == 0) {
            errors.push(<Text style={fonts.error}>Please Upload Images</Text>)
        }
         // if not a valid email
        setErrors(errors)
        if (errors.length == 0) {
            return false
        }
        return true
   }

    // makes a json object with all the input fields
    const makeJSON = () => {
        let data = {
            type: _type,
            hostedBy: user._id,
            name: _name,
            productPrice: _price,
            valuedAt: _value,
            numProducts: _numProducts,
            description: _description,
            donationGoal: _goal,
            charities: (_charities.length > 0) ? _charities.split(',').map(item => item.trim()) : null,
            productType: _productType,
            drawingDuration: _drawingDuration,
            radius: _drawingRadius === 'None' ? 25000 : _drawingRadius,
            address: _address,
            images: _productName,
            sizeTypes: _sizeTypes,
            sizes: _sizes,
            startTime: (_startTime == null) ? null : new Date(_startTime).getTime() / 1000,
            live: (_status == 'Live') ? true: (_status == 'Coming Soon') ? false : null,
            approved: (admins.admins.includes(user.email)) ? true : false
        }
        return JSON.stringify(data)
    };
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <Button onPress={() => {
                    navigation.navigate("HostDashboard")
                }} title="Cancel" />
            ),
            headerRight: () => (
                <Button title={buttonTitle}
                    disabled={buttonTitle=='Submitting'}
                    onPress={() => {
                        if (!generateErrors()) {
                            setButtonTitle('Submitting')
                            _multiUpload()
                            postRaffle()
                            Alert.alert(
                                "Success!",
                                "Your drawing has been submitted for approval. You will get notified if it gets approved.",
                                [
                                    { text: "OK", onPress: () => console.log("OK Pressed") }
                                ],
                                { cancelable: false }
                            );
                            navigation.navigate('HostDashboard')
                        } else {
                            Alert.alert(
                                "Error",
                                "Please fill in all required fields.",
                                [
                                    { text: "OK", onPress: () => console.log("OK Pressed") }
                                ],
                                { cancelable: false }
                            );
                        }
                    }} />
            ),
        });
    }, [_type, _name, _price, _value, _numProducts, _description, _goal, _charities, _productType, _drawingDuration, _drawingRadius, _address, _sizeTypes, _sizes, buttonTitle]);

    let adminContent;
    if (admins.admins.includes(user.email)) {
        adminContent = (
            <View style={{width: '90%'}}>
                <View style={{ width: '100%', marginTop: 15 }}>
                    <Text style={styles.InputField__label}>Drawing Time*</Text>
                    <View style={{ width: '105%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={styles.InputField__label}>{_startTime == null ? "Pick A Start Date" : format_date(_startTime)}</Text>
                        <BlockButton color="secondary" size="small" title={'CHOOSE'} onPress={showDatePicker} />
                    </View>
                </View>
                <View style={{ width: '100%', marginVertical: 10 }}>
                    <Text style={styles.InputField__label}>Status*</Text>
                    <View style={{ flexDirection: 'row' }}>
                        {['Live', 'Coming Soon'].map((status, index) =>
                            <Checkbox
                                selected={_status == status}
                                onPress={() => { setStatus(status) }}
                                text={status}
                            />
                        )}
                    </View>
                </View>
                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="datetime"
                    headerTextIOS="Pick a start date"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                    pickerContainerStyleIOS={{ backgroundColor: 'white' }}
                />
            </View>
        )
    }
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
                            onSubmitEditing={(_type == 1) ? () => valueRef.current.focus() : () => priceRef.current.focus()}
                            required />
                        {(_type == 2) ?
                            <InputField
                                label="Buy It Now Price"
                                keyboardType="decimal-pad"
                                value={_price}
                                onChangeText={(text) => { setPrice(text) }}
                                returnKeyType='done'
                                onSubmitEditing={() => numProductsRef.current.focus()}
                                ref={priceRef}
                                required /> :
                            <InputField
                                label="Prize Value"
                                keyboardType="decimal-pad"
                                value={_value}
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
                                value={_numProducts}
                                onChangeText={(text) => { setNumProducts(text) }}
                                returnKeyType='done'
                                onSubmitEditing={() => descriptionRef.current.focus()}
                                ref={numProductsRef}
                                required /> : null}

                        {(_type == 1) ?
                            <InputField
                                label="Donation Goal ($)"
                                keyboardType="decimal-pad"
                                value={_goal}
                                onChangeText={(text) => { setGoal(text) }}
                                returnKeyType='done'
                                onSubmitEditing={() => charityRef.current.focus()}
                                ref={goalRef} /> : null
                        }
                        {(_type == 1) ?
                            <InputField
                                label="Charity Partners (sep. by commas)"
                                autoCapitalize="words"
                                value={_charities}
                                onChangeText={(text) => { setCharities(text) }}
                                onSubmitEditing={() => descriptionRef.current.focus()}
                                ref={charityRef}
                                required /> : null
                        }
                        {(_type == 1) ?
                            <View style={{ width: '95%', marginLeft: '5%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Text style={[styles.InputField__label]}>Charity Partner Logos*</Text>
                                <BlockButton color="secondary" title={_charityImg.length < 4 ? "CHOOSE" : "MAX 4"} size="small" onPress={async () => {
                                    if (_charityImg.length < 4) _pickImage(true)
                                }} />
                            </View> : null
                        }
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            {_previewImg}
                        </View>
                        <InputField
                            label="Description"
                            value={_description}
                            onChangeText={(text) => { setDescription(text) }}
                            ref={descriptionRef}
                            returnKeyType='done'
                            onSubmitEditing={() => Keyboard.dismiss()}
                            required
                            textArea />

                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '90%', zIndex: 2 }}>
                            <Text style={styles.InputField__label}>Drawing Duration (Days)*</Text>
                            <Dropdown options={['1', '3', '5', '7', '14', '21', '30']} placeholder={"Days"} setValue={setDrawingDuration}/>
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '90%', zIndex: 1 }}>
                            <Text style={styles.InputField__label}>Drawing Radius* (mi)</Text>
                            <Dropdown options={['None', '1', '5', '10', '20', '50', '100', '200', '1000']} placeholder="Miles" setValue={setDrawingRadius}/>
                        </View>
                        <InputField
                            label={'Store Address' + ((_drawingRadius && _drawingRadius != 'None') ? '*' : '')}
                            autoCapitalize="words"
                            value={_address}
                            onChangeText={(text) => { setAddress(text) }} />

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
                                    onSubmitEditing={() => Keyboard.dismiss()} /> : null}
                        </View>

                        {_productType == 'sneaker' ?
                            <View style={{ height: 75, marginLeft: '5%' }}>
                                <Text style={[styles.InputField__label]}>Available Sizes*</Text>
                                <SizeCarousel sizes={shoeSizes} type='multiple' default={1} setSize={setSizes} />
                            </View>
                            : null}
                        {_productType == 'clothing' ?
                            <View style={{ height: 75, marginLeft: '5%', width: '95%' }}>
                                <Text style={[styles.InputField__label]}>Available Sizes*</Text>
                                <SizeCarousel sizes={shirtSizes} type='multiple' default={1} setSize={setSizes} />
                            </View>
                            : null}
                        <View style={{ width: '95%', marginLeft: '5%', marginVertical: '5%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Text style={[styles.InputField__label]}>Product Pictures*</Text>
                            <BlockButton color="secondary" title="CHOOSE" size="small" onPress={async () => {
                                if (_productImg.length < 4) _pickImage(false)
                            }} />
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            {_productprevImg}
                        </View>
                        {adminContent}
                        {_errors}

                    </View>
                </KeyboardAwareScrollView>
            </ScrollView>
            <BottomNav navigation={navigation} active={'Home'} />
        </View>

    );
}