import React, { useState, useEffect } from 'react'
import { ScrollView, View, Text, TouchableHighlight, StyleSheet } from 'react-native'
import { colors } from '../../../settings/colors'
import styles from './SizeCarousel.styling'

export default function SizeCarousel(props) {
    var sizes = props.sizes
    var type = props.type

    const [selectedValue, setSelectedValue] = useState(props.default || null)
    const [selectedValues, setSelectedValues] = useState([])

    // select a single option in the carousel
    const selectSingle = (i) => {
        return (
            <TouchableHighlight onPress={() => {
                setSelectedValue(sizes[i])
                props.setSize(sizes[i])
            }} underlayColor={colors.lightGreen} style={[styles.Size, (selectedValue == sizes[i]) ? styles.Size_green : styles.Size_transparent]}>
                <View >
                    <Text style={[styles.Size__text, (props.string) ? styles.Size__text_string : null]}>{sizes[i] == 'One Size' ? 'OS' : sizes[i]}</Text>
                </View>
            </TouchableHighlight>
        )
    }

    // select multiple options in the carousel
    function selectMultiple(i) {
        const [_green, setGreen] = useState(false)
        return (
            <TouchableHighlight onPress={() => {
                var temp = selectedValues
                if (!_green){
                    temp.push(i)
                }
                else{
                    temp.splice(temp.indexOf(i),1)
                }
                props.setSize(temp)
                setSelectedValues(temp)
                setGreen(!_green)
            }} underlayColor={colors.lightGreen} style={[styles.Size, _green ? styles.Size_green : styles.Size_transparent]}>
                <View >
                    <Text style={[styles.Size__text, (props.string) ? styles.Size__text_string : null]}>{i}</Text>
                </View>
            </TouchableHighlight>
        )
    }

    let display = [];
    if (sizes.length > 0) {
        for (var i = 0; i < sizes.length; i++) {
            if (type == 'multiple') {
                display.push(selectMultiple(sizes[i],sizes))
            }
            else {
                display.push(selectSingle(i))
            }
        }
    }

    return (
        <View style={{ marginTop: 20 }}>
            <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={200}
                decelerationRate="normal">
                {display}
            </ScrollView>
        </View>
    )
}
