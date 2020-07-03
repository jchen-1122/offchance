import * as React from 'react';
import { View, Text, Image } from 'react-native'
// import {fonts} from '../../../settings/fonts';
import BottomNav from '../../../02_Molecules/BottomNav/BottomNav'
import ProgressBar from '../../../02_Molecules/ProgressBar/ProgressBar'
import ImageCarousel from '../../../02_Molecules/ImageCarousel/ImageCarousel'


export default function Raffle({navigation}) {
    const images = [require('../../../../../assets/images/dwightSchrute.jpg'), require('../../../../../assets/images/michaelScott.jpg'), require('../../../../../assets/images/pamBeesly.jpg'), require('../../../../../assets/images/logo.png')]
    
    // uncomment for one image example
    // const images = [require('../../../../assets/images/dwightSchrute.jpg')]
    return (
        <View>
            <Text>this is a placeholder page for a Raffle</Text>
            {images.length > 1 ? <ImageCarousel images={images}></ImageCarousel> : <Image source={images[0]} style={{width: 400, height: 300, resizeMode: 'center'}}></Image>}
            <ProgressBar progress={230 / 500} color='orange' raised={230} goal={500} ></ProgressBar>
            <BottomNav navigation={navigation}></BottomNav>
        </View>
    )
}