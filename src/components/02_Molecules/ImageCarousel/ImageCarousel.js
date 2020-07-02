import React from 'react'
import Carousel from 'react-native-snap-carousel';
import {View, Text, Image} from 'react-native'
require('../../../../assets/images/dwightSchrute.jpg')
require('../../../../assets/images/michaelScott.jpg')
require('../../../../assets/images/pamBeesly.jpg')

function ImageCarousel() {
    const imgs = [
        DS, MS, PB
    ]

    console.log(typeof(imgs[0]))

    const renderItem = (item, index) => {
        return (
            <View style={{
                borderRadius: 5,
                height: 250,
                padding: 50,
                margin:50,
                width: 250}}>
              {/* <Image source={require(s)} style={{width: 200, height: 200, resizeMode:'contain'}}/> */}
              <Text></Text>
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