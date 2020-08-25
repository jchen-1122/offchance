import React, { useState } from 'react'
import { View, Image, Picker, Platform } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import styles from './Dropdown.styling'

function DropDown(props) { 
    const [selectedValue, setSelectedValue] = useState((props.options[0]).toString())

    // convert array of options to dropdown items
    let options = []
    for (let option of props.options) {
        options.push({ label: option.toString(), value: option})
    }

    // for different sizes
    let containerStyles = [styles.DropDown__picker]
    switch (props.size) {
        case 'small':
            containerStyles.push(styles.DropDown__picker_small);
            break;
        case 'large':
            containerStyles.push(styles.DropDown__picker_large);
            break;
    }

    if (Platform.OS === 'ios') {
        return (
            <View style={styles.DropDown}>
                <DropDownPicker
                    defaultValue={'Pick'}
                    items={options}
                    multiple={false}
                    min={0}
                    max={10}
                    defaultValue={(props.placeholder) ? null : selectedValue}
                    placeholder={props.placeholder}
                    placeholderStyle={{ color: '#888888' }}
                    style={styles.DropDown__box}
                    containerStyle={containerStyles}
                    zIndex={props.zIndex}
                    itemStyle={{justifyContent: 'flex-start'}}
                    onChangeItem={item => {
                        setSelectedValue(item.value);
                        if (props.setValue) {
                            let value = (isNaN(item.value)) ? item.value : parseInt(item.value)
                            props.setValue(value)
                        };
                    }}
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
                onValueChange={(itemValue, itemIndex) => {
                    setSelectedValue(itemValue);
                    if (props.setValue) {
                        // if it should be a number
                        if (!isNaN(itemValue)) {
                            itemValue = parseInt(itemValue)
                        }
                        props.setValue(itemValue)
                    }
                }}>
                {props.options.map((option, index) =>
                    <Picker.Item label={option} value={option} />
                )}
            </Picker>
        )
    }
}

export default DropDown;
