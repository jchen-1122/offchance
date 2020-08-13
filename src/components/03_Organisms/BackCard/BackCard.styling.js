import { StyleSheet, Dimensions } from 'react-native'
import {colors, dimensions} from '../../../settings/all_settings';

let cardWidth = Dimensions.get('window').width * (1/9)
let cardHeight = Dimensions.get('window').height * (1/10)

const styles = StyleSheet.create({
    imgBackground: {
        width: cardWidth,
        height: cardHeight,
        alignItems: 'center',
        justifyContent: 'center',
        resizeMode: 'contain'
    },
    circle_outline: {
        width: cardWidth*0.5,
        height: cardWidth*0.5,
        borderRadius: 19,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },
    circle_pic: {
        width: cardWidth*0.5,
        height: cardWidth*0.5,
        borderRadius: 15,
        resizeMode: 'contain'
    }
})

export default styles