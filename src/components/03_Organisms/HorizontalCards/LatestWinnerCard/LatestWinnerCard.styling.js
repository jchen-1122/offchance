import { StyleSheet, Dimensions, Platform } from 'react-native'


var imageSize = 100

const styles = StyleSheet.create({
    touchable: {
        alignItems: 'center',
        justifyContent: 'space-evenly',
        height: '60%',
        width: '95%',
        marginBottom: Dimensions.get('window').height * 0.015
        // backgroundColor: 'pink'
    },
    name: {
        color: 'white'
    },
    raffleImage: {
        height: imageSize,
        width: imageSize,
        borderRadius: imageSize,
        backgroundColor: 'white',
        paddingVertical: 20,
        resizeMode: Platform.OS === 'android' ? 'cover' : 'contain',
        overflow: 'hidden',
        marginBottom: '10%'
    },
    raffleName: {
        color: 'white',

        textAlign: 'center',
        fontWeight: 'bold'
    }

})

export default styles
