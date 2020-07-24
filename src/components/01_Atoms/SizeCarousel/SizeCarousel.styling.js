import { StyleSheet, Dimensions } from 'react-native'
import {colors} from '../../../settings/colors'

const styles = StyleSheet.create({
    white_button: {
        marginRight: 30, 
        width: 35, 
        height: 35, 
        borderRadius: 35/2, 
        borderWidth: 1, 
        borderColor: 'black', 
        backgroundColor: 'white'
    },
    green_button: {
        marginRight: 30, 
        width: 35, 
        height: 35, 
        borderRadius: 35/2, 
        borderWidth: 1, 
        borderColor: 'black', 
        backgroundColor: colors.lightGreen
    }
})

export default styles