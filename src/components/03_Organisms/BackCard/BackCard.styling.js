import { StyleSheet, Dimensions } from 'react-native'
import {colors, dimensions} from '../../../settings/all_settings';

let cardWidth = Dimensions.get('window').width * (1/9)
let cardHeight = Dimensions.get('window').height * (1/10)

const styles = StyleSheet.create({
    BackCard__imgBg: {
        width: cardWidth,
        height: cardHeight,
        alignItems: 'center',
        justifyContent: 'center',
        resizeMode: 'contain',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 24,
    },
    BackCard__imgBg_green: {
        width: cardWidth,
        height: cardHeight,
        alignItems: 'center',
        justifyContent: 'center',
        resizeMode: 'contain',
        shadowColor: colors.limeGreen,
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 1,
        shadowRadius: 16.00,
        elevation: 24,
    },
    
    BackCard__circleOutline: {
        width: cardWidth*0.5,
        height: cardWidth*0.5,
        borderRadius: 19,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },
    BackCard__circlePic: {
        width: cardWidth*0.5,
        height: cardWidth*0.5,
        borderRadius: 15,
        resizeMode: 'contain'
    }
})

export default styles