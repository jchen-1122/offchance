import React, {useState} from 'react'
import {View, Text, Picker} from 'react-native';
import { utilities } from '../../../settings/all_settings'
import { Icon } from 'react-native-elements';
import DropDownPicker from 'react-native-dropdown-picker';
import styles from './Dropdown.styling'


function DropDown(props) {
    const [selectedValue, setSelectedValue] = useState((props.options[0]).toString())

    // convert array of options to dropdown items
    let options = []
    for (let i in props.options) {
        options.push({label:(props.options[i]).toString(), value: (props.options[i]).toString()})
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
    return (
        <View style={styles.DropDown}>
            <Text style={{fontSize: 18, marginTop: 15, marginBottom: 15}}>PICK YOUR SIZE</Text>
                <DropDownPicker
                    items={options}
                    multiple={false}
                    min={0}
                    max={10}
                    defaultValue={selectedValue}
                    containerStyle={containerStyles}
                    itemStyle={{
                        justifyContent: 'flex-start',
                    }}
                    onChangeItem={item => setSelectedValue(item.value)}
                />
        </View>
    )
}

export default DropDown;