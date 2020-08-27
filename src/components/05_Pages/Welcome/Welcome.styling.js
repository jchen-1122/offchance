import {StyleSheet, Dimensions} from 'react-native';

const styles = StyleSheet.create({
    Welcome: {
        flex:1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#fafafa'
    },

    Welcome__logo: {
      height: Dimensions.get('window').height*0.25,
      width: Dimensions.get('window').width*0.5,
      resizeMode:'contain'
    },

    Welcome__image: {
      height: Dimensions.get('window').height*0.4,
      width: Dimensions.get('window').width*0.7,
      resizeMode:'contain'
    },

})

export {styles};
