// h1 styling
// p styling
// a styling

import {StyleSheet} from 'react-native';
import { colors } from './colors';
import {dimensions} from './dimensions';

var baseFontSize = 16;

const fonts = StyleSheet.create({
    h1: {
        fontSize: 20,
        fontWeight:'bold',
    },
    h2: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    h3: {
        fontSize: 16,
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
        textDecorationLine: 'underline',
        fontSize: 14,
    },
    error: {
        width: dimensions.width,
        color: colors.red,
        fontWeight: 'bold'
    }
})

export {fonts};
