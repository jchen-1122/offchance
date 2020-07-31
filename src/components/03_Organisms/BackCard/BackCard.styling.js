import { StyleSheet, Dimensions } from 'react-native'
import {colors, dimensions} from '../../../settings/all_settings';

const styles = StyleSheet.create({
    imgBackground: {
        width: Dimensions.get('window').width * (1/7),
        height: Dimensions.get('window').height * (1/8),
        alignItems: 'center',
        justifyContent: 'center',
        resizeMode: 'contain'
    },
    circle_outline: {
        width: 38,
        height: 38,
        borderRadius: 19,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },
    circle_pic: {
        width: 30,
        height: 30,
        borderRadius: 15,
        resizeMode: 'contain'
    }
})

export default styles