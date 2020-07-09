import {StyleSheet, Dimensions} from 'react-native';

const styles = StyleSheet.create({
    header_name: {
        fontSize: 25, 
        textAlign: 'center', 
        fontWeight: '700', 
        marginTop: 15, 
        marginBottom: 15
    },
    profilePic: {
        width: 120, 
        height: 120,
        borderRadius: 120 / 2, 
        alignSelf: 'center'
    },
    toggleBar: {
        alignItems: 'center'
    },
    descriptor: {
        fontWeight: '800', 
        fontSize: 15
    },
    description: {
        fontWeight: '300', 
        fontSize: 17, 
        marginBottom: 25
    },
    payment: {
        marginLeft: -15
    }

})

export {styles};