import {StyleSheet,Dimensions} from 'react-native'
import {colors, dimensions} from "../../../../settings/all_settings.js";

const styles = StyleSheet.create({
    NavButton:{
        // backgroundColor: 'pink',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 20,
        borderBottomColor: colors.gray,
        borderBottomWidth: 1
    },
    NavButton__label:{
        fontSize: 16
    }
})

export {styles};
