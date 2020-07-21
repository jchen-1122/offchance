import React from 'react'
import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import { utilities, fonts } from '../../../settings/all_settings';
import { Icon } from 'react-native-elements';
import styles from './SlidingSheet.styles';


// Sliding Sheet update: Removed visible prop, since the sheet will be invisible after sliding off the screen.
function SlidingSheet(props) {

    const [value, onChangeText] = React.useState('Useless Placeholder');

    return (
        <View style={styles.slidingSheet}>
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
                  style={{ height: 30, lineHeight: 23, borderWidth: 1, }}
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

        </View>
    )
}

export default SlidingSheet;
