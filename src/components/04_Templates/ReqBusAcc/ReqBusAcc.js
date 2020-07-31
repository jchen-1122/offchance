import React, { useState, useContext } from 'react'
import { View, Text } from 'react-native';
import InputField from '../../02_Molecules/InputField/InputField';
import BlockButton from '../../01_Atoms/Buttons/BlockButton/BlockButton';
import { utilities, fonts } from '../../../settings/all_settings';
import GlobalState from '../../globalState'

export default function ReqBusAcc({ navigation, route, hostItem, setHostItem, hostCharity, setHostCharity, hostDetails, setHostDetails }) {
    const { user, setUser } = useContext(GlobalState)
    const [_errors, setErrors] = useState([])

    // local states for form input (i'm not sure if these are redundant heh)
    const [_hostItem, set_HostItem] = useState(null)
    const [_hostCharity, set_HostCharity] = useState(null)
    const [_hostDetails, set_HostDetails] = useState(null)

    // patch request
    const data = require('../../IP_ADDRESS.json');
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
        console.log(json)
        return json
    }

    // makes a json object with all the input fields
    const makeJSON = () => {
        let data = {
            host_item: _hostItem,
            host_charity: _hostCharity,
            host_details: _hostDetails
        }
        return JSON.stringify(data)
    };

    // check for any errors in input, returns array of errors
    const generateErrors = () => {
        let errors = []

        if (!_hostItem) {
            console.log('oh')
            errors.push(<Text style={fonts.error}>Please enter in an item.</Text>)
        }
        if (!_hostCharity) {
            errors.push(<Text style={fonts.error}>Please enter in at least one charity.</Text>)
        }
        console.log('oh')
        setErrors(errors)
        if (errors.length > 0) {
            console.log('true')
            return true
        } else {
            console.log('false')
            return false
        }
    }

    // if their request is being processed
    if (route && route.params.page && user.host_item){
        return (
            <View style={[utilities.flexCenter, {marginHorizontal: '10%'}]}>
                <Text style={[fonts.h1, {textAlign: 'center'}]}>
                    Your request for a business account is currently being processed.
                </Text>
            </View>
        )
    }

    // if they haven't submitted a request yet
    return (
        <View style={[utilities.flexCenter, { justifyContent: 'flex-start', width: '100%' }]}>
            <InputField
                value={(route && route.params.page) ? _hostItem : hostItem}
                onChangeText={(route && route.params.page) ? (text) => { set_HostItem(text) } : (text) => { setHostItem(text) }}
                label="Describe the item you would like to use in a drawing"
                textArea
                required />

            <InputField
                value={(route && route.params.page) ? _hostCharity : hostCharity}
                onChangeText={(route && route.params.page) ? (text) => { set_HostCharity(text) } : (text) => { setHostCharity(text) }}
                label="Please provide the charity/foundation name(s) you are raising donations for"
                textArea
                required />

            <InputField
                value={(route && route.params.page) ? _hostDetails : hostDetails}
                onChangeText={(route && route.params.page) ? (text) => { set_HostDetails(text) } : (text) => { setHostCharity(text) }}
                label="Please provide any additional details below (business website, social media links)"
                textArea />

            {_errors}

            {(route && route.params.page) ?
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
                /> : null}
        </View>
    );
}
