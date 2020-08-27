import {StyleSheet, Dimensions} from 'react-native';
import {fonts} from "../../../settings/all_settings.js";

let smallSize = 20;
let normalSize = 40;
let largeSize = 60;
let searchSize = 16;

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
    profilePic_search: {
        height: searchSize,
        width: searchSize,
        borderRadius: searchSize,
        margin: 5,
    },

    username_large: {
        fontSize: 18
    },
    username_small: {
        fontSize: 11.5
    },
    username_search: {
        fontSize: 10
    },

    container: {
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
    },
    container_game: {
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export {styles};
