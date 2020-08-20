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

    // different colors for banner text
    CardBanner__title: {
        color: 'white'
    },
    carBanner__titleDark: {
        color: colors.darkGreen
    },

    // different colors of banner
    CardBanner_lightGreen: {
        backgroundColor: colors.lightGreen
    },
    CardBanner_darkGreen: {
        backgroundColor: colors.darkGreen
    }
})

export default styles;