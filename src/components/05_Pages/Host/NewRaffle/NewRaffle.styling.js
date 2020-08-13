import {StyleSheet} from 'react-native';
import {colors} from '../../../../settings/all_settings';

var radioButtonSize = 35

const styles = StyleSheet.create({
    
    InputField__label: {
        fontSize: 14,
        fontWeight: '500', 
        color: '#888888'
    },

    radioButtonCont:{
        flexDirection: 'row',
        alignItems: 'center'
    },
    radioButtonLabel: {
        fontSize: 16,
    }

})

export {styles};