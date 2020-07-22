import { StyleSheet, Dimensions } from 'react-native'

const styles = StyleSheet.create({
    DropDown: {
        flexDirection: 'row', 
        alignItems: 'center',
        zIndex: 10,
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
    }

})

export default styles