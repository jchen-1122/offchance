import React, { useState, useContext } from 'react'
import { ScrollView, View, Text } from 'react-native';
import { colors, fonts } from '../../../settings/all_settings';
import styles from './HorizontalScroll.styling'

export default function HorizontalScroll(props) {

    return (

        <View style={styles.HorizontalScroll}>
            <Text style={[fonts.h1, styles.title]}>{props.title}</Text>
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
