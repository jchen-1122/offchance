import { StyleSheet, Dimensions } from 'react-native';

var bannerHeight = 28;
var borderRadius = 0;

const styles = StyleSheet.create({
    Banner: {
        position: "absolute",
        top: 0,
        height: bannerHeight,
        width: Dimensions.get('window').width,
        margin: 15,
        backgroundColor: 'green',
        borderRadius: borderRadius,
        flex: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    Banner__title: {
        fontSize: 16,
        color: 'white'
    }
})

export {styles};