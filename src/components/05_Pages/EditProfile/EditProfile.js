import React, { useState, useContext } from 'react'
import { ScrollView, View, Text, Image } from 'react-native'
import InputField from '../../02_Molecules/InputField/InputField'
import BlockButton from '../../01_Atoms/Buttons/BlockButton/BlockButton';
import Dropdown from '../../01_Atoms/DropDown/DropDown';
import SizeCarousel from '../../01_Atoms/SizeCarousel/SizeCarousel';
import Checkbox from '../../02_Molecules/Checkbox/Checkbox';
import validator from 'validator'
import { colors, fonts, utilities, dimensions } from '../../../settings/all_settings';
import GlobalState from '../../globalState'
import { styles } from './EditProfile.styling'

export default function ({ navigation }) {
    var shirtSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']
    var shoeSizes = [];
    for (var i = 4; i <= 14; i += 0.5) {
        shoeSizes.push(i.toString())
    }

    const { user, setUser } = useContext(GlobalState)
    const [_name, setName] = useState(user.name)
    const [_username, setUsername] = useState(user.username)
    const [_address, setAddress] = useState(user.shippingAddress)
    const [_email, setEmail] = useState(user.email)
    const [_shoeSize, setShoeSize] = useState(user.shoeSize != null ? user.shoeSize : "")
    const [_shirtSize, setShirtSize] = useState(user.shirtSize != null ? user.shirtSize : "")
    const [_sizeType, setSizeType] = useState(user.sizeType != null ? user.sizeType : "")
    const [_errors, setErrors] = useState([])

    const data = require('../../IP_ADDRESS.json');

    const editUser = async () => {
        const response = await fetch('http://' + data.ipAddress + ':3000/user/edit/' + user._id, {
            method: "PATCH",
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
        let data = {
            name: _name,
            username: _username,
            email: _email,
            shippingAddress: _address,
            shoeSize: _shoeSize,
            shirtSize: _shirtSize,
            sizeType: _sizeType
        }
        return JSON.stringify(data)
    };

    return (
        <ScrollView>
            <View style={{ zIndex: 5 }}>
                <Image source={{ uri: user.profilePicture }} style={styles.profilePic}></Image>
                <View style={styles.inputs}>
                    <InputField
                        label="Name"
                        autoCapitalize="words"
                        value={_name}
                        onChangeText={(text) => { setName(text) }} />

                    <InputField
                        label="Username"
                        autoCapitalize="words"
                        value={_username}
                        onChangeText={(text) => { setUsername(text) }} />

                    <InputField
                        label="Email"
                        autoCapitalize="words"
                        value={_email}
                        onChangeText={(text) => { setEmail(text) }} />

                    <InputField
                        label="Shipping Address"
                        autoCapitalize="words"
                        value={_address}
                        onChangeText={(text) => { setAddress(text) }} />

                    <View style={{ marginVertical: '5%' }}>
                        <Text style={styles.label}>Size Type</Text>
                        <View style={{flexDirection: 'row'}}>
                        {['male', 'female', 'youth'].map((type, index) =>
                            <Checkbox
                                selected={_sizeType == type}
                                onPress={() => setSizeType(type)}
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
                            onPress={() => { navigation.navigate("Profile"); console.log(_shoeSize) }}></BlockButton>
                    </View>

                    <View >
                        <BlockButton
                            title="SAVE"
                            color="secondary"
                            size="short"
                            onPress={async () => {
                                if (!generateErrors()) {
                                    const userObj = await editUser()
                                    console.log(userObj)
                                    setUser(userObj)
                                    if (userObj.keyValue == null) {
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
                            }}></BlockButton>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}