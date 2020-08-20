import {StyleSheet, Dimensions} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#fafafa'
    },

    logo: {
      height: Dimensions.get('window').height*0.25,
      width: Dimensions.get('window').width*0.5,
      resizeMode:'contain'
    },

    welcomeImage: {
      height: Dimensions.get('window').height*0.4,
      width: Dimensions.get('window').width*0.7,
      resizeMode:'contain'
    },

    title: {
      textAlign: 'center',
      marginTop: '-5%',
      marginLeft: '10%',
      marginRight: '10%',
    },

    image: {
      flex: 1,
      height:200, // delete later
      width: 400, // delete later
      marginTop: '4%',
      resizeMode: "cover",
      justifyContent: "center",
    }

})

export {styles};
