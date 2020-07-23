import React from 'react'
import {ScrollView, View, Text} from 'react-native'

export default function SizeCarousel({sizes}) {
    return (
        <View>
            <ScrollView
            horizontal={true}
            contentContainerStyle={{width:50}}
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={200}
            decelerationRate="fast"
            pagingEnabled>
                <View style={{marginRight: 20}}>
                    <Text>1111111112312312471212704919104812941028491409124801908412901948012984091804910824908129481</Text>
                </View>
                <View style={{marginRight: 20}}>
                    <Text>2W1</Text>
                </View>
                <View style={{marginRight: 20}}>
                    <Text>2W1</Text>
                </View>
            </ScrollView>
        </View>
    )
}