import * as React from 'react';
import { View, Text } from 'react-native'
// import {fonts} from '../../../settings/fonts';
import {colors, fonts, utilities} from '../../../../settings/all_settings';
import BottomNav from '../../../02_Molecules/BottomNav/BottomNav'
import ProgressBar from '../../../02_Molecules/ProgressBar/ProgressBar'
import ImageCarousel from '../../../02_Molecules/ImageCarousel/ImageCarousel';
import {styles} from './Home.styling';


export default function Home({navigation}) {
    const images = [require('../../../../../assets/images/dwightSchrute.jpg'), require('../../../../../assets/images/michaelScott.jpg'), require('../../../../../assets/images/pamBeesly.jpg')]
    return (
        <View style={styles.container}>
            <Text>this is a placeholder page for Home</Text>
            <ProgressBar progress={230 / 500} color='orange' raised={230} goal={500} ></ProgressBar>
            <ImageCarousel images={images}></ImageCarousel>
            <BottomNav navigation={navigation}></BottomNav>
        </View>
    )
}