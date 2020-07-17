import React, {useState} from 'react'
import {ScrollView, View, Text} from 'react-native'
import InputField from '../../02_Molecules/InputField/InputField'
import BlockButton from '../../01_Atoms/Buttons/BlockButton/BlockButton';
import validator from 'validator'
import {colors, fonts, utilities, dimensions} from '../../../settings/all_settings';

export default function({navigation, route}) {
    const [_name, setName] = useState(route.params.name)
    const [_username, setUsername] = useState(route.params.username)
    const [_address, setAddress] = useState(route.params.address)
    const [_email, setEmail] = useState(route.params.email)
    const [_shoeSize, setShoe] = useState(route.params.shoeSize)
    const [_shirtSize, setShirt] = useState(route.params.shirtSize)

    const [_errors, setErrors] = useState([])

    const data = require('../../IP_ADDRESS.json');

    const editUser = async () => {
        console.log(route.params._id)
        const response = await fetch('http://'+data.ipAddress+':3000/user/edit/'+route.params._id,{
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
        if (!isValidEmail()){
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
        address: _address,
        shoeSize: _shoeSize,
        shirtSize: _shirtSize
        }
        return JSON.stringify(data)
    };

    return (
        <ScrollView>
            <View>
                <Text>Edit Profile</Text>

                <InputField 
                    label="Name" 
                    autoCapitalize="words" 
                    value={_name} 
                    onChangeText={(text) => {setName(text)}}  />

                <InputField 
                    label="Username" 
                    autoCapitalize="words" 
                    value={_username} 
                    onChangeText={(text) => {setUsername(text)}}  />

                <InputField 
                    label="Email" 
                    autoCapitalize="words" 
                    value={_email} 
                    onChangeText={(text) => {setEmail(text)}}  />

                <InputField 
                    label="Address" 
                    autoCapitalize="words" 
                    value={_address} 
                    onChangeText={(text) => {setAddress(text)}}  />

                <InputField 
                    label="Shoe Size" 
                    autoCapitalize="words" 
                    value={_shoeSize} 
                    onChangeText={(text) => {setShoe(text)}}  />

                <InputField 
                    label="Shirt Size" 
                    autoCapitalize="words" 
                    value={_shirtSize} 
                    onChangeText={(text) => {setShirt(text)}}  />
                {_errors}

                <View style={{flexDirection: 'row'}}>
                    <View >
                        <BlockButton
                        title="CANCEL"
                        color="secondary"
                        size="short"
                        onPress={() => navigation.navigate("Profile")}></BlockButton>
                    </View>
                    <View >
                        <BlockButton
                        title="SAVE"
                        color="secondary"
                        size="short"
                        onPress={async () => {
                            if (!generateErrors()) {
                                const userObj = await editUser()
                                if (userObj.keyValue == null) {
                                    navigation.navigate('Profile', userObj)
                                  } else {
                                    console.log('here')
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