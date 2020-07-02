import React from 'react'
import Carousel from 'react-native-snap-carousel';
import {View, Text, Image} from 'react-native'

function ImageCarousel() {
    const images = [require('../../../../assets/images/dwightSchrute.jpg'), require('../../../../assets/images/michaelScott.jpg'), require('../../../../assets/images/pamBeesly.jpg')]

    const renderItem = ({item, index}) => {
        return (
            <View style={{
                borderRadius: 5,
                height: 250,
                padding: 50,
                marginLeft: 25,
                marginRight: 25}}>
            <Image source={item} width={50} height={50} />
            </View>
        )
    }

    return (
        <Carousel
            data={images}
            renderItem={renderItem}
            sliderWidth={500}
            itemWidth={500}
        />
    );
}

export default ImageCarousel;