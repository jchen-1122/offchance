import {StyleSheet} from 'react-native';
import {colors} from "../../../../settings/colors.js";

var buttonHeight = 40;
var buttonWidth = 40;
var borderRadius = 80;

const styles = StyleSheet.create({
    LikeButton: {
        height: buttonHeight,
        width: buttonWidth,
        backgroundColor: colors.lightGray,
        borderRadius: borderRadius,
        margin: 20,
        flex: 0,
        alignItems: 'center',
        justifyContent: 'center',
    }
})

export {styles};