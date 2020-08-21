import { StyleSheet, Dimensions } from 'react-native'
import {colors} from '../../../settings/colors'

const styles = StyleSheet.create({
    button: {
        marginRight: 20, 
        width: 35, 
        height: 35, 
        borderRadius: 35/2, 
        borderWidth: 1, 
        borderColor: '#888888', 
    },
    white_button: {
        backgroundColor: 'transparent'
    },
    green_button: {
        backgroundColor: colors.lightGreen
    },
    buttonText: { 
        textAlign: 'center', 
        marginTop: 7, 
        color: '#888888' 
    },
    // if the button has a string, ex. 'Men', 'Women', 'Unisex'
    buttonText_string: {
        fontSize: 8,
        marginTop: 10
    }
})

export default styles