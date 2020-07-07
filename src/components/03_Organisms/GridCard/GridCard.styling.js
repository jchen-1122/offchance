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
        padding: spacing,
        margin: spacing,
        borderRadius: borderRadius
    },

    GridCard__image: {
        height: 100,
        width: Dimensions.get('window').width * 0.45,
        margin: spacing,
        resizeMode: 'contain'
    }
})

export default styles