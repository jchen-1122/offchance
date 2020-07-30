import { StyleSheet, Dimensions } from 'react-native'
import {colors, dimensions} from '../../../settings/all_settings';

let borderRadius = 10; // border radius for card
let spacing = 10; // for margin and padding

const styles = StyleSheet.create({
    FlatCard: {
        width: Dimensions.get('window').width * 0.45,
        height: Dimensions.get('window').height * 0.38,
        backgroundColor: 'white',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        margin: spacing,
        borderRadius: borderRadius,

    },

    FlatCard__winner_padding: {
        padding: spacing
    },
    FlatCard__raffle_padding: {
        paddingTop: spacing,
        paddingLeft: spacing,
        paddingRight: spacing
    },

    FlatCard__image: {
        height: Dimensions.get('window').height * 0.11,
        width: Dimensions.get('window').width * 0.45,
        margin: spacing,
        resizeMode: 'contain'
    },

    FlatCard__title: {
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    startData_margin: {
        marginLeft: Dimensions.get('window').width * 0.05
    },
    startData_grey: {
        width: Dimensions.get('window').width * 0.6,
        fontSize: 13,
        color: '#989898',
    },
    freeDraw_date: {
        fontWeight: 'bold'
    },
})

export default styles
