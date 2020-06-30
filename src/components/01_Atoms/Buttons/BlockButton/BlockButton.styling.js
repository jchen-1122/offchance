import {StyleSheet} from 'react-native';
import {colors} from "../../../../settings/colors.js";

var buttonHeight = 60;
var buttonWidth = 300;
var borderRadius = 10;

const blackLogin = StyleSheet.create({
    BlockButton: {
        height: buttonHeight,
        width: buttonWidth,
        backgroundColor: colors.primaryColor,
        borderRadius: borderRadius,
        flex: 0,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    BlockButton__title: {
        color: 'white',
        fontSize: 16,
    }
})

const FBLogin = StyleSheet.create({
    BlockButton: {
        height: buttonHeight,
        width: buttonWidth,
        backgroundColor: colors.facebookBlue,
        borderRadius: borderRadius,
        flex: 0,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    BlockButton__title: {
        color: 'white',
        fontSize: 18,
    },
    BlockButton__icon: {
        margin: 10,
    },
})

const instaLogin = StyleSheet.create({
    BlockButton: {
        height: buttonHeight,
        width: buttonWidth,
        backgroundColor: colors.instaPurple,
        borderRadius: borderRadius,
        flex: 0,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    BlockButton__title: {
        color: 'white',
        fontSize: 18
    },
    BlockButton__icon: {
        margin: 10,
    },
})

export {blackLogin, instaLogin, FBLogin};