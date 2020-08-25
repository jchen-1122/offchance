import { StyleSheet, Dimensions } from 'react-native'
import { colors, dimensions } from '../../../../settings/all_settings';

let borderRadius = 10; // border radius for card
let spacing = 10; // for margin and padding

const styles = StyleSheet.create({
    RaffleResult: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        direction: 'inherit',
        flexWrap: 'wrap',
    },

    RaffleResult__grid: {
        marginTop: '5%',
        width: '100%', 
        flexDirection: 'row', 
        flexWrap: 'wrap', 
        alignItems: 'center', 
        justifyContent: 'center'
    },

    // overlay for timer
    timerOverlay: { 
        height: Dimensions.get('window').height, 
        width: Dimensions.get('window').width, 
        backgroundColor: 'transparent',
        alignItems: 'center'
    },
    timerOverlay__timer: {
        color: 'white',
        fontSize: 42,
        fontWeight: 'bold',
        marginBottom: '10%'
    },

})

export default styles