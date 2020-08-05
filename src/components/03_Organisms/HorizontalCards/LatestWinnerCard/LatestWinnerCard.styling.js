import { StyleSheet, Dimensions } from 'react-native'


var imageSize = Dimensions.get('window').width * 0.3

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
        // borderRadius: imageSize,
        resizeMode: 'contain'
    },
    raffleName: {
        color: 'white',

        textAlign: 'center',
        fontWeight: 'bold'
    }

})

export default styles
