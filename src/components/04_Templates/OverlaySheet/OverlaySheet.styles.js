import {StyleSheet, Dimensions} from 'react-native';

// sliding sheet size (height) can be changed in the < Animated.view style{height=...} />. (eg. subView in wallet.styling)

const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
    overlay: {
        borderRadius: 30, 
        paddingBottom: '8%',
        width: width * 0.9,
        // height: 400,
        alignItems: 'center', 
    },
    // overlay_extend: {
    //     height: 475,
    //     backgroundColor: 'pink'
    // },

    // container: {
    //   flex: 1,
    // },

    // slidingSheet: {
    //     flex: 1,
    // },

    slidingSheet__header: {
        // flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: '3%',
        marginBottom: '1%',
        marginHorizontal: '5%'

    },

    slidingSheet__content: {
        // flex: 1,
        marginHorizontal: '5%',
        marginBottom: '7%',
        flexDirection: 'column',
    },
    slidingSheet__content_text: {
        fontSize: 15,
        color: 'rgba(52, 52, 52, .8)',
        marginLeft: '5%'
    },
    slidingSheet__save: {
        // flex: 1,
        marginHorizontal: '8%',
        marginTop: 15
    },

    slidingSheet__savepayment: {
        flex: 1,
        marginHorizontal: '5%',
        width: 300,
        marginLeft: 40,
        marginTop: -30
    },
})

export default styles;
