import {StyleSheet, Dimensions} from 'react-native';

// sliding sheet size (height) can be changed in the < Animated.view style{height=...} />. (eg. subView in wallet.styling)

const styles = StyleSheet.create({
    overlay: {
        borderRadius: 30, 
        maxHeight: Dimensions.get('window').height* 0.8, 
        paddingBottom: '8%'
    },
    container: {
      flex: 1,
    },

    slidingSheet: {
        flex: 1,
    },

    slidingSheet__header: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: '3%',
        marginBottom: '1%',

    },

    slidingSheet__content: {
        // flex: 1,
        marginHorizontal: '5%',
        marginBottom: '7%',
        flexDirection: 'column',

    },
    slidingSheet__save: {
        flex: 1,
        marginHorizontal: '5%',
        width: 300
    },

    slidingSheet__content_text: {
        zIndex: -1,
        fontSize: 15,
        color: 'rgba(52, 52, 52, .8)',

    },

    // button
    button: {
      zIndex: -1,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: '-40%',

    },

})

export default styles;
