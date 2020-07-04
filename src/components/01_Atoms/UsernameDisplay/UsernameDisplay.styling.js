import {StyleSheet} from 'react-native';
import {fonts} from "../../../settings/all_settings.js";

let normalSize = 40;
let largeSize = 60;

const styles = StyleSheet.create({
    profilePic: {
        height: normalSize,
        width: normalSize,
        borderRadius: normalSize,
        margin: 5
    },
    profilePic_large: {
        height: largeSize,
        width: largeSize,
        borderRadius: largeSize,
        margin: 15
    },

    username_large: {
        fontSize: 18
    },
    container: {
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center'
    }
})

export {styles};