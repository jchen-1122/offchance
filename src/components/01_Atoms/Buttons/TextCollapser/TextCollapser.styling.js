import {StyleSheet} from 'react-native'
import {colors, dimensions} from "../../../../settings/all_settings.js";


const styles = StyleSheet.create({

    // Header Box Style
    FAQ__header: {
        flexDirection:'row',
        alignItems:'center',
        paddingHorizontal:'5%',
        paddingVertical: '3%',
        backgroundColor:'#fafafa',

    },

    // Body Text Style
    FAQ__body: {
        fontSize: 14,
        padding:'5%'
    },
})

export {styles};
