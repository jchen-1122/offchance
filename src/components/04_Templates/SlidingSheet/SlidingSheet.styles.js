import {StyleSheet, Dimensions} from 'react-native';

// sliding sheet size (height) can be changed in the < Animated.view style{height=...} />. (eg. SlidingSheet in wallet.styling)

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingBottom: 20,
    },

    SlidingSheet__header: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: '7%',
        marginBottom: '7%',

    },

    SlidingSheet__content: {
        marginHorizontal: '10%',
        marginBottom: '7%',
        flexDirection: 'column',
    },

    SlidingSheet__content_text: {
        zIndex: -1,
        fontSize: 15,
        color: 'rgba(52, 52, 52, .8)',

    },
    SlidingSheet__save: {
        flex: 1,
        marginHorizontal: '5%',
        width: 300
    },


    // Sliding Sheet Style
    SlidingSheet: {
       position: 'absolute',
       bottom: '-48%',
       left: 0,
       right: 0,
       backgroundColor: "#FFFFFF",
       height: Dimensions.get('window').height,
       borderRadius: 20,
   },
})

export default styles;
