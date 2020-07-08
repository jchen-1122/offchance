import { StyleSheet, Dimensions } from 'react-native'
import {colors, dimensions} from '../../../settings/all_settings';

let borderRadius = 10; // border radius for card
let spacing = 10; // for margin and padding

const styles = StyleSheet.create({
    GridCard: {
        width: Dimensions.get('window').width * 0.45,
        backgroundColor: colors.lightGray,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        margin: spacing,
        borderRadius: borderRadius
    },

    GridCard__winner_padding: {
        padding: spacing
    },
    GridCard__raffle_padding: {
        paddingTop: spacing,
        paddingLeft: spacing,
        paddingRight: spacing
    },

    GridCard__image: {
        height: 100,
        width: Dimensions.get('window').width * 0.45,
        margin: spacing,
        resizeMode: 'contain'
    },

    GridCard__title: {
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    startData_margin: {
        marginLeft: Dimensions.get('window').width * 0.05
    },
    startData_grey: {
        width: Dimensions.get('window').width * 0.4,
        fontSize: 13,
        color: '#989898',
        marginTop: 15,
    },
    freeDraw_date: {
        fontWeight: 'bold'
    },
    notifyMe: {
        width: Dimensions.get('window').width * 0.45,
        height: 40, 
        backgroundColor: '#C4C4C4',
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomLeftRadius: borderRadius,
        borderBottomRightRadius: borderRadius

    }
})

export default styles