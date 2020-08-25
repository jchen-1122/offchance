import { StyleSheet, Dimensions } from 'react-native'
import {colors, dimensions} from '../../../settings/all_settings';

let borderRadius = 5; // border radius for card
let spacing = 10; // for margin and padding

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({

    FlatCard: {
        height: height * 0.32,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: borderRadius,
    },

    FlatCard__image: {
        height: height * 0.17,
        width: width * 0.4,
        margin: spacing,
        resizeMode: 'contain',
        marginTop: -height * 0.03,

    },

    FlatCard__startData: {
        width: width * 0.6,
        fontSize: width * 0.025,
        color: '#989898',
    },

    FlatCard__likeButton: {
        flexDirection:'row',
        justifyContent: 'flex-end',
        paddingVertical: '3%',
        paddingRight: '3%'  
    },
})

export default styles
