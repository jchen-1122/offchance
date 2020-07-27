import { StyleSheet, Dimensions } from 'react-native'
import {colors, dimensions} from '../../../../settings/all_settings';

let borderRadius = 10; // border radius for card
let spacing = 10; // for margin and padding

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        direction: 'inherit',
        flexWrap: 'wrap',
    },
    card: {
        width: Dimensions.get('window').width * 0.15,
        height: Dimensions.get('window').height * 0.15,
        alignItems: 'center',
        justifyContent: 'center',
        margin: spacing,
    },
    gold: {
        backgroundColor: '#D0912E'
    },
    silver: {
        backgroundColor: '#D4D4D4'
    },
    orange: {
        backgroundColor: '#CD7F32'
    },
    purple: {
        backgroundColor: '#410550'
    },

    circle_outline: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },
    circle_pic: {
        width: 30,
        height: 30,
        resizeMode: 'contain'
    }

})

export default styles