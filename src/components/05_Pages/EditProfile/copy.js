import React, {useState, useContext} from 'react'
import {ScrollView, View, Text, Image, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard} from 'react-native'
import { Icon } from 'react-native-elements';
import InputField from '../../02_Molecules/InputField/InputField'
import BlockButton from '../../01_Atoms/Buttons/BlockButton/BlockButton';
import Dropdown from '../../01_Atoms/DropDown/DropDown'
import validator from 'validator'
import {colors, fonts, utilities, dimensions} from '../../../settings/all_settings';
import GlobalState from '../../globalState'
import {styles} from './EditProfile.styling'

export default function({navigation}) {
    var shirtSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']
    const {user, setUser} = useContext(GlobalState)
    const [_name, setName] = useState(user.name)
    const [_username, setUsername] = useState(user.username)
    const [_address, setAddress] = useState(user.shippingAddress)
    const [_email, setEmail] = useState(user.email)
    const [_shoeSize, setShoe] = useState(user.shoeSize != null ? user.shoeSize : "")
    const [_shirtSize, setShirt] = useState(user.shirtSize != null ? user.shirtSize: "")
    const [_payment, setPayment] = useState('**** **** **** 1234') // TODO

    const [_errors, setErrors] = useState([])

    const [modifyMode, setModifyMode] = useState(false)

    const data = require('../../IP_ADDRESS.json');

    const editUser = async () => {
        const response = await fetch('http://'+data.ipAddress+'/user/edit/'+user._id,{
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
        shippingAddress: _address,
        shoeSize: _shoeSize,
        shirtSize: _shirtSize
        }
        return JSON.stringify(data)
    };

    return (
        <ScrollView>
            <View style={{zIndex: 5}}>
                <Image source={{uri:user.profilePicture}} style={styles.profilePic}></Image>
                <View style={styles.inputs}>
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
                    value={_shoeSize.toString()}
                    onChangeText={(text) => {setShoe(text)}}  />

                {/* <InputField
                    label="Shirt Size"
                    autoCapitalize="words"
                    value={_shirtSize.toString()}
                    onChangeText={(text) => {setShirt(text)}}  /> */}
                <View style={{zIndex: 5}}>
                    <Text style={{fontSize: 16, marginBottom: 5, fontWeight: '500'}}>Shirt Size</Text>
                    <View style={{zIndex: 10, marginBottom: 10}}>
                        <Dropdown options={shirtSizes} size="small" set_us_state={setShirt}/>
                    </View>
                </View>

                {/* TODO: Payment */}
                <View style={{zIndex: 5, justifyContent:'center', alignItems:'flex-start', }}>
                    <Text style={{fontSize: 16, marginBottom: '5%', marginTop: '5%', fontWeight: '700'}}>Payment Information</Text>
                </View>


                {/* TODO: Limit card number length */}
                {modifyMode ?
                    <View style={styles.paymentStyle}>
                        <InputField
                        value={_payment}
                        keyboardType = 'numeric'
                        onChangeText={(text) => {setPayment(text)}}/>
                        <Icon name={'check'}
                              type='octicon'
                              color={colors.primaryColor}
                              backgroundColor='transparent'
                              size={30}
                              style={{marginLeft:20, marginBottom:15}}
                              onPress={() => {setModifyMode(!modifyMode)}}/>
                    </View>
                             :
                    <View style={styles.paymentStyle}>
                        <Text style={{fontSize: 16, marginBottom: 5, fontWeight: '500'}}>{'**** **** **** ' + _payment.slice(-4)}</Text>
                        <View style={{flexDirection: 'row',}}>
                            <Icon name={'pencil'}
                                  type='octicon'
                                  color={'grey'}
                                  backgroundColor='transparent'
                                  size={22}
                                  onPress={() => {setModifyMode(!modifyMode)}} />
                            <Icon name={'trashcan'}
                                  type='octicon'
                                  color={'grey'}
                                  backgroundColor='transparent'
                                  size={22}
                                  style={{marginLeft:10, }}
                                  />
                        </View>
                    </View> }

                <View style={{marginLeft: '-3%'}}>
                    <BlockButton
                    title="ADD PAYMENT"
                    color="secondary"
                    size="short"
                    onPress={() => toggleSheet()}/>
                </View>


                </View>
                {_errors}

                <View style={{flexDirection: 'row', marginLeft: 20, zIndex:-1}}>
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

import React, {useState, useContext} from 'react'
import {ScrollView, View, Text, Image, KeyboardAvoidingView, } from 'react-native'
import { Icon } from 'react-native-elements';
import InputField from '../../02_Molecules/InputField/InputField'
import BlockButton from '../../01_Atoms/Buttons/BlockButton/BlockButton';
import Dropdown from '../../01_Atoms/DropDown/DropDown'
import validator from 'validator'
import {colors, fonts, utilities, dimensions} from '../../../settings/all_settings';
import GlobalState from '../../globalState'
import {styles} from './EditProfile.styling'

export default function({navigation}) {
    var shirtSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']
    const {user, setUser} = useContext(GlobalState)
    const [_name, setName] = useState(user.name)
    const [_username, setUsername] = useState(user.username)
    const [_address, setAddress] = useState(user.shippingAddress)
    const [_email, setEmail] = useState(user.email)
    const [_shoeSize, setShoe] = useState(user.shoeSize != null ? user.shoeSize : "")
    const [_shirtSize, setShirt] = useState(user.shirtSize != null ? user.shirtSize: "")
    const [_payment, setPayment] = useState('**** **** **** 1234') // TODO

    const [_errors, setErrors] = useState([])

    const [modifyMode, setModifyMode] = useState(false)

    const data = require('../../IP_ADDRESS.json');

    const editUser = async () => {
        const response = await fetch('http://'+data.ipAddress+'/user/edit/'+user._id,{
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
        shippingAddress: _address,
        shoeSize: _shoeSize,
        shirtSize: _shirtSize
        }
        return JSON.stringify(data)
    };

    return (
      <KeyboardAvoidingView
        behavior={"padding"}
        keyboardVerticalOffset={100}
        style={{ flex: 1, }}>

        <View style={{justifyContent: "flex-end", flex: 1}}>

          <ScrollView>
              <View style={{zIndex: 5}}>
                  <Image source={{uri:user.profilePicture}} style={styles.profilePic}></Image>
                  <View style={styles.inputs}>
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
                      value={_shoeSize.toString()}
                      onChangeText={(text) => {setShoe(text)}}  />

                  {/* <InputField
                      label="Shirt Size"
                      autoCapitalize="words"
                      value={_shirtSize.toString()}
                      onChangeText={(text) => {setShirt(text)}}  /> */}
                  <View style={{zIndex: 5}}>
                      <Text style={{fontSize: 16, marginBottom: 5, fontWeight: '500'}}>Shirt Size</Text>
                      <View style={{zIndex: 10, marginBottom: 10}}>
                          <Dropdown options={shirtSizes} size="small" set_us_state={setShirt}/>
                      </View>
                  </View>

                  {/* TODO: Payment */}
                  <View style={{zIndex: 5, justifyContent:'center', alignItems:'flex-start', }}>
                      <Text style={{fontSize: 16, marginBottom: '5%', marginTop: '5%', fontWeight: '700'}}>Payment Information</Text>
                  </View>


                  {/* TODO: Limit card number length */}
                  {modifyMode ?

                      <View style={styles.paymentStyle}>

                          <InputField
                          value={_payment}
                          keyboardType = 'numeric'
                          onChangeText={(text) => {setPayment(text)}}/>


                          <Icon name={'check'}
                                type='octicon'
                                color={colors.primaryColor}
                                backgroundColor='transparent'
                                size={30}
                                style={{marginLeft:20, marginBottom:15}}
                                onPress={() => {setModifyMode(!modifyMode)}}/>

                      </View>

                               :
                      <View style={styles.paymentStyle}>
                          <Text style={{fontSize: 16, marginBottom: 5, fontWeight: '500'}}>{'**** **** **** ' + _payment.slice(-4)}</Text>
                          <View style={{flexDirection: 'row',}}>
                              <Icon name={'pencil'}
                                    type='octicon'
                                    color={'grey'}
                                    backgroundColor='transparent'
                                    size={22}
                                    onPress={() => {setModifyMode(!modifyMode)}} />
                              <Icon name={'trashcan'}
                                    type='octicon'
                                    color={'grey'}
                                    backgroundColor='transparent'
                                    size={22}
                                    style={{marginLeft:10, }}
                                    />
                          </View>
                      </View> }

                  <View style={{marginLeft: '-3%'}}>
                      <BlockButton
                      title="ADD PAYMENT"
                      color="secondary"
                      size="short"
                      onPress={() => toggleSheet()}/>
                  </View>


                  </View>
                  {_errors}

                  <View style={{flexDirection: 'row', marginLeft: 20, zIndex:-1}}>
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
                          style={{marginBottom:50}}
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

          <View style={{ flex : 1 }} />
      </View>
    </KeyboardAvoidingView>
    )
}
