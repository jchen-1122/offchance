import {StyleSheet, Dimensions} from 'react-native';

const styles = StyleSheet.create({
    header_name: {
        fontSize: 25,
        textAlign: 'center',
        fontWeight: '700',
        marginTop: 15
    },
    header_username: {
        fontSize: 20,
        textAlign: 'center',
        fontWeight: '300',
        marginTop: 5,
        marginBottom: 20
    },
    profilePic: {
        width: 120,
        height: 120,
        borderRadius: 120 / 2,
        alignSelf: 'center',
        marginTop: 10,
        zIndex: -1,

    },
    toggleBar: {
        alignItems: 'center',
        marginTop: 20
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
