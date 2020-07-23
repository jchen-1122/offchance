import React, {useState, useEffect} from 'react'
import {ScrollView, View, Text, TouchableHighlight} from 'react-native'
import {colors} from '../../../settings/colors'

export default function SizeCarousel({sizes}) {
    useEffect(() => {
        setColor(color)
    }, [color])

    const generateSizeCircle = (i) => {
        return (
            <TouchableHighlight onPress={() => {
                let temp = color
                temp[i] = (temp[i] === 'white') ? colors.lightGreen : 'white'
                setColor(temp)
                console.log(temp)
            }} underlayColor={colors.lightGreen} style={{marginRight: 30, width: 35, height: 35, borderRadius: 35/2, borderWidth: 1, borderColor: 'black', backgroundColor: color[i]}}>
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