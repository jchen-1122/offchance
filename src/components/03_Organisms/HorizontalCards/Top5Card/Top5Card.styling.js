import { StyleSheet, Dimensions } from 'react-native'

var borderRadius = 10
var imageSize = Dimensions.get('window').width * 0.25

const styles = StyleSheet.create({
    Top5Card__profile: {
        alignItems: 'center',
        justifyContent: 'space-evenly',
        height: '60%',
    },
    Top5Card__username: {
        color: 'darkgray',
        fontWeight: 'normal'
    },
    Top5Card__profilePicture: {
        height: imageSize,
        width: imageSize,
        borderRadius: imageSize
    }
})

export default styles
