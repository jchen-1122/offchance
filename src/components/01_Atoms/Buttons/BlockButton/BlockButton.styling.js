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
        flex: 0,
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
    BlockButton_secondarySelected:{
        backgroundColor: colors.darkGreen
    },
    BlockButton_tertiary:{
        backgroundColor: 'transparent',
        borderColor: 'white',
        borderWidth: 2
    },
    BlockButton_light:{
        backgroundColor: colors.lightGreen,
    },
    BlockButton_facebook:{
        backgroundColor: colors.facebookBlue,
        width: '43%',
    },
    BlockButton_google:{
        backgroundColor: 'white',
        width: '43%',
    },
    BlockButton_logOut:{
        backgroundColor: 'red'
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
    BlockButton__title_logOut: {
        fontSize: 18,
        color: 'white',
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
    facebook_icon:{
        color: 'white'
    },
    google_icon:{
        color: 'black'
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