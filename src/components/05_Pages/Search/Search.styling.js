import { StyleSheet, Dimensions } from 'react-native'

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: 'white',

    },
    switch__item: {
        height: 40,
        width: Dimensions.get('window').width * 0.5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        paddingBottom: 10,
        marginBottom: 10,
    },
    switch__item_active: {
        borderBottomWidth: 3,
        borderBottomColor: 'black'
    },
    switch: {
        flexDirection: 'row',
    },

});

export {styles};
