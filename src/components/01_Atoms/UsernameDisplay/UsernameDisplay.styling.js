import {StyleSheet, Dimensions} from 'react-native';
import {fonts} from "../../../settings/all_settings.js";

let smallSize = 20;
let normalSize = 40;
let largeSize = 60;

const styles = StyleSheet.create({
    profilePic: {
        height: normalSize,
        width: normalSize,
        borderRadius: normalSize,
        margin: 5
    },

    // different sizes for profile pic
    profilePic_large: {
        height: largeSize,
        width: largeSize,
        borderRadius: largeSize,
        margin: 15
    },
    profilePic_small: {
        height: smallSize,
        width: smallSize,
        borderRadius: smallSize,
        marginTop: 5,
        marginBottom: 5,
        marginRight: 5
    },
    username_large: {
        fontSize: 18
    },
    username_small: {
        fontSize: 11.5
    },

    container: {
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
    },
    container_hostedBy: {
        // marginRight: 'auto',
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
    },
})

export {styles};