// h1 styling
// p styling
// a styling

import {StyleSheet} from 'react-native';
import { colors } from './colors';
import {dimensions} from './dimensions';

var baseFontSize = 16;

const fonts = StyleSheet.create({
    h1: {
        fontSize: baseFontSize * 1.5, 
        fontWeight:'bold',
        marginTop: 15,
        marginBottom: 15
    },
    h2: {
        fontSize: baseFontSize * 1.25,
        fontWeight: 'bold'
    },
    h3: {
        fontSize: baseFontSize,
        fontWeight: 'bold'
    },
    light: {
        fontSize: baseFontSize,
        fontWeight: '300',
        color: colors.darkGray
    },
    bold: {
        fontSize: baseFontSize,
        fontWeight: '800',
        color: colors.primaryColor
    },
    italic: {
        fontSize: baseFontSize,
        fontStyle: 'italic'
    },
    p: {
        fontSize: baseFontSize*0.8,
    },
    link: {
        color: 'black',
        textDecorationLine: 'underline'
    },
    error: {
        width: dimensions.width,
        color: colors.red,
        fontWeight: 'bold'
    }
})

export {fonts};