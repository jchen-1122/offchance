import { StyleSheet, Dimensions } from 'react-native'


var cardSize = Dimensions.get('window').width * 0.6
var imageSize = '75%'

const styles = StyleSheet.create({
    RaffleCard: {
        backgroundColor: 'white',
        height: cardSize,
        width: cardSize,
        alignItems: 'center',
        padding: '5%',        
        marginHorizontal: Dimensions.get('window').width * 0.005
    },
    RaffleCard__image: {
        height: imageSize,
        width: imageSize,
        resizeMode: 'contain'
    }

})

export default styles
