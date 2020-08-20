import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../../settings/all_settings.js'

var redHeight = 30;
var greenHeight = 28;
var blackHeight = 35;

const styles = StyleSheet.create({
    Banner: {
        position: "absolute",
        top: 0,
        width: Dimensions.get('window').width,
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    Banner__title: {
        fontSize: 16,
        color: 'white',
    },
    Banner__green: {
        backgroundColor: '#1D9100',
        height: greenHeight,
    },
    Banner__black: {
        backgroundColor: 'black',
        height: blackHeight,
    },
    Banner__red: {
        backgroundColor: 'red',
        height: redHeight,
    }
})


export {styles};