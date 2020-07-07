import { StyleSheet, Dimensions } from 'react-native'
import {dimensions} from '../../../settings/all_settings.js';

var borderRadius = 10;
var imageDimensions = 175;

const styles = StyleSheet.create({
    card: {
        width: Dimensions.get('window').width * 0.8,
        borderRadius: borderRadius,
        flex: 0,
        flexDirection:'row',
        margin: 20,
    },
    card__white: {
        backgroundColor: 'white',
    },
    card__dark: {
        backgroundColor: 'grey',
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
        color: '#989898'
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
    },
    notif_host: {
        height: 40,
        width: 40,
        borderRadius: 40,
        margin: Dimensions.get('window').width * 0.05
    },
    notif: {
        width: Dimensions.get('window').width * 0.55,
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
    },
    notif_grey: {
        color: '#C4C4C4'
    },
    notif_pic: {
        width: Dimensions.get('window').width * 0.7,
        height: Dimensions.get('window').width * 0.7,
        marginLeft: Dimensions.get('window').width * 0.05,
    }
})

export default styles