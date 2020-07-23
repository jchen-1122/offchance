import React, {useState, useEffect} from 'react'
import {ScrollView, View, Text, TouchableHighlight, StyleSheet} from 'react-native'
import {colors} from '../../../settings/colors'
import styles from './SizeCarousel.styling'


export default function SizeCarousel({sizes}) {

    const [_selected, setSelected] = useState(-1)

    const generateSizeCircle = (i) => {
        return (
            <TouchableHighlight onPress={() => {
                setSelected(i)
            }} underlayColor={colors.lightGreen} style={_selected === i ? styles.green_button : styles.white_button}>
                <View >
                    <Text style={{textAlign: 'center', marginTop: 7}}>{sizes[i]}</Text>
                </View>
            </TouchableHighlight>
        )
    }

    let display = [];
    const [color, setColor] = useState(new Array(sizes.length).fill('white'))
    if (sizes[0] != null){
        for (var i=0; i<sizes.length; i++){
            display.push(
                generateSizeCircle(i)
            )
        }
    }
    return (
        <View style={{marginTop:20}}>
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