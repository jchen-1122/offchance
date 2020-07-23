import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: 'rgba(0, 0, 0, 0.01)'
    },
    logo: {
        height:400,
        width: 400,
        marginTop: -75,
        resizeMode:'contain'
    },

    image: {
      flex: 1,
      height:200, // delete later
      width: 400, // delete later
      resizeMode: "cover",
      justifyContent: "center",
    }

})

export {styles};
