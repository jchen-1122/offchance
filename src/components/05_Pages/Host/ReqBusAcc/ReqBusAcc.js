import React, { useState, useContext, useRef, useEffect } from 'react'
import { View, Text, Keyboard, ScrollView, Button, Alert, Image } from 'react-native';
import InputField from '../../../02_Molecules/InputField/InputField';
import BlockButton from '../../../01_Atoms/Buttons/BlockButton/BlockButton';
import Checkbox from '../../../02_Molecules/Checkbox/Checkbox';
import { utilities, fonts } from '../../../../settings/all_settings';
import GlobalState from '../../../globalState'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import AssetUtils from 'expo-asset-utils';
import * as Abuffer from 'base64-arraybuffer';

export default function ReqBusAcc({ navigation }) {
    const { user, setUser } = useContext(GlobalState)
    const [_errors, setErrors] = useState([])
    const [buttonTitle, setButtonTitle] = useState(user.host_item ? '' : 'Submit')

    // local states for form input (i'm not sure if these are redundant heh)
    const [_hostItem, setHostItem] = useState(null)
    const [_hostCharity, setHostCharity] = useState(null)
    const [_hostDetails, setHostDetails] = useState(null)
    const [_hostRaffleType, setHostRaffleType] = useState(null)
    // for bday
    const [_hostMonth, setHostMonth] = useState(null)
    const [_hostDay, setHostDay] = useState(null)
    const [_hostYear, setHostYear] = useState(null)
    const [_hostLicense, setHostLicense] = useState(null)
    const [_license, setLicense] = useState(null)
    const [_licenseURL, setLicenseURL] = useState(null)

    // for going to the next text input
    const charityRef = useRef()
    const detailsRef = useRef()
    const dayRef = useRef()
    const yearRef = useRef()

    const data = require('../../../IP_ADDRESS.json');
    const AWS = require('aws-sdk');

    // gets an "fewer react hooks rendered than expected" error
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <Button onPress={() => {
                    navigation.navigate("HostDashboard")
                }} title="Cancel" />
            ),
            headerRight: () => (
                <Button title={buttonTitle}
                onPress={async () => {
                    generateErrors()
                    if (!generateErrors()) {
                        setButtonTitle('Submitting')
                        _uploadImage()
                        const userObj = await editUser()
                        setUser(userObj)
                        Alert.alert(
                            "Success!",
                            "Your request has been submitted for approval. You will get notified if it gets approved.",
                            [
                                { text: "OK", onPress: () => console.log("OK Pressed") }
                            ],
                            { cancelable: false }
                        );
                        navigation.navigate('Account')
                    }
                }}/>
            ),
        });
    }, [ _hostItem, _hostCharity, _hostDetails, _hostYear, _hostMonth, _hostDay, _hostRaffleType, buttonTitle, _errors]);

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

    const _pickImage = async () => {
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
                    setHostLicense(result.uri)
                    setLicenseURL(user.username + Math.round((new Date()).getTime() / 1000) + '.jpeg')
                    setLicense(<Image source={{ uri: result.uri }} style={{ width: 100, height: 100, marginBottom: 30 }} />)
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

    const _uploadImage = async () => {

        const asset = await AssetUtils.base64forImageUriAsync(_hostLicense);
        const arrayBuffer = Abuffer.decode(asset.data);
        let contentType = 'image/jpeg';

        return cosClient.putObject({
            Bucket: 'oc-drivers-license',
            Key: _licenseURL,
            Body: arrayBuffer,
            ContentType: contentType
        }).promise()
        .then(() => {
            console.log(`Item: testupload created!`);
        })
        .catch((e) => {
            console.error(`ERROR: ${e.code} - ${e.message}\n`);
        })
    };

    // patch request
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

    // makes a json object with all the input fields
    const makeJSON = () => {
        let data = {
            host_item: _hostItem,
            host_charity: _hostCharity,
            host_details: _hostDetails,
            host_birthday: new Date(_hostYear + '-' + _hostMonth + '-' + _hostDay).getTime() / 1000,
            host_raffleType: _hostRaffleType,
            host_license: 'https://oc-drivers-license.s3.us-east.cloud-object-storage.appdomain.cloud/' + _licenseURL
        }
        return JSON.stringify(data)
    };

    // check for any errors in input, returns array of errors
    const generateErrors = () => {
        let errors = []

        if (!_hostItem) {
            errors.push(<Text style={fonts.error}>Please enter in an item.</Text>)
        }
        if (!_hostCharity) {
            errors.push(<Text style={fonts.error}>Please enter in at least one charity.</Text>)
        }
        if (!_hostDay||!_hostMonth||!_hostYear|| // check they filled in year
            parseInt(_hostDay)>31||parseInt(_hostMonth)>12||parseInt(_hostYear)>(new Date).getFullYear()|| // check that dates are possible
            _hostDay.length < 2 || _hostMonth.length < 2 || _hostYear.length < 4){ // check if dates are right length
            errors.push(<Text style={fonts.error}>Please enter in a valid birthday.</Text>)
        }
        if (!_hostRaffleType) {
            errors.push(<Text style={fonts.error}>Please enter what type of drawing you want to host.</Text>)
        }
        if (!_hostLicense) {
            errors.push(<Text style={fonts.error}>Please upload a valid ID card.</Text>)
        }
        setErrors(errors)
        if (errors.length > 0) {
            return true
        } else {
            return false
        }
    }

    // if their request is being processed
    if (user.host_item) {
        return (
            <View style={[utilities.flexCenter, { marginHorizontal: '10%' }]}>
                <Text style={[fonts.h1, { textAlign: 'center' }]}>
                    Your request for a business account is currently being processed.
                </Text>
            </View>
        )
    }

    // if they haven't submitted a request yet
    return (
        <ScrollView>
            <KeyboardAwareScrollView
                style={{ backgroundColor: 'transparent' }}
                resetScrollToCoords={{ x: 0, y: 0 }}>
                <View style={[utilities.flexCenter, { justifyContent: 'flex-start', width: '100%' }]}>
                    <Text style={[fonts.h2, { marginTop: '5%', width: '90%' }]}>Drawing Info</Text>
                    <InputField
                        value={_hostItem}
                        onChangeText={(text) => { setHostItem(text) }}
                        label="Describe the item you would like to use in a drawing"
                        onSubmitEditing={() => charityRef.current.focus()}
                        textArea
                        required />

                    <InputField
                        value={_hostCharity}
                        onChangeText={(text) => { setHostCharity(text) }}
                        label="Please provide the charity/foundation name(s) you are raising donations for"
                        onSubmitEditing={() => detailsRef.current.focus()}
                        ref={charityRef}
                        textArea
                        required />

                    <InputField
                        value={_hostDetails}
                        onChangeText={(text) => { setHostDetails(text) }}
                        label="Please provide any additional details below (business website, social media links)"
                        onSubmitEditing={() => Keyboard.dismiss()}
                        returnKeyType='done'
                        ref={detailsRef}
                        textArea />

                    <View style={{ width: '90%' }}>
                        <Checkbox
                            selected={_hostRaffleType == 1}
                            onPress={() => setHostRaffleType(1)}
                            text="You are an individual that wants to host a Charity drawing" />
                        <Checkbox
                            selected={_hostRaffleType == 2}
                            onPress={() => setHostRaffleType(2)}
                            text="You are a business, retailer or reseller who wants to host an Enter to Buy drawing" />
                        <Text style={[fonts.h2, { marginTop: '5%' }]}>Personal Info</Text>
                        <Text style={fonts.p}>* this info is used to verify identity and distribute funds once drawings are complete. We will never share this information with anyone else</Text>

                        <Text style={[fonts.p, { marginTop: '5%' }]}>Date of Birth</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <InputField
                                style={{ width: '15%', marginRight: '5%' }}
                                value={_hostMonth}
                                keyboardType="numeric"
                                returnKeyType='done'
                                maxLength={2}
                                onChangeText={(text) => { setHostMonth(text) }}
                                onSubmitEditing={() => dayRef.current.focus()}
                                label="MM" />
                            <InputField
                                style={{ width: '15%', marginRight: '5%' }}
                                value={_hostDay}
                                keyboardType="numeric"
                                returnKeyType='done'
                                maxLength={2}
                                onChangeText={(text) => { setHostDay(text) }}
                                onSubmitEditing={() => yearRef.current.focus()}
                                ref={dayRef}
                                label="DD" />
                            <InputField
                                style={{ width: '20%' }}
                                value={_hostYear}
                                maxLength={4}
                                keyboardType="numeric"
                                onChangeText={(text) => { setHostYear(text) }}
                                onSubmitEditing={() => Keyboard.dismiss()}
                                ref={yearRef}
                                returnKeyType='done'
                                label="YYYY" />
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Text style={fonts.p}>Drivers License Picture</Text>
                            <BlockButton
                                color="secondary"
                                title="CHOOSE"
                                size="small" 
                                onPress={async () => {
                                    _pickImage()
                                }}/>
                        </View>
                        {_license}

                        {_errors}
                    </View>

                    {/* <BlockButton
                        color="secondary"
                        title="SUBMIT FOR APPROVAL"
                        onPress={async () => {
                            generateErrors()
                            if (!generateErrors()) {
                                const userObj = await editUser()
                                setUser(userObj)
                                Alert.alert(
                                    "Success!",
                                    "Your request has been submitted for approval. You will get notified if it gets approved.",
                                    [
                                        { text: "OK", onPress: () => console.log("OK Pressed") }
                                    ],
                                    { cancelable: false }
                                );
                                navigation.navigate('Account')
                            }
                        }}
                    /> */}
                </View >
            </KeyboardAwareScrollView>
        </ScrollView>
    );
}
