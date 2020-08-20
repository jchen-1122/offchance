import React from 'react'
import {View, Image, Dimensions} from 'react-native'

export default function Construction() {
    return (
        <View>
            <Image style={{alignSelf:'center', resizeMode: 'contain', width: Dimensions.get('window').width * 0.9, height: Dimensions.get('window').height * 0.8}} source={require('../../../assets/images/construction.png')}></Image>
        </View>

    )
}