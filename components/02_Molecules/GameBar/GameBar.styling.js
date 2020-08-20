import { StyleSheet } from 'react-native'
import {dimensions} from '../../../settings/all_settings.js';

const styles = StyleSheet.create({
    text: {
        fontSize: 30, 
        textAlign: 'center'
    },
    text_light: {
        fontWeight: '600',
        fontSize: 9,
        textAlign: 'center'
    },
    GameBar: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    GameBar__stat: {
        flex: 0, 
        width: '30%',
        flexDirection: 'column',
        justifyContent: 'flex-start', 
        padding: 15,
    },
    GameBar__stat_short: {
        width: '27%',
        flexDirection: 'column',
        paddingVertical: 15
    }
})

export default styles