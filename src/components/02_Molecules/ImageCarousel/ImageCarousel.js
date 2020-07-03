
import React from 'react'
import Carousel from 'react-native-snap-carousel';
import {View, Text, Image} from 'react-native'

function ImageCarousel({images}) {

    const renderItem = ({item, index}) => {
        return (
            <View style={{
                flex: 0,
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                
                backgroundColor: 'pink'}}>
                <Image source={item} style={{backgroundColor: 'red', width: 300, height: 300, resizeMode: 'center'}} />
            </View>
        )
    }

    return (
        <Carousel
            data={images}
            renderItem={renderItem}
            sliderWidth={500}
            itemWidth={500}
            activeSlideAlignment='start'
        />
    );
}

export default ImageCarousel;