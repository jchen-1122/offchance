import { StyleSheet, Dimensions } from 'react-native'
import { colors } from '../../../../settings/all_settings';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  Wallet: {
    flex: 1,
    justifyContent: 'space-between',
  },

  Wallet__title: {
    fontSize: 36,
    fontWeight: "bold",
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50
  },

  Wallet__chances: {
    height: 200,
    width: 200,
    borderRadius: 200,
    borderWidth: 1,
    borderColor: colors.darkGreen,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.lightGreen,
    marginVertical: '5%'
  },
  Wallet__chances__value: {
    fontSize: 60,
    color: colors.darkGreen
  }
})

export default styles
