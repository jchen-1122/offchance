import {StyleSheet, Dimensions} from 'react-native';

// sliding sheet size (height) can be changed in the < Animated.view style{height=...} />.
const styles = StyleSheet.create({
    slidingSheet: {
        flex: 1,

    },

    slidingSheet__header: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: '5%',
        marginBottom: '5%',
    },

    slidingSheet__content: {
        flex: 1,
        marginLeft: '10%',
        marginRight: '10%',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'flex-start',
        borderBottomColor: '#000000',
        borderBottomWidth: 1,
    },

    slidingSheet__content_text: {
        fontSize: 15,
        color: 'rgba(52, 52, 52, .5)',
    },
})

export default styles;
