import { StyleSheet, Dimensions } from 'react-native'

const styles = StyleSheet.create({
    DropDown: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '25%'
    },
    DropDown__box: {
        backgroundColor: 'transparent',
        borderWidth: 0,
        borderBottomColor: '#CCCCCC',
        borderBottomWidth: 1,
        borderRadius: 0,
        color: '#888888'
    },
    DropDown__picker: {
        height: 40,
        zIndex: 1,
        borderColor: 'pink',
        width: '100%'
    },
    DropDown__picker_small: {
        width: 75,
    },
    DropDown__picker_large: {
        width: 300
    },
    DropDown__picker_xlarge: {
        width: 340
    },

    // for Android
    Picker: {
        height: 60, 
        width: 100, 
        color: '#888888'
    }

})

export default styles
