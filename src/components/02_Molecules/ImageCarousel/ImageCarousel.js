import React from 'react'
import Carousel from 'react-native-snap-carousel';
import {View, Text, Image} from 'react-native'

function ImageCarousel() {
    const imgs = [
        {
            source: '../../../../assets/images/dwightSchrute.jpg'
        },
        {
            source: '../../../../assets/images/michaelScott.jpg'
        },
        {
            source: '../../../../assets/images/pamBeesly.jpg'
        }
    ]

    const renderItem = (item, index) => {
        return (
            <View style={{
                borderRadius: 5,
                height: 250,
                padding: 50,
                marginLeft: 25,
                marginRight: 25}}>
              <Image source={require('../../../../assets/images/pamBeesly.jpg')} width={5} height={5}></Image>
            </View>
        )
    }

    return (
        <Carousel
            data={imgs}
            renderItem={renderItem}
            sliderWidth={500}
            itemWidth={500}
        />
    );
}

export default ImageCarousel;