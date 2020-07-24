import {StyleSheet, Dimensions} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.01)'
    },

    logo: {
      height: Dimensions.get('window').height*0.3,
        width: Dimensions.get('window').width*0.6,

        // marginBottom: '-5%',
        // backgroundColor: 'red',
        resizeMode:'contain'
    },

    title: {
      textAlign: 'center',
      marginTop: '-5%',
      marginLeft: '10%',
      marginRight: '10%',
      fontSize: 26,
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
