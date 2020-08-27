import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../../settings/all_settings.js'

var redHeight = 30;
var greenHeight = 28;
var blackHeight = 30;

const styles = StyleSheet.create({
    Banner: {
        width: Dimensions.get('window').width,
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    Banner_absolute: {
        position: "absolute",
        top: 0
    },

    Banner__title: {
        fontSize: 16,
        color: 'white',
    },

    // different colors
    Banner_green: {
        backgroundColor: colors.green,
        height: greenHeight,
    },
    Banner_black: {
        backgroundColor: 'black',
        height: blackHeight
    },
    Banner_red: {
        backgroundColor: 'red',
        height: redHeight,
    }
})


export {styles};