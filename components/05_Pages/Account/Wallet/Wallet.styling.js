import { StyleSheet, Dimensions } from 'react-native'
import {dimensions} from '../../../../settings/all_settings';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
   container: {
     flex: 1,
     justifyContent: 'space-between',
     backgroundColor: "rgba(255, 255, 255, 0.1)",

   },

   // balance
   header: {
     fontSize: 50,
     fontWeight: "bold",
     // fontFamily: '', {/* TODO: messina sans is not in react native font family */}
     justifyContent: 'center',
     alignItems: 'center',
     marginLeft: '10%',
     marginTop: '15%',
   },

   // chance
   chance: {
     fontSize: 50,
     fontWeight: "200",
     // fontFamily: '', {/* TODO: messina sans is not in react native font family */}
     marginLeft: '10%',
     marginTop: '5%',
   },

   // appendix
   appendix: {
     fontSize: 15,
     fontWeight: "600",
     // fontFamily: '', {/* TODO: messina sans is not in react native font family */}
     marginLeft: '10%',
     marginTop:'1%',
     
   },

   // content
   content: {
     fontSize: 20,
     fontWeight: "600",
     // fontFamily: '', {/* TODO: messina sans is not in react native font family */}
     marginLeft: '10%',
     marginRight: '10%',
   },

   // button
   button: {
     justifyContent: 'center',
     alignItems: 'center',
     marginBottom: '15%',

   },


})

export default styles
