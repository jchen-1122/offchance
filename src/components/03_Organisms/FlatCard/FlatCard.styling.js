import { StyleSheet, Dimensions } from 'react-native'
import {colors, dimensions} from '../../../settings/all_settings';

let borderRadius = 5; // border radius for card
let spacing = 10; // for margin and padding

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({

    FlatCard: {
        // width: width * 0.3,
        height: height * 0.32,
        backgroundColor: 'white',
        // flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        // margin: spacing,
        borderRadius: borderRadius,

    },

    FlatCard__winner_padding: {
        padding: spacing
    },
    FlatCard__raffle_padding: {
        paddingTop: spacing,
        paddingLeft: spacing,
        paddingRight: spacing
    },

    FlatCard__image: {
        height: height * 0.17,
        width: width * 0.4,
        margin: spacing,
        resizeMode: 'contain',
        marginTop: -height * 0.03,

    },

    FlatCard__title: {
        fontSize: 12,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    startData_margin: {
        marginLeft: width * 0.05
    },
    startData_grey: {
        width: width * 0.6,
        fontSize: width * 0.025,
        color: '#989898',
    },
    freeDraw_date: {
        fontWeight: 'bold'
    },

    likeButton: {
        // height: Dimensions.get('window').height * 0.1,
        // width: Dimensions.get('window').width * 0.5,
        flexDirection:'row',
        justifyContent: 'flex-end',
        paddingVertical: '3%',
        paddingRight: '3%'
        // marginBottom: 5
        // marginBottom: -height * 0.02,
        // zIndex: 1000,
        // backgroundColor: 'transparent'
        
    },
})

export default styles
