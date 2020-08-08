import React, { useState, useContext, useRef } from 'react'
import { View, Text, Keyboard, ScrollView } from 'react-native';
import InputField from '../../../02_Molecules/InputField/InputField';
import BlockButton from '../../../01_Atoms/Buttons/BlockButton/BlockButton';
import Checkbox from '../../../02_Molecules/Checkbox/Checkbox';
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
    const [_hostRaffleType, setHostRaffleType] = useState(null)
    // for bday
    const [_hostMonth, setHostMonth] = useState(null)
    const [_hostDay, setHostDay] = useState(null)
    const [_hostYear, setHostYear] = useState(null)

    // for going to the next text input
    const charityRef = useRef()
    const detailsRef = useRef()
    const dayRef = useRef()
    const yearRef = useRef()


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
            host_birthday: new Date(_hostYear + '-' + _hostMonth + '-' + _hostDay).getTime() / 1000,
            host_raffleType: _hostRaffleType
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
                                maxLength={2}
                                onChangeText={(text) => { setHostMonth(text) }}
                                onSubmitEditing={() => dayRef.current.focus()}
                                label="MM" />
                            <InputField
                                style={{ width: '15%', marginRight: '5%' }}
                                value={_hostDay}
                                keyboardType="numeric"
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
                                ref={yearRef}
                                returnKeyType='done'
                                label="YYYY" />
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Text style={fonts.p}>Drivers License Picture</Text>
                            <BlockButton
                                color="secondary"
                                title="CHOOSE"
                                size="small" />
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
