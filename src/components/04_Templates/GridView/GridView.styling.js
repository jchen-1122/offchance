import { StyleSheet, Dimensions } from 'react-native'
import {dimensions} from '../../../settings/all_settings.js';

const styles = StyleSheet.create({
    GridView__row : {
        flex: 0,
        flexDirection: 'row',
        width: Dimensions.get('window').width,
    }
})

export default styles