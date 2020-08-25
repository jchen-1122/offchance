import { StyleSheet, Dimensions } from 'react-native'
import {colors} from '../../../settings/colors'

const styles = StyleSheet.create({
    Size: {
        marginRight: 20, 
        width: 35, 
        height: 35, 
        borderRadius: 35/2, 
        borderWidth: 1, 
        borderColor: '#888888', 
    },
    Size_transparent: {
        backgroundColor: 'transparent'
    },
    Size_green: {
        backgroundColor: colors.lightGreen
    },
    
    Size__text: { 
        textAlign: 'center', 
        marginTop: 7, 
        color: '#888888' 
    },
    // if the Size has a string, ex. 'Men', 'Women', 'Unisex'
    Size__text_string: {
        fontSize: 8,
        marginTop: 10
    }
})

export default styles