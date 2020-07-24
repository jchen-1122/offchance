import { StyleSheet, Dimensions } from 'react-native'

const styles = StyleSheet.create({
    DropDown: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    DropDown__picker: {
        height: 45,
        zIndex: 1,
    },
    DropDown__picker_small: {
        width: 75,
    },
    DropDown__picker_large: {
        width: 300
    },
    DropDown__picker_xlarge: {
        width: 340
    }

})

export default styles
