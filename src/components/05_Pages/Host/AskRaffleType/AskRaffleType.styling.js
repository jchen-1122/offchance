import { StyleSheet, Dimensions } from 'react-native'
import {colors} from '../../../../settings/all_settings';

const styles = StyleSheet.create({
   AskRaffle: {
       marginHorizontal: '5%',
       alignItems: 'center',
       justifyContent: 'center',
       height: '100%',
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
