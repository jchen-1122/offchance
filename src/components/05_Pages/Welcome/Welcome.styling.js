import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.01)'
    },

    logo: {
        height:300,
        width: 300,

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
      marginLeft: '1.5%',
      marginTop: '4%',
      resizeMode: "cover",
      justifyContent: "center",
    }

})

export {styles};
