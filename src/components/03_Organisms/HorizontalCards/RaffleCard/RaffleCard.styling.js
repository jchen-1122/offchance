import { StyleSheet, Dimensions } from 'react-native'
import {colors} from '../../../../settings/all_settings' 
import { Platform } from 'react-native';

var cardSize = 225
// var cardSize = Dimensions.get('window').width * 0.6
var imageSize =  Dimensions.get('window').width * 0.35

const styles = StyleSheet.create({
    RaffleCard: {
        backgroundColor: 'white',
        height: cardSize,
        width: cardSize,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10, 
        // paddingBottom: '10%',  
        marginHorizontal: 10,
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
