import {StyleSheet} from 'react-native'
import {colors, dimensions} from "../../../../settings/all_settings.js";



const styles = StyleSheet.create({
    // black lines above and below the expandable box
    TextCollapser_primary: {
      borderBottomWidth:1,
      borderTopWidth:1
    },

    // Header Box Style
    TextCollapser__header_primary: {
        flexDirection:'row',
        alignItems:'center',
        padding:10,
        backgroundColor:'rgba(255, 255, 255, 1.0)',

    },

    // Body Box Style
    TextCollapser__body_primary: {
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row',
        backgroundColor:'rgba(255, 255, 255, 1.0)',
    },

    // Header Text Style
    TextCollapser__header_text_primary: {
        fontSize:20,
        marginLeft:'5%',
        fontWeight: "bold",
        marginVertical: '3.5%',
    },

    // Body Text Style
    TextCollapser__body_text_primary: {
        fontSize:15,
        marginLeft:'8%',
        marginRight:'8%',
        lineHeight:25
    },

})

export {styles};
