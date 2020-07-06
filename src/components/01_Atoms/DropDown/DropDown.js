import React, {useState} from 'react'
import {View, Text, Picker} from 'react-native'


function DropDown() {
    let data = [{
        value: 'Banana'
    }, {
        value: 'Mango'
    }, {
        value: 'Pear'
    }]
    return (
        <View style={{flexDirection: 'row', marginTop: 50, marginBottom: 50}}>
            <Text style={{marginLeft: 30, fontSize: 18, fontWeight: '200'}}>PICK YOUR SIZE</Text>
            <Picker
            selectedValue="java"
            style={{height: 100, width: 50, marginTop: -100, marginLeft: 165}}>
                <Picker.Item label="8" value="8" />
                <Picker.Item label="8.5" value="8.5" />
                <Picker.Item label="9" value="9" />
                <Picker.Item label="9.5" value="9.5" />
            </Picker>
        </View>
    )
}

export default DropDown;