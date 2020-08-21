import { StyleSheet, Dimensions } from 'react-native'

var borderRadius = 10
var imageSize = Dimensions.get('window').width * 0.25

const styles = StyleSheet.create({
    Top5Card: {
        height: Dimensions.get('window').height * 0.32,
        width: Dimensions.get('window').width * 0.45,
        backgroundColor: '#555555',
        borderRadius: borderRadius,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: Dimensions.get('window').width * 0.025
    },
    touchable: {
        alignItems: 'center',
        justifyContent: 'space-evenly',
        height: '60%',
        // backgroundColor: 'pink'
    },
    name: {
        color: 'darkgray',
        fontWeight: 'normal'
    },
    image: {
        height: imageSize,
        width: imageSize,
        borderRadius: imageSize
    }

})

export default styles
