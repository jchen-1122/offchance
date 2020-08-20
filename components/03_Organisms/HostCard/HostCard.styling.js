import {StyleSheet, Dimensions} from 'react-native'
import {colors} from "../../../settings/all_settings";

const { width, height } = Dimensions.get('window')
const imageSize = width* 0.3
const styles = StyleSheet.create({
   HostCard: {
       height: height * 0.25,
       width: width,
       flexDirection: 'row',
       alignItems: 'center',
       backgroundColor: 'white',
       marginVertical: '1%',
       padding: '5%'
   },
   HostCard__image: {
       height: imageSize,
       width: imageSize,
       resizeMode: 'contain'
   },

   Info: {
       height: '90%',
       width: width*0.7,
       paddingHorizontal: '5%',
       justifyContent: 'space-around'
   },
   Info__label: {
       fontStyle: 'italic'
   }
})

export {styles};