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
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
        margin: spacing,
        borderRadius: borderRadius
   },

   card_blue: {
        width: Dimensions.get('window').width * 0.15,
        height: Dimensions.get('window').height * 0.15,
        backgroundColor: 'blue',
        alignItems: 'center',
        justifyContent: 'center',
        margin: spacing,
        borderRadius: borderRadius
},

})

export default styles