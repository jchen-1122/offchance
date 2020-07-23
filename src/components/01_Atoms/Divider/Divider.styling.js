import {StyleSheet} from 'react-native';
import {colors} from "../../../settings/colors.js";

const styles = StyleSheet.create({
    // container for whole component
    Divider: {
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 15,
        paddingBottom: 15
    },
    // actual line
    Divider__line: {
        height: 2,
        width: '38.5%',
        borderWidth: 1,
        borderColor: colors.darkGray,
        marginLeft: 10,
        marginRight: 10
    },
    // text in the middle
    Divider__text:{
        fontSize: 18
    }
})

export {styles}; 
