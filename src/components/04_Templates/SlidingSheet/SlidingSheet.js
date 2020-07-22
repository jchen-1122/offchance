import React, {useState} from 'react'
import { View, Text, TouchableOpacity, TextInput, ScrollView, Picker} from 'react-native'
import { utilities, fonts } from '../../../settings/all_settings';
import { Icon } from 'react-native-elements';
import styles from './SlidingSheet.styles';

// https://github.com/alinz/react-native-dropdown
import Option from 'react-native-dropdown'


// Sliding Sheet update: Removed visible prop, since the sheet will be invisible after sliding off the screen.
function SlidingSheet(props) {

    const [value, onChangeText] = React.useState('Enter here');
    const [selectedValue, setSelectedValue] = useState("**** **** **** 1234");

    return (
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
                <TextInput
                  style={{ height: 40, lineHeight: 23, }}
                  onChangeText={text => onChangeText(text)}
                  value={value}
                />
            </View>

            <View>
                <Picker
                  selectedValue={selectedValue}
                  style={{ height: 250, width: 300 }}
                  onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                  mode='dropdown'>
                    <Picker.Item label="Java" value="java" />
                    <Picker.Item label="JavaScript" value="js" />
                </Picker>
            </View>

            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Select
                  width={250}
                  ref="SELECT1"
                  optionListRef={this._getOptionList.bind(this)}
                  defaultValue="Select a Province in Canada ..."
                  onSelect={this._canada.bind(this)}>
                  <Option>Alberta</Option>
                  <Option>British Columbia</Option>
                  <Option>Manitoba</Option>
                  <Option>New Brunswick</Option>
                  <Option>Newfoundland and Labrador</Option>
                  <Option>Northwest Territories</Option>
                  <Option>Nova Scotia</Option>
                  <Option>Nunavut</Option>
                  <Option>Ontario</Option>
                  <Option>Prince Edward Island</Option>
                  <Option>Quebec</Option>
                  <Option>Saskatchewan</Option>
                  <Option>Yukon</Option>
                </Select>
                  <Text>Selected province of Canada: {this.state.canada}</Text>
                  <OptionList ref="OPTIONLIST"/>
            </View>

        </ScrollView>
    )
}

export default SlidingSheet;
