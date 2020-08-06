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
    abs: {
        position: 'absolute', 
        marginTop: Dimensions.get('screen').height * 0.5
    },
    scroll: {
        flexDirection: 'column-reverse', 
        marginLeft: Dimensions.get('screen').width * 0.035, 
        maxHeight: Dimensions.get('screen').height * 0.25
    },
    viewInput: {
        flexDirection: 'row', 
        position: "relative", 
        marginTop: Dimensions.get('screen').height * 0.3, 
        marginLeft: Dimensions.get('screen').width * 0.034
    },
    hide: {
        fontSize: 14, 
        color: 'black', 
        fontWeight: '800', 
        margin: 10
    }
});

export {styles};