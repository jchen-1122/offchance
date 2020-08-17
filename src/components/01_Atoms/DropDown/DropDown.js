import React, { useState } from 'react'
import { View, Image, Picker, Platform } from 'react-native';
import { utilities } from '../../../settings/all_settings'
import DropDownPicker from 'react-native-dropdown-picker';
import { Icon } from 'react-native-elements';
import styles from './Dropdown.styling'


function DropDown(props) {
    const [selectedValue, setSelectedValue] = useState((props.options[0]).toString())

    // convert array of options to dropdown items
    let options = []
    for (let option of props.options) {
        let optionIcon;
        // add the paypal logo
        if (option.toUpperCase() == ('Paypal').toUpperCase()){
            optionIcon = <Image source={{uri: 'https://dwglogo.com/wp-content/uploads/2016/08/PayPal_Logo_Icon.png'}} style={{height: 20, width: 20}}/>
        }
        // add wallet logo
        else if (option.toUpperCase() == ('Wallet Chances').toUpperCase()){
            optionIcon = <Icon name="wallet" type="material-community" size={20}/>
        }
        // add credit card logo
        else if (option.includes('**** **** ****')){
            optionIcon = <Icon name="credit-card-outline" type="material-community"  size={20}/>
        }
        options.push({label: option.toString(), value: option, icon: () => optionIcon})

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
                    defaultValue={'Pick'}
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
