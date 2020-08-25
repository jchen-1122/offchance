import {Dimensions, StyleSheet} from 'react-native'
import {colors} from '../../../settings/all_settings'
// import {colors, dimensions} from "../../../../settings/all_settings.js";


const styles = StyleSheet.create({
    ToggleTypeMenu: {
        backgroundColor: 'black'
    },
    ToggleTypeMenu__item: {
        flexDirection: 'row',
        padding: 12,
        alignItems: 'center'
    },

    // menu item labels
    ToggleTypeMenu__label: {
        fontSize: 16,
        color: colors.gray,
        marginLeft: '3%'
    },
    ToggleTypeMenu__label_active: {
        color: 'white',
    }
})

export {styles};
