import React from 'react'
import {View, Image, Text} from 'react-native'

function Top5Donors({images, account}) {
 return (
    <View style={{flexDirection:'row', marginBottom: 10}}>
        <Text style={{fontWeight: '100'}}> Top 5 Donors: {account} </Text>
        <Image source={images[0]} style={{width:20, height: 20, borderRadius: 20 / 2, marginRight: 10}}></Image>
        <Image source={images[1]} style={{width:20, height: 20, borderRadius: 20 / 2, marginRight: 10}}></Image>
        <Image source={images[2]} style={{width:20, height: 20, borderRadius: 20 / 2, marginRight: 10}}></Image>
        <Image source={images[3]} style={{width:20, height: 20, borderRadius: 20 / 2, marginRight: 10}}></Image>
        <Image source={images[4]} style={{width:20, height: 20, borderRadius: 20 / 2, marginRight: 10}}></Image>
     </View>
 )
}

export default Top5Donors;