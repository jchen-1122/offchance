import { StyleSheet } from 'react-native';
import {colors} from '../../../settings/all_settings'

const styles = StyleSheet.create({
    textFont: {
        fontSize: 9, // anything bigger makes it wrap
        color: colors.gray,
    },
    BottomNav__item: {
        fontSize: 10
    }
})

export default styles