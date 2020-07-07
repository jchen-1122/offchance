import { StyleSheet, Dimensions } from 'react-native'

const styles = StyleSheet.create({
    DropDown: {
        flexDirection: 'row', 
        alignItems: 'center',
        marginTop: 20, 
        marginBottom: 20,
        zIndex: 10,
    },
    DropDown__picker: {
        height: 40, 
        zIndex: 1,
        marginLeft: 15
    },
    DropDown__picker_small: {
        width: 75, 
    },
    DropDown__picker_large: {
        width: 300
    }

})

export default styles