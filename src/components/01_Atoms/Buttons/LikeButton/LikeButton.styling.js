import {StyleSheet} from 'react-native';
import {colors} from "../../../../settings/colors.js";

var buttonHeight = 40;
var buttonWidth = 40;
var borderRadius = 80;

const styles = StyleSheet.create({
    LikeButton: {
        height: buttonHeight,
        width: buttonWidth,
        margin: 15,
        backgroundColor: colors.lightGray,
        borderRadius: borderRadius,
        flex: 0,
        alignItems: 'center',
        justifyContent: 'center',
    }
})

export {styles};