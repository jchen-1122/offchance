// insta button + facebook button + login button

import React from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';
import { styles } from "./PaymentButton.styling";
import { colors } from '../../../../settings/all_settings';
import BlockButton from '../BlockButton/BlockButton'

function PaymentButton(props) {
    let icon;
    let title = '**** **** **** ' + props.last4
    let buttonStyle = [styles.PaymentButton];
    let buttonTitleStyle = { fontWeight: 'bold', color: 'black' }

    if (props.selected) {
        buttonStyle.push({ backgroundColor: '#BDBDBD' })
    }

    switch (props.type) {
        case "applePay":
            buttonStyle.push({ backgroundColor: 'black' });
            buttonTitleStyle = { fontWeight: 'bold', color: 'white' }
            title = 'Pay'
            icon = <Image style={styles.PaymentButton__logo} source={{ uri: 'https://oc-mobile-images.s3.us-east.cloud-object-storage.appdomain.cloud/payment-logos/apple.png' }} />
            if (props.selected) {
                buttonStyle.push({ backgroundColor: 'gray' })
            }
            break;
        case "paypal":
            buttonStyle.push({ backgroundColor: colors.paypalYellow })
            title = ""
            icon = <Image style={[styles.PaymentButton__logo, { width: 65 }]} source={{ uri: 'https://oc-mobile-images.s3.us-east.cloud-object-storage.appdomain.cloud/payment-logos/paypal.png' }} />
            if (props.selected) {
                buttonStyle.push({ backgroundColor: '#FFDC88' })
            }
            break;
        case "amex":
            icon = <Image style={[styles.PaymentButton__logo, styles.PaymentButton__logo_large]} source={{ uri: 'https://oc-mobile-images.s3.us-east.cloud-object-storage.appdomain.cloud/payment-logos/american_express.png' }} />
            break;
        case "dinersclub":
            icon = <Image style={[styles.PaymentButton__logo, styles.PaymentButton__logo_medium]} source={{ uri: 'https://oc-mobile-images.s3.us-east.cloud-object-storage.appdomain.cloud/payment-logos/dinersclub.png' }} />
            break;
        case "discover":
            icon = <Image style={[styles.PaymentButton__logo, styles.PaymentButton__logo_large]} source={{ uri: 'https://oc-mobile-images.s3.us-east.cloud-object-storage.appdomain.cloud/payment-logos/discover.png' }} />
            break;
        case "jcb":
            icon = <Image style={[styles.PaymentButton__logo, styles.PaymentButton__logo_medium]} source={{ uri: 'https://oc-mobile-images.s3.us-east.cloud-object-storage.appdomain.cloud/payment-logos/jcb.png' }} />
            break;
        case "maestro":
            icon = <Image style={[styles.PaymentButton__logo, styles.PaymentButton__logo_medium]} source={{ uri: 'https://oc-mobile-images.s3.us-east.cloud-object-storage.appdomain.cloud/payment-logos/maestro.png' }} />
            break;
        case "mastercard":
            icon = <Image style={[styles.PaymentButton__logo, styles.PaymentButton__logo_large]} source={{ uri: 'https://oc-mobile-images.s3.us-east.cloud-object-storage.appdomain.cloud/payment-logos/mastercard.png' }} />
            break;
        case "unionpay":
            icon = <Image style={[styles.PaymentButton__logo, styles.PaymentButton__logo_medium]} source={{ uri: 'https://oc-mobile-images.s3.us-east.cloud-object-storage.appdomain.cloud/payment-logos/unionpay.png' }} />
            break;
        case "visa":
            icon = <Image style={[styles.PaymentButton__logo, styles.PaymentButton__logo_medium]} source={{ uri: 'https://oc-mobile-images.s3.us-east.cloud-object-storage.appdomain.cloud/payment-logos/visa.png' }} />
            break;
    }

    return (
        <BlockButton
            style={[buttonStyle, props.style]} titleStyle={buttonTitleStyle} onPress={props.onPress} disabled={props.disabled} title={title}
            icon={icon} />
    )
}

export default PaymentButton;
