import { StyleSheet, Dimensions } from 'react-native';
import {colors} from '../../../settings/all_settings';
import {isIphoneX} from '../../../functions/user_functions';

let profilePicSize = Dimensions.get('window').width*0.15
let hostPicSize = Dimensions.get('window').width*0.1
let productPicSize = 150

const styles = StyleSheet.create({
    WinnerCard: {
        width: Dimensions.get('window').width*0.8,
        height: isIphoneX() ? 510 : 460,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 3,
        backgroundColor: "white",
    },

    // header
    WinnerCard__header: {
        height: '15%',
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    WinnerCard__header__image: {
        height: '90%',
        width: '90%',
        resizeMode: 'contain'
    },

    // product image
    WinnerCard__image: {
        height: productPicSize,
        width: productPicSize,
        resizeMode: 'contain',
        borderRadius: productPicSize,
        backgroundColor: 'white',
        marginVertical: isIphoneX() ? 10 : 5,
    },

    // prize
    WinnerCard__prizeTitle: {
        fontSize: 22,
        letterSpacing: 4,
        textAlign: 'center',
        borderWidth: 2,
        padding: 5,
    },
    WinnerCard__prizeTitleWrapper: {
        width: '90%',
        fontSize: 24,
        letterSpacing: 4,
        textAlign: 'center',
        borderWidth: 2,
        paddingBottom: 5,
        paddingRight: 5
    },

    // winner display
    WinnerCard__winnerPic: {
        height: profilePicSize,
        width: profilePicSize,
        borderRadius: profilePicSize,
        marginRight: '3%'
    },
    WinnerCard__winnerLabel: {
        fontSize: 10
    },
    WinnerCard__winnerName: {
        fontSize: 16
    },

    WinnerCard__footer: {
        height: '12%',
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
    },

    // hhost display
    WinnerCard__hostPic: {
        height: hostPicSize,
        width: hostPicSize,
        borderRadius: hostPicSize,
        marginRight: '1%'
    },
    WinnerCard__hostLabel: {
        fontSize: 10,
        color: colors.darkGray
    },
    WinnerCard__hostName: {
        fontSize: 12
    },

    // charity box
    WinnerCard__charity: {
        height: 28,
        width: 28,
        resizeMode: 'contain',
        margin: 0
    }
})

export default styles