
import React from 'react'
import Carousel from 'react-native-snap-carousel';
import {View, Text, Image} from 'react-native'

function ImageCarousel({images}) {
    const renderItem = ({item, index}) => {
        return (
            <View style={{
                borderRadius: 5,
                height: 250,
                marginLeft: 60,
                marginRight: 25,
                marginBottom: 30}}>
                <Image source={item} style={{width: 300, height: 300, resizeMode: 'center'}} />
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