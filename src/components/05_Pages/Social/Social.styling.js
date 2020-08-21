import {StyleSheet, Dimensions} from 'react-native';
import {colors} from '../../../settings/all_settings'
const styles = StyleSheet.create({
    header: {
        width: '85%', 
        textAlign: 'center',
        color: 'white'
    },
    headerContainer: {
        width: '100%',
        backgroundColor: colors.darkGreen,
        height: 50
    }
})

export default styles;