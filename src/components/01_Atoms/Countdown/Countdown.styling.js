import { StyleSheet, Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  primary: {
    fontWeight: 'bold',

  },

  search: {
    fontSize: width * 0.03
  }

})

export default styles
