import { StyleSheet, Dimensions } from 'react-native'
import {dimensions} from '../../../../settings/all_settings';

const styles = StyleSheet.create({
   content: {
       paddingLeft: '8%',
       paddingRight: '8%',
   },
   subView: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFFFFF",
    height: 100,
  },

  pickSize: {
    flex: 0, 
    flexDirection:'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    marginTop: 15, 
    marginBottom: 15,
    zIndex: 2
  },
  pickSizeSlide: {
    marginTop: 15, 
    marginBottom: 15
  },
  hostedby: {
    flexDirection:'row', 
    alignItems:'center', 
    justifyContent: 'space-between', 
    height: 25
  },
  hostedby__profile: {
    flex: 0, 
    flexDirection:'row', 
    alignItems: 'center'
  },
  hostedby__image: {
      width:20, 
      height: 20, 
      borderRadius: 20 / 2,
      marginRight: 5
  }

})

export default styles