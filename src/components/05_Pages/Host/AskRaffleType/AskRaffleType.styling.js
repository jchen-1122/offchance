import { StyleSheet, Dimensions } from 'react-native'
import {colors} from '../../../../settings/all_settings';

const styles = StyleSheet.create({
   content: {
       marginLeft: '5%',
       marginRight: '5%',
       alignItems: 'center',
       justifyContent: 'center',
       height: '100%',
   },
   subView: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFFFFF",
    height: 100,
  },

  description: {
    flexDirection: 'row',
    width: '90%',
    backgroundColor: '#DCDCDC',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  description__text: {
    width: '90%',
    fontSize: 11,
    margin: 0
  },
  description__symbol: {
    marginRight: 5
  }

})

export default styles
