import React, { useState, useContext, useRef } from 'react'
import { View, Text, Keyboard, ScrollView } from 'react-native';
import InputField from '../../../02_Molecules/InputField/InputField';
import BlockButton from '../../../01_Atoms/Buttons/BlockButton/BlockButton';
import { utilities, fonts } from '../../../../settings/all_settings';
import GlobalState from '../../../globalState'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function ReqBusAcc({ navigation }) {
    const { user, setUser } = useContext(GlobalState)
    const [_errors, setErrors] = useState([])

    // local states for form input (i'm not sure if these are redundant heh)
    const [_hostItem, setHostItem] = useState(null)
    const [_hostCharity, setHostCharity] = useState(null)
    const [_hostDetails, setHostDetails] = useState(null)
    const [_hostRaffleType, hostRaffleType] = useState(null)
    // for bday
    const [_hostMonth, setHostMonth] = useState(null)
    const [_hostDay, setHostDay] = useState(null)
    const [_hostYear, setHostYear] = useState(null)


    // patch request
    const data = require('../../../IP_ADDRESS.json');
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
            host_birthday: new Date(_hostYear+'-'+_hostMonth+'-'+_hostDay).getTime() / 1000
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
            <InputField
                value={_hostItem}
                onChangeText={(text) => { setHostItem(text) }}
                label="Describe the item you would like to use in a drawing"
                textArea
                required />

            <InputField
                value={_hostCharity}
                onChangeText={(text) => { setHostCharity(text) }}
                label="Please provide the charity/foundation name(s) you are raising donations for"
                textArea
                required />

            <InputField
                value={_hostDetails}
                onChangeText={(text) => { setHostDetails(text) }}
                label="Please provide any additional details below (business website, social media links)"
                textArea />

            <View style={{ width: '90%' }}>
                <Text style={[fonts.h2, { marginTop: '5%' }]}>Personal Info</Text>
                <Text style={fonts.p}>* this info is used to verify identity and distribute funds once drawings are complete. We will never share this information with anyone else</Text>

                <Text style={[fonts.p, { marginTop: '5%' }]}>Date of Birth</Text>
                <View style={{ flexDirection: 'row' }}>
                    <InputField
                        style={{ width: '15%', marginRight: '5%' }}
                        value={_hostMonth}
                        onChangeText={(text) => { setHostMonth(text) }}
                        label="MM" />
                    <InputField
                        style={{ width: '15%', marginRight: '5%' }}
                        value={_hostDay}
                        onChangeText={(text) => { setHostDay(text) }}
                        label="DD" />
                    <InputField
                        style={{ width: '20%' }}
                        value={_hostYear}
                        onChangeText={(text) => { setHostYear(text) }}
                        label="YYY" />
                </View>


                {_errors}
            </View>

            <BlockButton
                color="secondary"
                title="SUBMIT FOR APPROVAL"
                onPress={async () => {
                    generateErrors()
                    if (!generateErrors()) {
                        const userObj = await editUser()
                        setUser(userObj)
                        navigation.navigate('Account')
                    }
                }}
            />
        </View >
        </KeyboardAwareScrollView>
        </ScrollView>
    );
}
