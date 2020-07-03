import * as React from 'react';
import { ScrollView, View, Text, Image } from 'react-native'
import BottomNav from '../../../02_Molecules/BottomNav/BottomNav'
import ProgressBar from '../../../02_Molecules/ProgressBar/ProgressBar'
import ImageCarousel from '../../../02_Molecules/ImageCarousel/ImageCarousel'
import {utilities, fonts, colors} from '../../../../settings/all_settings';


export default function Raffle({navigation}) {
    const images = [require('../../../../../assets/images/nintendoSwitch.jpeg'), require('../../../../../assets/images/michaelScott.jpg'), require('../../../../../assets/images/pamBeesly.jpg'), require('../../../../../assets/images/logo.png')]
    
    // uncomment for one image example
    // const images = [require('../../../../assets/images/dwightSchrute.jpg')]
    return (
        <View style={utilities.container}>
            <ScrollView contentContainerStyle={utilities.scrollview}>
                {images.length > 1 ? <ImageCarousel images={images}></ImageCarousel> : <Image source={images[0]} style={{width: 400, height: 300, resizeMode: 'center'}}></Image>}
                <Text style={[fonts.h1, {fontWeight: 'bold', textAlign:'center', width: 400}]}>Nintendo Switch with Neon Joy-Con</Text>
                <ProgressBar progress={230 / 500} color={colors.highlightColor} raised={230} goal={500} ></ProgressBar>
            </ScrollView>
            <BottomNav navigation={navigation} active={'Home'}></BottomNav>
        </View>
    )
}