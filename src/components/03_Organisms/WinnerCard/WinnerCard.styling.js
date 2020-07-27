import { StyleSheet, Dimensions } from 'react-native'
import {colors, dimensions} from '../../../settings/all_settings';

let profilePicSize = Dimensions.get('window').width*0.15

const styles = StyleSheet.create({
    overlay: {
        width: Dimensions.get('window').width*0.8,
        height: Dimensions.get('window').height * 0.75,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 3,
        backgroundColor: "white",
        // borderWidth: 3,
    },

    header: {
        height: '15%',
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    header__image: {
        height: '90%',
        width: '90%',
        resizeMode: 'contain'
    },

    WinnerCard__image: {
        height: '100%',
        width: '80%',
        resizeMode: 'contain',
    },

    WinnerCard__prizeTitle: {
        color: 'white',
        fontSize: 24,
        letterSpacing: 4,
        textAlign: 'center',
        borderColor: 'white',
        borderWidth: 2,
        padding: 5,
    },
    WinnerCard__prizeTitleWrapper: {
        color: 'white',
        width: '90%',
        fontSize: 24,
        letterSpacing: 4,
        textAlign: 'center',
        borderColor: 'white',
        borderWidth: 2,
        paddingBottom: 5,
        paddingRight: 5
    },

    winnerPic: {
        height: profilePicSize,
        width: profilePicSize,
        borderRadius: profilePicSize
    }
})

export default styles