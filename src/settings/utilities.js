import {StyleSheet, Dimensions} from 'react-native';

var borderRadius_ExploreCard = 10
const utilities = StyleSheet.create({
    flexCenter: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    flexEndX: {
        flex: 0,
        alignItems: 'flex-end'
    },
    scrollview: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'space-between'
    },

    // for top 5 donors and latest winners
    exploreCard: {
        height: 225,
        width: Dimensions.get('window').width * 0.45,
        backgroundColor: '#555555',
        borderRadius: borderRadius_ExploreCard,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: Dimensions.get('window').width * 0.025
    }

})

export {utilities};
