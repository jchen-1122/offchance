import { StyleSheet } from 'react-native'
import {dimensions} from '../../../settings/all_settings.js';

const styles = StyleSheet.create({
    checkBox: {
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'row',
        width: dimensions.width,
        marginTop: 5,
        marginBottom: 5

    },
    checkBox__icon: {
        backgroundColor: 'red',
    },
    checkBox__text: {
        width: '90%'
    }
})

export default styles