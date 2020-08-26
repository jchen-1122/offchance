import { StyleSheet, Dimensions } from 'react-native'
import { colors, dimensions } from '../../../../settings/all_settings';

const styles = StyleSheet.create({
  Raffle: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: "rgba(255, 255, 255, 1)",
  },

  Raffle__image: {
    height: Dimensions.get('window').height * 0.3,
    width: Dimensions.get('window').width,
    resizeMode: 'contain',
    marginBottom: '5%'
  },
  Raffle__image_charity: {
    height: Dimensions.get('window').width * 0.35,
    width: Dimensions.get('window').width * 0.35,
    resizeMode: 'contain',
    marginBottom: '5%'
  },

  Raffle__host: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 25
  },
  Raffle__host__profile: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center'
  },
  Raffle__host__image: {
    width: 20,
    height: 20,
    borderRadius: 20 / 2,
    marginRight: 5
  },

  Raffle__highlight: {
    backgroundColor: colors.lightGreen,
    marginBottom: '5%',
    marginHorizontal: '-10%',
    paddingHorizontal: '10%'
  }

})

export default styles
