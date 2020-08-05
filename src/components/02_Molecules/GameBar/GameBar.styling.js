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
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    GameBar__stat: {
        flex: 0, 
        width: '30%',
        flexDirection: 'column',
        justifyContent: 'flex-start', 
        padding: 15,
    }
})

export default styles