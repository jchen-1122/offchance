import {StyleSheet, Dimensions} from 'react-native';

// sliding sheet size (height) can be changed in the < Animated.view style{height=...} />. (eg. subView in wallet.styling)

const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
    OverlaySheet: {
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30, 
        paddingVertical: '8%',
        width: width,
        // height: height * 0.55,
        alignItems: 'center', 
        position: 'absolute',
        bottom: 0,
    },

    OverlaySheetPay: {
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30, 
        paddingVertical: '8%',
        width: width,
        height: height * 0.8,
        // alignItems: 'center', 
        position: 'absolute',
        bottom: height * -0.07,
    },

    OverlaySheet__header: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: '3%',
        marginBottom: '1%',
        marginHorizontal: '5%'
    },

    OverlaySheet__content: {
        marginHorizontal: '5%',
        marginBottom: '7%',
        flexDirection: 'column',
    },
    OverlaySheet__content_text: {
        fontSize: 15,
        color: 'rgba(52, 52, 52, .8)',
        marginLeft: '5%'
    },
    OverlaySheet__save: {
        marginHorizontal: '8%',
        marginTop: 15
    },

    OverlaySheet__savepayment: {
        flex: 1,
        marginHorizontal: '5%',
        width: 300,
        marginLeft: 40,
        marginTop: -30
    },
})

export default styles;
