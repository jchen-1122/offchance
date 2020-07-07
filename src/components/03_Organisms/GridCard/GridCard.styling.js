import { StyleSheet, Dimensions } from 'react-native'
import {colors, dimensions} from '../../../settings/all_settings';

const styles = StyleSheet.create({
    GridCard: {
        width: Dimensions.get('window').width * 0.45,
        backgroundColor: colors.lightGray,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        margin: 10
    }
})

export default styles