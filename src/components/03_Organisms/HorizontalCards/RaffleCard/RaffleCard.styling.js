import { StyleSheet, Dimensions } from 'react-native'
import {colors} from '../../../../settings/all_settings' 

var cardSize = Dimensions.get('window').width * 0.6
var imageSize = Dimensions.get('window').width * 0.35

const styles = StyleSheet.create({
    RaffleCard: {
        backgroundColor: 'white',
        height: cardSize,
        width: cardSize,
        alignItems: 'center',
        padding: '5%', 
        // paddingBottom: '10%',  
        marginHorizontal: Dimensions.get('window').width * 0.015,
    },
    RaffleCard__image: {
        height: imageSize,
        width: imageSize,
        resizeMode: 'contain',
    },
    RaffleCard__startTime: {
        color: colors.gray, 
        fontSize: 12,
        marginTop: '2%',
    }

})

export default styles
