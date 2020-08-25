import {StyleSheet} from 'react-native';
import {colors} from "../../../settings/colors";

const styles = StyleSheet.create({

    // container for label and box
    InputField: {
        // flex:1, 
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
        height: 40,
        width: '100%',
        // backgroundColor: 'white',
        borderBottomColor: '#CCCCCC',
        borderBottomWidth: 1,
        padding: 5,
        paddingLeft: 0
    },
    
    // if input is a textArea (multiple lines)
    InputField__box_textArea: {
        height: 75
    },
    InputField__box_Green: {
        borderBottomColor: colors.limeGreen
    }
})

export {styles};
