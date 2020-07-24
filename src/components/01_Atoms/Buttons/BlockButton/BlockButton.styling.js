import {StyleSheet} from 'react-native'
import {colors, dimensions} from "../../../../settings/all_settings.js";

var buttonHeight = 50;
var buttonWidth = '90%';

var borderRadius = 5;

const styles = StyleSheet.create({
    // default styling for all blockbuttons
    BlockButton: {
        height: buttonHeight,
        width: buttonWidth,
        margin: 15,
        flexDirection: 'row',
        borderRadius: borderRadius,
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 0
    },

    // if button is disabled
    BlockButton_disabled : {
        backgroundColor: 'gray'
    },

    // different colors for button background
    BlockButton_primary:{
        backgroundColor: colors.primaryColor
    },
    BlockButton_secondary:{
        backgroundColor: 'transparent',
        borderColor: colors.secondaryColor,
        borderWidth: 2
    },
    BlockButton_tertiary:{
        backgroundColor: 'transparent',
        borderColor: 'white',
        borderWidth: 2
    },
    BlockButton_facebook:{
        backgroundColor: colors.facebookBlue
    },
    BlockButton_google:{
        backgroundColor: 'white'
    },
    // BlockButton_insta:{
    //     backgroundColor: colors.instaPurple
    // },
    BlockButton_transparent:{
        height: '12%',
        marginLeft:'8%',
        backgroundColor: 'transparent',
        justifyContent: 'center',
    },

    // different colors for button text
    BlockButton__title: {
        fontSize: 16
    },
    BlockButton__title_primary:{
        color: colors.secondaryColor
    },
    BlockButton__title_secondary:{
        color: colors.secondaryColor
    },
    BlockButton__title_tertiary: {
        color: 'white'
    },
    BlockButton__title_google: {
        color: '#747474'
    },
    BlockButton__title_small: {
        fontSize: 12,
        textAlign: 'center'
    },
    BlockButton__title_transparent: {
        fontSize: 22,
        color: 'black',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },

    // different sizes for the button
    BlockButton_short: {
        width: 150,
        margin: 0
    },
    BlockButton_small: {
        width: 80,
        height: 25
    },

    // styles for icon in the button
    facebook_icon:{
        color: 'white'
    },
    google_icon:{
        color: colors.primaryColor
    },

    iconBg:{
        backgroundColor: 'transparent',
        height: 30,
        width: 30
    }
})

export {styles};
