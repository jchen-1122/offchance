import {StyleSheet, Dimensions} from 'react-native';

// sliding sheet size (height) can be changed in the < Animated.view style{height=...} />. (eg. subView in wallet.styling)

const styles = StyleSheet.create({
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
        marginTop: '7%',
        marginBottom: '7%',

    },

    slidingSheet__content: {
        flex: 1,
        marginLeft: '10%',
        marginRight: '10%',
        marginBottom: '7%',
        flexDirection: 'column',
        borderBottomColor: '#000000',
        borderBottomWidth: 1,

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
      marginBottom: '15%',

    },

    // Sliding Sheet Style
    subView: {
       position: 'absolute',
       bottom: '-100%',
       left: 0,
       right: 0,
       backgroundColor: "#FFFFFF",
       height: Dimensions.get('window').height,
       borderRadius: 20,
   },
})

export default styles;
