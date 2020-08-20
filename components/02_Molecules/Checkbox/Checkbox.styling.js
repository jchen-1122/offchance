import { StyleSheet } from 'react-native'
import {dimensions} from '../../../settings/all_settings.js';

const styles = StyleSheet.create({
    checkBox: {
        flex: 1,
        flexDirection: 'row',
        width: '100%',
        marginTop: 5,
        alignItems: 'center'
    },
    checkBox__text: {
        width: '93%',
        fontSize: 12,
    }
})

export default styles