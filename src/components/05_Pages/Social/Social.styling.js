import {StyleSheet, Dimensions} from 'react-native';
import {colors, dimensions} from '../../../settings/all_settings'

const styles = StyleSheet.create({
    proPic: {
        width: 40, 
        height: 40,
        borderRadius: 40/2
    },
    usn: {
        fontSize: 14, 
        color: 'black', 
        fontWeight: '700'
    },
    msg: {
        fontSize: 14, 
        color: 'black',
        fontWeight: '600'
    },
    chatMessage: {
        flexDirection: 'row', 
        marginBottom: Dimensions.get('screen').height * 0.02, 
        backgroundColor: 'rgba(255,250,250,0.7)', 
        borderRadius: 11, 
        padding: '2%', 
        paddingBottom: '1%', 
        maxWidth: Dimensions.get('screen').width * 0.82,
    },

    scroll: {
        flexDirection: 'column-reverse', 
        marginLeft: Dimensions.get('screen').width * 0.035, 
        height: Dimensions.get('screen').height * 0.35,
    },

    chatInput: {
        flexDirection: 'row', 
        position: "relative", 
        marginLeft: Dimensions.get('screen').width * 0.034,
    },
    chatInput__Box: {
        height: 40, 
        width: Dimensions.get('screen').width*0.8, 
        backgroundColor: 'white', 
        borderRadius: 11, 
        paddingLeft: Dimensions.get('screen').width * 0.02,
    },
    chatInput__hide: {
        fontSize: 14, 
        color: 'black', 
        fontWeight: '800', 
        margin: 10
    }
});

export {styles};