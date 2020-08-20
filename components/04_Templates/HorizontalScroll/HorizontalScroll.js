import React, { useState, useContext } from 'react'
import { ScrollView, View, Text } from 'react-native';
import { colors, fonts } from '../../../settings/all_settings';
import styles from './HorizontalScroll.styling'
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function HorizontalScroll(props) {
    console.log(props.toggle)
    return (
        <View style={(props.theme == "dark") ? styles.HorizontalScroll_dark : styles.HorizontalScroll_light}>
            <View style={styles.titleHeader}>
                <Text style={[fonts.h1, styles.title, (props.theme == "dark") ? styles.title_dark : styles.title_light]}>{props.title}</Text>
                {props.seeAllRaffles ?
                    <TouchableOpacity
                        style={{ marginBottom: '30%' }}
                        onPress={() => { props.navigation.navigate('SeeAll', { raffles: props.seeAllRaffles, title: props.title }) }}>
                        <Text style={{ fontSize: 16 }}>See All</Text>
                    </TouchableOpacity>
                    : null}
            </View>
            <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={200}
                decelerationRate="normal">
                {props.children}
            </ScrollView>

        </View>
    );
}
