import {StyleSheet,Dimensions} from 'react-native'
import {colors, dimensions} from "../../../../settings/all_settings.js";

const styles = StyleSheet.create({
    NavButton:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 20,
        borderBottomColor: colors.gray,
        borderBottomWidth: 1
    },

    NavButton__label:{
        fontSize: 16
    },

    NavButton__profilePicture: {
        height: 25, 
        width: 25, 
        borderRadius: 25, 
        marginRight: 15
    }

})

export {styles};
