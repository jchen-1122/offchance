import { StyleSheet, Dimensions } from 'react-native';
import {colors} from '../../../settings/all_settings';
import {isIphoneX} from '../../../functions/user_functions';

let profilePicSize = Dimensions.get('window').width*0.15
let hostPicSize = Dimensions.get('window').width*0.1


const styles = StyleSheet.create({
    overlay: {
        width: Dimensions.get('window').width*0.8,
        height: isIphoneX() ? 510 : 460,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 3,
        backgroundColor: "white",
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
        height: 150,
        width: 150,
        resizeMode: 'contain',
        borderRadius: 150,
        backgroundColor: 'white',
        marginVertical: isIphoneX() ? 10 : 5,
    },

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

    winnerPic: {
        height: profilePicSize,
        width: profilePicSize,
        borderRadius: profilePicSize,
        marginRight: '3%'
    },
    winnerLabel: {
        fontSize: 10
    },
    winnerName: {
        fontSize: 16
    },

    footer: {
        height: '12%',
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
    },

    hostPic: {
        height: hostPicSize,
        width: hostPicSize,
        borderRadius: hostPicSize,
        marginRight: '1%'
    },
    hostLabel: {
        fontSize: 10,
        color: colors.darkGray
    },
    hostName: {
        fontSize: 12
    },

    charity: {
        height: 28,
        width: 28,
        resizeMode: 'contain',
        margin: 0
    }
})

export default styles