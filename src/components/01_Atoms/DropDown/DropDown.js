import React, { useState } from 'react'
import { View, Text, Picker, Platform } from 'react-native';
import { utilities } from '../../../settings/all_settings'
import DropDownPicker from 'react-native-dropdown-picker';
import styles from './Dropdown.styling'


function DropDown(props) {
    const [selectedValue, setSelectedValue] = useState((props.options[0]).toString())

    // convert array of options to dropdown items
    let options = []
    for (let i in props.options) {
        options.push({ label: (props.options[i]).toString(), value: (props.options[i]).toString() })
    }

    // for different sizes
    let containerStyles = [styles.DropDown__picker,]
    switch (props.size) {
        case 'small':
            containerStyles.push(styles.DropDown__picker_small);
            break;
        case 'large':
            containerStyles.push(styles.DropDown__picker_large);
            break;
        case 'xlarge':
            containerStyles.push(styles.DropDown__picker_xlarge);
            break;
    }

    if (Platform.OS === 'ios') {
        return (
            <View style={styles.DropDown}>
                <DropDownPicker
                    items={options}
                    multiple={false}
                    min={0}
                    max={10}
                    defaultValue={(props.placeholder) ? null : selectedValue}
                    placeholder={props.placeholder}
                    placeholderStyle={{color: '#888888'}}
                    style={styles.DropDown__box}
                    containerStyle={containerStyles}
                    zIndex={props.zIndex}
                    itemStyle={{
                        justifyContent: 'flex-start',
                    }}
                    onChangeItem={item => { setSelectedValue(item.value); 
                                            if (props.setValue) { props.setValue(item.value) } 
                                            (item.value === '+ Add Payment Method') ? (setSelectedValue((props.options[0]).toString()), props.parentFunction()) : null }}
                />
            </View>
        )
    }

    // picker for Android
    else {
        return (
            <Picker
                mode='dropdown'
                selectedValue={selectedValue}
                style={styles.Picker}
                onValueChange={(itemValue, itemIndex) => {setSelectedValue(itemValue); if (props.setValue) { props.setValue(itemValue) }}}
                itemStyle={{backgroundColor: 'pink'}}>
                {props.options.map((option, index) =>
                    <Picker.Item label={option} value={option} />
                )}
            </Picker>
        )
    }
}

export default DropDown;
