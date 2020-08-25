
import React, {useState, useRef} from 'react'
import Carousel, { Pagination } from 'react-native-snap-carousel';
import ImageZoom from 'react-native-image-pan-zoom';
import {View, Dimensions, Image} from 'react-native'

function ImageCarousel({images}) {

    const [state, setState] = useState(0)

    const renderItem = ({item, index}) => {
        const res = (
            // image width and height to be determined?
            <ImageZoom 
                cropWidth={700}
                cropHeight={500}
                imageWidth={700}
                imageHeight={500}
                panToMove={false}
                minScale={1}
                maxScale={2}
                clickDistance={5}
                enableCenterFocus={false}
                responderRelease={() => console.log('should reset')}>
                <Image source={item} style={{width: 400, height: 300, resizeMode: 'center'}} />
            </ImageZoom>
        )
        return (
            <View style={{
                borderRadius: 5,
                height: 250,
                marginLeft: 7}}>
                {res}
            </View>
        )
    }

    return (
        <View>
            <Carousel
                data={images}
                renderItem={renderItem}
                sliderWidth={500}
                itemWidth={500}
                onSnapToItem={index => setState(index)}
            />
            <Pagination
              dotsLength={images.length}
              activeDotIndex={state}
              dotStyle={{
                  width: 8,
                  height: 8,
                  borderRadius: 5,
                  marginHorizontal: -2
              }}
              inactiveDotOpacity={0.4}
              inactiveDotScale={0.6}
            />
        </View>
    );
}

export default ImageCarousel;