import React, {useState} from 'react'
import { View, Text, TouchableOpacity, TextInput, ScrollView, Picker} from 'react-native'
import { Icon } from 'react-native-elements';
import DropDownPicker from 'react-native-dropdown-picker';

import { utilities, fonts } from '../../../settings/all_settings';

// https://www.npmjs.com/package/react-native-dropdown-picker
import DropDown from '../../../components/01_Atoms/DropDown/DropDown';
import BlockButton from '../../../components/01_Atoms/Buttons/BlockButton/BlockButton';

import styles from './SlidingSheet.styles';
// https://github.com/alinz/react-native-dropdown
// import {option, select} from 'react-native-dropdown'


// Sliding Sheet update: Removed visible prop, since the sheet will be invisible after sliding off the screen.
function SlidingSheet(props) {

    const [value, onChangeText] = React.useState('Enter here');
    const [selectedValue, setSelectedValue] = useState("**** **** **** 1234");

    let options1 = ['**** **** **** 1234', 'Google Pay', 'Apple Pay', 'Paypal', '+ Add Payment Method']
    let options2 = ['$5 = 10 chances', '$10 = 40 chances', '$20 = 50 chances', '$50 = 150 chances', '$100 = 400 chances']

    return (
        <View style={styles.container}>
            <View style={{height: 800}}>
                <ScrollView style={styles.slidingSheet}>
                    {/* Title part with a close button */}
                    <View style={styles.slidingSheet__header}>
                        <TouchableOpacity onPress={() => props.toggleSheet()}>
                            <Icon name='close' />
                        </TouchableOpacity>
                        <Text style={fonts.h1}>{props.title}</Text>
                        <View/>
                    </View>

                    {/* content part - with a text input */}
                    <View style={styles.slidingSheet__content}>
                        <Text style={styles.slidingSheet__content_text}>{props.content[0]}</Text>
                        <TextInput
                          style={{ height: 40, lineHeight: 23, }}
                          onChangeText={text => onChangeText(text)}
                          value={value}
                        />
                    </View>

                    <View style={styles.slidingSheet__content}>
                        <Text style={styles.slidingSheet__content_text}>{props.content[1]}</Text>
                        <DropDown
                          options={options1}
                          size='large'
                          arrowSize={18}
                          zIndex={50000}
                          isVisible={false}
                          />
                    </View>

                    <View style={styles.slidingSheet__content}>
                        <Text style={styles.slidingSheet__content_text}>{props.content[2]}</Text>
                        <DropDown
                          options={options2}
                          size='large'
                          arrowSize={18}
                          zIndex={40000}
                          isVisible={false}
                          />
                    </View>

                    <View style={styles.button}>
                        <BlockButton
                            title="ADD CHANCES"
                            color="primary"
                            onPress={() => toggleSheet()}/>
                    </View>

                </ScrollView>
            </View>
        </View>
    )
}

export default SlidingSheet;
