import { StyleSheet, Dimensions } from 'react-native'
import {dimensions} from '../../../settings/all_settings.js';

var borderRadius = 10;
var imageDimensions = 175;
var hostImageDimensions = 40;

const styles = StyleSheet.create({
    // regular card styles
    Card: {
        backgroundColor: 'white',
        width: Dimensions.get('window').width * 0.85,
        borderRadius: borderRadius,
        flex: 0,
        margin: 15,
        paddingBottom: 15,
    },
    Card__likeButton: {
        width: Dimensions.get('window').width * 0.8,
        flexDirection:'row',
        justifyContent: 'flex-end'
    },
    Card__image: {
        height: imageDimensions,
        width: imageDimensions, 
        resizeMode:'contain'
    },
    Card__startData: {
        fontSize: 14,
        color: '#989898',
        marginTop: 15
    },

    // feed card styles
    FeedCard: {
        width: Dimensions.get('window').width * 0.6,
        flex: 0,
        flexDirection: 'row',
        alignItems: 'flex-start',    
    },
    FeedCard__image: {
        width: Dimensions.get('window').width * 0.7,
        height: Dimensions.get('window').height * 0.25,
        resizeMode: 'contain',
        marginVertical: '2%'
    },
    FeedCard__hostImage: {
        height: hostImageDimensions,
        width: hostImageDimensions,
        borderRadius: hostImageDimensions,
        marginHorizontal: Dimensions.get('window').width * 0.05
    },
    FeedCard__timestamp: {
        color: '#C4C4C4'
    }
})

export default styles