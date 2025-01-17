import React, { useState, useContext } from 'react'
import { ScrollView, View, Text } from 'react-native';
import { colors, fonts } from '../../../settings/all_settings';
import styles from './HorizontalScroll.styling'
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function HorizontalScroll(props) {
    return (
        <View style={(props.theme == "dark") ? styles.HorizontalScroll_dark : styles.HorizontalScroll_light}>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                <Text style={[fonts.h1, styles.HorizontalScroll__title, (props.theme == "dark") ? styles.HorizontalScroll__title_dark : styles.HorizontalScroll__title_light]}>{props.title}</Text>
                {props.seeAllRaffles ?
                    <TouchableOpacity
                        style={{ marginBottom: '30%' }}
                        onPress={() => { props.navigation.navigate('SeeAll', { raffles: props.seeAllRaffles, title: props.title }) }}>
                        <Text style={{ fontSize: 14 }}>See All</Text>
                    </TouchableOpacity>
                    : null}
            </View>
            <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={200}
                decelerationRate="normal">
                    <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
                        {props.children}
                    </View>
            </ScrollView>
        </View>
    );
}
