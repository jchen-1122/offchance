import {StyleSheet, Dimensions} from 'react-native';
import {colors, dimensions} from '../../../settings/all_settings'

const styles = StyleSheet.create({
    error: {
        width: dimensions.width,
        color: colors.red,
        fontWeight: 'bold'
    }
})

export {styles};