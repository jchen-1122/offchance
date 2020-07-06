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
<<<<<<< HEAD
        margin: 15,
        paddingBottom: 20
=======
        margin: 20,
>>>>>>> master
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
    },
    startData_grey: {
        width: Dimensions.get('window').width * 0.6,
        fontSize: 13,
<<<<<<< HEAD
        color: '#989898',
        marginTop: 15,
=======
        color: '#989898'
>>>>>>> master
    },
    freeDraw_banner: {
        marginRight: 'auto',
        marginTop: 'auto',
        marginBottom: 'auto',
        paddingRight: 30,
        paddingLeft: 30,
        paddingTop: 5,
        paddingBottom: 5,
        color: 'white',
        backgroundColor: 'black',
    },
    freeDraw_date: {
        fontWeight: 'bold'
    },
    upcoming_placeholder: {
        width: Dimensions.get('window').width * 0.8,
        marginTop: 20,
    },
    upcoming_notifyMe: {
        width: Dimensions.get('window').width * 0.8,
        height: 60, 
        backgroundColor: '#C4C4C4',
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center'
<<<<<<< HEAD
    },
    friends: {
        width: Dimensions.get('window').width * 0.6,
        marginTop: 15,
        marginBottom: 5
=======
>>>>>>> master
    }
})

export default styles