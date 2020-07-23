import {StyleSheet} from 'react-native'
import {colors} from "../../../../settings/all_settings.js";

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
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 0
    },

    // if button is disabled
    BlockButton_disabled : {
        backgroundColor: colors.gray
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
    BlockButton_insta:{
        backgroundColor: colors.instaPurple
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
    BlockButton__title_small: {
        fontSize: 12,
        textAlign: 'center'
    },

    // different sizes for the button
    BlockButton_short: {
        width: '45%'
    },
    BlockButton_small: {
        width: '25%',
        height: 25
    },

    // styles for icon in the button
    icon:{
        color: 'white'
    },
    iconBg:{
        backgroundColor: 'transparent',
        height: 30,
        width: 30
    },

    // styles for banner on BlockButton
    BlockButton__banner: {
        backgroundColor: 'black',
        paddingHorizontal: 8,
        paddingVertical: 5,
        borderTopRightRadius: borderRadius,
        position: 'absolute',
        top: 0,
        right: 0
    },
    BlockButton__bannerTitle: {
        fontSize: 8,
        color: 'white'
    }
})

export {styles};
