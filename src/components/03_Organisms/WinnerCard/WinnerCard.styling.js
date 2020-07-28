import { StyleSheet, Dimensions } from 'react-native'
import {colors, dimensions} from '../../../settings/all_settings';

let profilePicSize = Dimensions.get('window').width*0.15
let hostPicSize = Dimensions.get('window').width*0.1

const styles = StyleSheet.create({
    overlay: {
        width: Dimensions.get('window').width*0.8,
        height: Dimensions.get('window').height * 0.8,
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
        fontSize: 24,
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
        height: Dimensions.get('window').height*0.05,
        width: Dimensions.get('window').width*0.1,
        resizeMode: 'contain',
        margin: 0
    }
})

export default styles