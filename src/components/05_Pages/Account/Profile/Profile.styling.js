import {StyleSheet, Dimensions} from 'react-native';

const styles = StyleSheet.create({
    Profile__name: {
        fontSize: 25,
        textAlign: 'center',
        fontWeight: '700',
        marginTop: 15
    },
    Profile__username: {
        fontSize: 20,
        textAlign: 'center',
        fontWeight: '300',
        marginTop: 5,
        marginBottom: 20
    },
    Profile__picture: {
        width: 120,
        height: 120,
        borderRadius: 120 / 2,
        alignSelf: 'center',
        marginTop: 10,
        zIndex: -1,

    },

    Profile__item__label: {
        fontWeight: '800',
        fontSize: 15
    },
    Profile__item__value: {
        fontWeight: '300',
        fontSize: 17,
        marginBottom: 25
    }

})

export {styles};
