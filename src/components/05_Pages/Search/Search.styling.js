import { StyleSheet, Dimensions } from 'react-native'

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: 'white',
        marginTop: 10,

    },

    switch: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },

    childView_1: {
        width: Dimensions.get('window').width * 0.5,
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        height: 47,
        marginBottom: 10,
        borderBottomWidth :0,
        borderBottomColor: '#000',
    },

    childView_2: {
        width: Dimensions.get('window').width * 0.5,
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        marginBottom: 10,
        borderBottomWidth :3,
        borderBottomColor: '#000',
    },

});

export {styles};
