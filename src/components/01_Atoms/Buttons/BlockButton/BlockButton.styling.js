import {StyleSheet} from 'react-native'
import {colors, dimensions} from "../../../../settings/all_settings.js";

var buttonHeight = 60;
var buttonWidth = dimensions.width;
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
        borderColor: colors.primaryColor,
        borderWidth: 2
    },
    BlockButton_highlight: {
        backgroundColor: colors.highlightColor
    },
    BlockButton_facebook:{
        backgroundColor: colors.facebookBlue
    },
    BlockButton_insta:{
        backgroundColor: colors.instaPurple
    },
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
        color: colors.primaryColor
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
        width: 150
    },
    BlockButton_small: {
        width: 80,
        height: 25
    },
    BlockButton_smallShort: {
        width: 80,
        marginRight: -5
    },
    BlockButton_smallLongLeft: {
        width: 170,
        height: 33,
        marginRight: -15,
        borderBottomRightRadius: 0,
        borderTopRightRadius: 0
    },
    BlockButton_smallLongRight: {
        width: 170,
        height: 33,
        borderBottomLeftRadius: 0,
        borderTopLeftRadius: 0
    },

    // styles for icon in the button
    icon:{
        color: 'white'
    },
    iconBg:{
        backgroundColor: 'transparent',
        height: 30,
        width: 30
    }
})

export {styles};
