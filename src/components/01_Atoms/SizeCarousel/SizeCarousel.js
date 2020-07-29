import React, { useState, useEffect } from 'react'
import { ScrollView, View, Text, TouchableHighlight, StyleSheet } from 'react-native'
import { colors } from '../../../settings/colors'
import styles from './SizeCarousel.styling'


export default function SizeCarousel(props) {
    var sizes = props.sizes
    var type = props.type

    // const [_selected, setSelected] = useState({})
    // const [_selectedSize, setSelectedSize] = useState(null)
    const [selectedValue, setSelectedValue] = useState(props.default || null)

    const generateSizeCircle = (i) => {
        return (
            <TouchableHighlight onPress={() => {
                setSelectedValue(sizes[i])
                props.setSize(sizes[i])
                // setSelected(i)
                // setSelectedSize(sizes[i])
            }} underlayColor={colors.lightGreen} style={(selectedValue == sizes[i]) ? styles.green_button : styles.white_button}>
            {/* }} underlayColor={colors.lightGreen} style={(_selected === i) ? styles.green_button : styles.white_button}> */}
                <View >
                    <Text style={{ textAlign: 'center', marginTop: 7 }}>{sizes[i]}</Text>
                </View>
            </TouchableHighlight>
        )
    }

    let display = [];
    if (sizes.length > 0) {
        for (var i = 0; i < sizes.length; i++) {
            if (type == 'multiple') {
                display.push(fkme(sizes[i]))
            }
            else {
                display.push(generateSizeCircle(i))
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

function fkme(i) {
    const [_green, setGreen] = useState(false)

    return (
        <TouchableHighlight onPress={() => {

            setGreen(!_green)

        }} underlayColor={colors.lightGreen} style={_green ? styles.green_button : styles.white_button}>
            <View >
                <Text style={{ textAlign: 'center', marginTop: 7 }}>{i}</Text>
            </View>
        </TouchableHighlight>
    )
}
