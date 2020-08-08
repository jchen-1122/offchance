import { StyleSheet, Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  primary: {
    fontWeight: 'bold',
  },

  search: {
    fontSize: 12,
    fontWeight: 'normal'
  }

})

export default styles
