import React, { useState, useEffect } from 'react'
import { ScrollView, View, Text, TouchableHighlight, StyleSheet } from 'react-native'
import { colors } from '../../../settings/colors'
import styles from './SizeCarousel.styling'


export default function SizeCarousel(props) {
    var sizes = props.sizes
    var type = props.type

    const [selectedValue, setSelectedValue] = useState(props.default || null)

    const selectSingle = (i) => {
        return (
            <TouchableHighlight onPress={() => {
                setSelectedValue(sizes[i])
                props.setSize(sizes[i])
            }} underlayColor={colors.lightGreen} style={[styles.button, (selectedValue == sizes[i]) ? styles.green_button : styles.white_button]}>
                <View >
                    <Text style={styles.buttonText}>{sizes[i]}</Text>
                </View>
            </TouchableHighlight>
        )
    }

    function selectMultiple(i) {

        const [_green, setGreen] = useState(false)
        var selectedValues = []
    
        return (
            <TouchableHighlight onPress={() => {
                setGreen(!_green)
                if (_green){
                    selectedValues.push(i)
                }
                else{
                    selectedValues.splice(selectedValues.indexOf(i),1)
                }
                props.setSize(selectedValues)
            }} underlayColor={colors.lightGreen} style={[styles.button, _green ? styles.green_button : styles.white_button]}>
                <View >
                    <Text style={styles.buttonText}>{i}</Text>
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
