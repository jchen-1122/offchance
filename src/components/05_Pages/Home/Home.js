import * as React from 'react';
import { View, Text } from 'react-native'
// import {fonts} from '../../../settings/fonts';
import {colors, fonts, utilities} from '../../../settings/all_settings';
import BottomNav from '../../02_Molecules/BottomNav/BottomNav'
import ProgressBar from '../../02_Molecules/ProgressBar/ProgressBar'
import ImageCarousel from '../../02_Molecules/ImageCarousel/ImageCarousel'

export default function Home({navigation}) {
    return (
        <View>
            <Text>this is a placeholder page for Home</Text>
            <ProgressBar progress={0.3} color='orange' raised={230} goal={500} ></ProgressBar>
            <ImageCarousel></ImageCarousel>
            <BottomNav navigation={navigation}></BottomNav>
        </View>
    )
}