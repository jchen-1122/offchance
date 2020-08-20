import {Dimensions, StyleSheet} from 'react-native';
// import {colors, dimensions} from "../../../../settings/all_settings.js";


const styles = StyleSheet.create({
    ToggleType: {
        height: Dimensions.get('window').height * 0.04,
        width: Dimensions.get('window').width * 0.35,
        borderRadius: 5,
        backgroundColor: 'black',
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    ToggleType__label: {
        color: 'white'
    }
})

export {styles};
