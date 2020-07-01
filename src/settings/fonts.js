// h1 styling
// p styling
// a styling

import {StyleSheet} from 'react-native';

var baseFontSize = 16;

const fonts = StyleSheet.create({
    h1: {
        fontSize: baseFontSize * 1.5, 
        fontWeight:'bold',
        margin: 15
    },
    p: {
        fontSize: baseFontSize,
    },
    link: {
        color: 'black',
        textDecorationLine: 'underline'
    }
})

export {fonts};