import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../../settings/all_settings';

let paddingX = 30;
let paddingY = 5;

const styles = StyleSheet.create({
    CardBanner: {
        marginRight: 'auto',
        marginTop: 'auto',
        marginBottom: 'auto',
        paddingRight: paddingX,
        paddingLeft: paddingX,
        paddingTop: paddingY,
        paddingBottom: paddingY,
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    CardBanner__title: {
        color: 'white'
    },

    // different colors of banner
    CardBanner_black: {
        backgroundColor: 'black'
    },
    CardBanner_green: {
        backgroundColor: colors.green
    }
})

export default styles;