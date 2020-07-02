import { StyleSheet, Dimensions } from 'react-native'
import {dimensions} from '../../../settings/all_settings.js';

var borderRadius = 10;

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        width: Dimensions.get('window').width * 0.8,
        height: Dimensions.get('window').height * 0.8,
        borderRadius: borderRadius,
        flex: 0,
        flexDirection:'row',
    },
    likeButton: {
        width: Dimensions.get('window').width * 0.8,
        flexDirection:'row',
        justifyContent: 'flex-end'
    },
    image: {
        height: Dimensions.get('window').width * 0.6,
        width: Dimensions.get('window').width * 0.6, 
        resizeMode:'contain'
    }
})

export default styles