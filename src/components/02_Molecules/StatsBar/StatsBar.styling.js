import {StyleSheet, Dimensions} from 'react-native';

const styles = StyleSheet.create({
    StatsBar: {
        width: '100%',
        flexDirection: 'row'
    },

    StatsBar__item: {
        width: '33%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },

    // values in item
    number: {
        fontSize: 22,
        fontWeight: '800'
    },
    title: {
        fontSize: 18,
        fontWeight: '500'
    },
})

export {styles}