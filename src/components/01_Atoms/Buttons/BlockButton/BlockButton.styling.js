import {StyleSheet} from 'react-native';
import {colors} from "../../../../settings/colors.js";

var buttonHeight = 60;
var buttonWidth = 300;
var borderRadius = 5;

const styles = StyleSheet.create({
    BlockButton: {
        height: buttonHeight,
        width: buttonWidth,
        backgroundColor: colors.primaryColor,
        borderRadius: borderRadius,
        flex: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    BlockButton__title: {
        color: 'white',
        fontSize: 16
    }
})

export {styles};