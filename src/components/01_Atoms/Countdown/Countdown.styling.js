import { StyleSheet, Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  primary: {
    fontWeight: 'bold',
    // fontSize: width * 0.02,

  },

  search: {
    fontSize: width * 0.028,
  },

})

export default styles
