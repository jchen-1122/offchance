import {StyleSheet} from 'react-native';
import {colors} from "../../../settings/colors";

const styles = StyleSheet.create({
    // container for label and box
    InputField: {
        marginTop: 12,
        marginBottom: 12
    },

    InputField__labelContainer: {
        flex: 0, 
        flexDirection: 'row'
    },
    
    InputField__box: {
        height: 45,
        width: 300,
        backgroundColor: 'white',
        borderColor: '#CCCCCC',
        borderWidth: 2,
        borderRadius: 10,
        padding: 5
    },
    // if input is a textArea (multiple lines)
    InputField__box_textArea: {
        height: 125
    },

    InputField__label: {
        fontSize: 16,
        marginBottom: 5
    }

})

export {styles};