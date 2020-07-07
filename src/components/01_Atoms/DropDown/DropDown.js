import React, {useState} from 'react'
import {View, Text, Picker} from 'react-native';
import { utilities } from '../../../settings/all_settings'


function DropDown(props) {
    const [selectedValue, setSelectedValue] = useState((props.options[0]).toString())

    // convert array of options to dropdown items
    let options = [];
    for (let i in props.options){
        options.push(
        <Picker.Item label={(props.options[i]).toString()} value={(props.options[i]).toString()}/>
        )
    }
    return (
        <View style={{flexDirection: 'row', marginTop: 50, marginBottom: 50}}>
            <Text style={{fontSize: 18, marginTop: 15, marginBottom: 15}}>PICK YOUR SIZE</Text>
            <Picker
                mode='dropdown'
                selectedValue={selectedValue}
                style={{height: 50, width: 50, marginLeft: 20, marginTop: -75}}
                onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}>
                {options}
            </Picker>
        </View>
    )
}

export default DropDown;