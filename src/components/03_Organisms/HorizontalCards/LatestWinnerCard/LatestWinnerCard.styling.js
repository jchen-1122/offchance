import { StyleSheet, Dimensions, Platform } from 'react-native'


var imageSize = 100

const styles = StyleSheet.create({
    LatestWinnerCard__raffle: {
        alignItems: 'center',
        justifyContent: 'space-evenly',
        height: '60%',
        width: '95%',
        marginBottom: Dimensions.get('window').height * 0.015
    },

    LatestWinnerCard__raffleImage: {
        height: imageSize,
        width: imageSize,
        borderRadius: imageSize,
        backgroundColor: 'white',
        paddingVertical: 20,
        resizeMode: Platform.OS === 'android' ? 'cover' : 'contain',
        overflow: 'hidden',
        marginBottom: '10%'
    },
    LatestWinnerCard__raffleName: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold'
    }

})

export default styles
