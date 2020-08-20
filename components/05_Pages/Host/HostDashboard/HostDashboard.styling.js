import {StyleSheet, Dimensions} from 'react-native'
import {colors} from "../../../../settings/all_settings";

const { width, height } = Dimensions.get('window')
const styles = StyleSheet.create({
   stats: {
       flexDirection: 'row',
       justifyContent: 'space-between',
       width: width
   },
   statsItem: {
       width: width * 0.32,
       marginTop: '2%',
       alignItems: 'center',
       justifyContent: 'center',
       backgroundColor: 'white',
       paddingVertical: '5%'
   },
   statsItem__value: {
       fontSize: 24
   },
   statsItem__label: {
       fontSize: 10
   }
})

export {styles};