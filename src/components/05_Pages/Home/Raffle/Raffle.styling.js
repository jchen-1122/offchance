import { StyleSheet, Dimensions } from 'react-native'
import {dimensions} from '../../../../settings/all_settings';

const styles = StyleSheet.create({
   content: {
       marginLeft: '8%',
       marginRight: '8%',
   },
   subView: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFFFFF",
    height: 100,
  }

})

export default styles