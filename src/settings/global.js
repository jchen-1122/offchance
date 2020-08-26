import { StyleSheet, Dimensions } from 'react-native';
import { colors } from './colors';

var borderRadius_ExploreCard = 10

const global = StyleSheet.create({
    // for Profile.js and OtherUser.js
    Profile__name: {
        fontSize: 25,
        textAlign: 'center',
        fontWeight: '700',
        marginTop: 15
    },
    Profile__username: {
        fontSize: 20,
        textAlign: 'center',
        fontWeight: '300',
        marginTop: 5,
        marginBottom: 20
    },
    Profile__picture: {
        width: 120,
        height: 120,
        borderRadius: 120 / 2,
        alignSelf: 'center',
        marginTop: 10,
        zIndex: -1,
    },

    // for top 5 donors and latest winners
    exploreCard: {
        height: 220,
        width: Dimensions.get('window').width * 0.45,
        backgroundColor: '#555555',
        borderRadius: borderRadius_ExploreCard,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: Dimensions.get('window').width * 0.025
    }
})

export { global };