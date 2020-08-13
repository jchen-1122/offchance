import { StyleSheet, Dimensions } from 'react-native'
import {dimensions} from '../../../settings/all_settings.js';

var borderRadius = 10;
var imageDimensions = 175;

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        width: Dimensions.get('window').width * 0.85,
        borderRadius: borderRadius,
        flex: 0,
        margin: 15,
        paddingBottom: 15,
    },
    likeButton: {
        width: Dimensions.get('window').width * 0.8,
        flexDirection:'row',
        justifyContent: 'flex-end'
    },
    itemDesc: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        height: imageDimensions,
        width: imageDimensions, 
        resizeMode:'contain'
    },
    startData_grey: {
        fontSize: 14,
        color: '#989898',
        marginTop: 15
    },
    grey_text: {
        fontSize: 14,
        color: '#989898'
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
        alignItems: 'center',
    },
    notif_host: {
        height: 40,
        width: 40,
        borderRadius: 40,
        marginHorizontal: Dimensions.get('window').width * 0.05
    },
    notif: {
        width: Dimensions.get('window').width * 0.6,
        flex: 0,
        flexDirection: 'row',
        alignItems: 'flex-start',    },
    notif_grey: {
        color: '#C4C4C4'
    },
    notif_pic: {
        width: Dimensions.get('window').width * 0.7,
        height: Dimensions.get('window').height * 0.25,
        marginLeft: Dimensions.get('window').width * 0.05,
        resizeMode: 'contain',
        marginVertical: '2%'
    },
    friends: {
        width: Dimensions.get('window').width * 0.6,
        marginTop: 15,
        marginBottom: 5
    }
})

export default styles