import React from 'react'
import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import { utilities, fonts } from '../../../settings/all_settings';
import { Icon } from 'react-native-elements';
import styles from './SlidingSheet.styles';

function SlidingSheet(props) {

    const [value, onChangeText] = React.useState('Useless Placeholder');

    if (props.visible) {
        return (
            <View style={utilities.container}>
                {/* Title part with a close button */}
                <View style={styles.slidingSheet__header}>
                    <TouchableOpacity onPress={() => props.toggleSheet()}>
                        <Icon name='close' />
                    </TouchableOpacity>
                    <Text style={fonts.h1}>{props.title}</Text>
                    <View/>
                </View>

                {/* content part - now it has a text input */}
                <View style={styles.slidingSheet__content}>
                    <Text style={fonts.h1}>{props.title}</Text>
                    <TextInput
                      style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                      onChangeText={text => onChangeText(text)}
                      value={value}
                    />
                </View>

            </View>
        )
    }
    else {
        return (
          <View style={utilities.container}>
              {/* content part - now it has a text input */}
              <View style={styles.slidingSheet__hiding_content}>
                  <Text style={fonts.h1}>{props.title}</Text>
                  <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={text => onChangeText(text)}
                    value={value}
                  />
              </View>
          </View>
        )
    }
}

export default SlidingSheet;
