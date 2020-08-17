import React, { useState, useContext, useRef } from 'react'
import { ScrollView, View, Text, Image, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, TouchableOpacity, Button, Alert } from 'react-native'
import InputField from '../../../02_Molecules/InputField/InputField'
import BlockButton from '../../../01_Atoms/Buttons/BlockButton/BlockButton';
import SizeCarousel from '../../../01_Atoms/SizeCarousel/SizeCarousel';
import Checkbox from '../../../02_Molecules/Checkbox/Checkbox';
import validator from 'validator'
import { colors, fonts, utilities, dimensions } from '../../../../settings/all_settings';
import GlobalState from '../../../globalState'
import { styles } from './EditProfile.styling'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import AssetUtils from 'expo-asset-utils';
import * as Abuffer from 'base64-arraybuffer';

export default function ({ navigation }) {
    var shirtSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']
    var shoeSizes = [];
    for (var i = 4; i <= 14; i += 0.5) {
        shoeSizes.push(i.toString())
    }

    const AWS = require('aws-sdk');
    const [buttonTitle, setButtonTitle] = useState('Save')

    const { user, setUser } = useContext(GlobalState)
    const [_name, setName] = useState(user.name)
    const [_username, setUsername] = useState(user.username)
    const [_address, setAddress] = useState(user.shippingAddress)
    const [_email, setEmail] = useState(user.email)
    const [_shoeSize, setShoeSize] = useState(user.shoeSize != null ? user.shoeSize : "")
    const [_shirtSize, setShirtSize] = useState(user.shirtSize != null ? user.shirtSize : "")
    const [_sizeType, setSizeType] = useState(user.sizeType != null ? user.sizeType : "")
    const [_errors, setErrors] = useState([])
    const [_newimg, setNewimg] = useState(null)
    const [_imgname, setImgname] = useState(user.profilePicture)

    // for going to the next text input
    const usernameRef = useRef()
    const emailRef = useRef()
    const addressRef = useRef()

    const [modifyMode, setModifyMode] = useState(false)

    const data = require('../../../IP_ADDRESS.json');

    async function getPermissionAsync() {
        if (Constants.platform.ios) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
                return true;
            }
        }
        return false;
    }

    const _pickImage = async () => {
        if (await getPermissionAsync()) return;
        try {
          let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
          });
          if (!result.cancelled) {
            setNewimg(result.uri);
            setImgname(_username + Math.round((new Date()).getTime() / 1000) + '.jpeg')
          }

          //console.log(result);
        } catch (E) {
            console.log(E);
        }
    };

    AWS.config = new AWS.Config({
        accessKeyId: data.IBMaccessKeyId,
        secretAccessKey: data.IBMsecretAccessKey,
        endpoint: 's3.us-east.cloud-object-storage.appdomain.cloud',
        region: 'us-east-standard'
    });

    const cosClient = new AWS.S3();

    const _uploadImage = async () => {

        const asset = await AssetUtils.base64forImageUriAsync(_newimg);
        const arrayBuffer = Abuffer.decode(asset.data);
        let contentType = 'image/jpeg';
        //console.log(arrayBuffer)
        //const { localUri, width, height } = asset;
        return cosClient.putObject({
            Bucket: 'oc-profile-pictures',
            Key: _imgname,
            Body: arrayBuffer,
            ContentType: contentType
        }).promise()
            .then(() => {
                console.log('Item: ' + _imgname + ' created!');
            })
            .catch((e) => {
                console.error(`ERROR: ${e.code} - ${e.message}\n`);
            })
    };

    const _delImage = (itemName) => {
        //console.log(itemName.substring(itemName.lastIndexOf('/')))
        if (itemName.includes('default-avatar')) {
            console.log('====== CHECK IF THIS IS DEFAULT IMG ======')
            console.log(itemName)
            return
        }
        return cosClient.deleteObject({
            Bucket: 'oc-profile-pictures',
            Key: itemName.substring(itemName.lastIndexOf('/') + 1)
        }).promise()
            .catch((e) => {
                console.error(`ERROR: ${e.code} - ${e.message}\n`);
            });
    };

    const editUser = async () => {
        const response = await fetch('http://' + data.ipAddress + '/user/edit/' + user._id, {
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

    // validates email input
    const isValidEmail = () => {
        return validator.isEmail(String(_email).toLowerCase());
    }

    // check for any errors in input, returns array of errors
    const generateErrors = () => {
        let errors = []
        // if not a valid email
        if (!isValidEmail()) {
            errors.push(<Text style={fonts.error}>Email is not valid</Text>)
        }
        setErrors(errors)
        if (errors.length > 0) {
            return true
        } else {
            return false
        }
    }

    // makes a json object with all the input fields
    const makeJSON = () => {
        let newdata = {
            name: _name,
            username: _username,
            email: _email,
            shippingAddress: _address,
            shoeSize: _shoeSize,
            shirtSize: _shirtSize,
            sizeType: _sizeType,
            profilePicture: "https://oc-profile-pictures.s3.us-east.cloud-object-storage.appdomain.cloud/" + _imgname
        }
        let data = {
            name: _name,
            username: _username,
            email: _email,
            shippingAddress: _address,
            shoeSize: _shoeSize,
            shirtSize: _shirtSize,
            sizeType: _sizeType,
        }
        if (_newimg == null) return JSON.stringify(data)
        return JSON.stringify(newdata)
    };

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <Button onPress={() => {
                    navigation.navigate("Profile")
                }} title="Cancel" />
            ),
            headerRight: () => (
                <Button title={buttonTitle}
                onPress={async () => {
                    if (!generateErrors()) {
                        setButtonTitle("Saving")
                        if (_newimg != null) await _uploadImage()
                        const userObj = await editUser()
                        if (userObj.keyValue == null) {
                            _delImage(user.profilePicture)
                            setUser(userObj)
                            Alert.alert(
                                "Success!",
                                "Your profile has been saved",
                                [
                                  { text: "OK", onPress: () => console.log("OK Pressed") }
                                ],
                                { cancelable: false }
                              );
                            navigation.navigate('Profile')
                        } else {
                            let errors = []
                            let errMsg = ""
                            if (userObj.keyValue.username) {
                                errMsg = "Username is taken. Please try again."
                            } else if (userObj.keyValue.email) {
                                errMsg = "Email is taken."
                            }
                            errors.push(<Text style={fonts.error}>{errMsg}</Text>)
                            setErrors(errors)
                        }
                    }
                }}/>
            ),
        });
    }, [navigation,_name, _username,_email,_address, _shoeSize, _shirtSize,_sizeType, _imgname, buttonTitle]);
    return (
        <ScrollView>
            <KeyboardAwareScrollView
                style={{ backgroundColor: 'transparent' }}
                resetScrollToCoords={{ x: 0, y: 0 }}>
                    
                <View style={{ zIndex: 5 }}>
                    <TouchableOpacity onPress={() => {
                        _pickImage()
                    }}>
                        <Image source={(_newimg == null) ? { uri: user.profilePicture } : { uri: _newimg }} style={styles.profilePic}></Image>
                    </TouchableOpacity>
                    <View style={styles.inputs}>
                        <InputField
                            label="Name"
                            autoCapitalize="words"
                            value={_name}
                            onSubmitEditing={() => usernameRef.current.focus()}
                            onChangeText={(text) => { setName(text) }} />

                        <InputField
                            label="Username"
                            autoCapitalize="words"
                            value={_username}
                            onChangeText={(text) => { setUsername(text) }}
                            onSubmitEditing={() => emailRef.current.focus()}
                            ref={usernameRef} />

                        <InputField
                            label="Email"
                            autoCapitalize="words"
                            value={_email}
                            onChangeText={(text) => { setEmail(text) }}
                            onSubmitEditing={() => addressRef.current.focus()}
                            ref={emailRef} />

                        <InputField
                            label="Shipping Address"
                            autoCapitalize="words"
                            value={_address}
                            onChangeText={(text) => { setAddress(text) }}
                            onSubmitEditing={() => Keyboard.dismiss()}
                            returnKeyType='done'
                            ref={addressRef} />

                        <View style={{ marginVertical: '5%' }}>
                            <Text style={styles.label}>Size Type</Text>
                            <View style={{ flexDirection: 'row' }}>
                                {['male', 'female', 'both'].map((type, index) =>
                                    <Checkbox
                                        selected={_sizeType == type}
                                        onPress={() => {setSizeType(type)}}
                                        text={type.charAt(0).toUpperCase() + type.slice(1)}
                                    />
                                )}
                            </View>
                            <Text style={[styles.label, { marginTop: '5%' }]}>Shirt Size</Text>
                            <SizeCarousel sizes={shirtSizes} default={_shirtSize} type='single' setSize={setShirtSize} />
                            <Text style={[styles.label, { marginTop: '5%' }]}>Shirt Size</Text>
                            <SizeCarousel sizes={shoeSizes} default={_shoeSize} type='single' setSize={setShoeSize} />
                        </View>

                    </View>
                    {_errors}

                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <View >
                            <BlockButton
                                title="CANCEL"
                                color="secondary"
                                size="short"
                                onPress={() => { navigation.navigate("Profile") }}></BlockButton>
                        </View>

                        <View >
                            <BlockButton
                                title="SAVE"
                                color="secondary"
                                size="short"
                                onPress={async () => {
                                    if (!generateErrors()) {
                                        if (_newimg != null) await _uploadImage()
                                        const userObj = await editUser()
                                        if (userObj.keyValue == null) {
                                            _delImage(user.profilePicture)
                                            setUser(userObj)
                                            navigation.navigate('Profile')
                                        } else {
                                            let errors = []
                                            let errMsg = ""
                                            if (userObj.keyValue.username) {
                                                errMsg = "Username is taken. Please try again."
                                            } else if (userObj.keyValue.email) {
                                                errMsg = "Email is taken."
                                            }
                                            errors.push(<Text style={fonts.error}>{errMsg}</Text>)
                                            setErrors(errors)
                                        }
                                        errors.push(<Text style={fonts.error}>{errMsg}</Text>)
                                        setErrors(errors)
                                    }
                                }
                            }></BlockButton>
                        </View>
                    </View>
                </View>
            </KeyboardAwareScrollView>
        </ScrollView>
    )
}
