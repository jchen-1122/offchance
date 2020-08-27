import {StyleSheet} from 'react-native'
import {colors} from "../../../../settings/all_settings.js";

const styles = StyleSheet.create({
    PaymentButton: {
        backgroundColor: '#E7E7E7',
        marginVertical: 5,
        width: 300
    },

    PaymentButton__logo: {
        height: 20,
        width: 20,
        resizeMode: 'contain',
        marginRight: 5
    },
    // different sizes
    PaymentButton__logo_medium: {
        height: 30,
        width: 30
    },
    PaymentButton__logo_large: {
        height: 50,
        width: 50,
    },
})

export {styles};
