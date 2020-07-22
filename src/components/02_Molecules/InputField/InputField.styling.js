import {StyleSheet} from 'react-native';
import {colors} from "../../../settings/colors";

const styles = StyleSheet.create({
    // container for label and box
    InputField: {
        marginTop: 10,
        marginBottom: 10,
        alignItems: 'center',
        width: '90%',
    },

    InputField__labelContainer: {
        flex: 0, 
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    },
    
    InputField__box: {
        height: 45,
        width: '100%',
        backgroundColor: 'white',
        borderColor: '#CCCCCC',
        borderWidth: 1,
        padding: 5
    },
    // if input is a textArea (multiple lines)
    InputField__box_textArea: {
        height: 125
    },

    InputField__label: {
        fontSize: 16,
        marginBottom: 5,
        fontWeight: '500', 
    }

})

export {styles};