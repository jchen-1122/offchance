import { StyleSheet, Dimensions } from 'react-native'

const styles = StyleSheet.create({
    DropDown: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    DropDown__picker: {
        height: 40,
    },
    DropDown__picker_small: {
        width: 75,
    },
    DropDown__picker_large: {
        width: 300,
        zIndex: 50000,
    }

})

export default styles
