import { StyleSheet, Dimensions } from 'react-native'
import {dimensions} from '../../../settings/all_settings.js';

var borderRadius = 10;
var imageDimensions = 175;

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        width: Dimensions.get('window').width * 0.8,
        borderRadius: borderRadius,
        flex: 0,
        flexDirection:'row',
        margin: 20,
    },
    likeButton: {
        width: Dimensions.get('window').width * 0.8,
        flexDirection:'row',
        justifyContent: 'flex-end'
    },
    itemDesc: {
        flex: 1,
        alignItems: 'center'
    },
    image: {
        height: imageDimensions,
        width: imageDimensions, 
        resizeMode:'contain'
    }
})

export default styles