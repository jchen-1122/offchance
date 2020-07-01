import {StyleSheet} from 'react-native';
import {colors} from "../../../../settings/colors.js";

var buttonHeight = 60;
var buttonWidth = 300;
var borderRadius = 5;

const styles = StyleSheet.create({
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
    },

    // different colors for button background
    BlockButton_primary:{ 
        backgroundColor: colors.primaryColor
    },
    BlockButton_secondary:{
        backgroundColor: colors.secondaryColor,
        borderColor: colors.primaryColor,
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
        color: colors.primaryColor
    },
    BlockButton__title_white: {
        color: 'white'
    },
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