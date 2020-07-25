import { StyleSheet, Dimensions, } from 'react-native'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({

    // Header Box Style
    container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',

    },
    button: {
      backgroundColor: 'green',
      width: '40%',
      height: 40
    },

    background: {
      flex: 1,
      backgroundColor: 'grey',

    },

    logOutText: {
      fontSize: 22,
      marginTop:'5%',
      marginLeft:'7%',
      marginBottom:'5%',
      justifyContent:'center',
      alignItems:'center'
    },

    // Sliding Sheet Style
    subView: {
       position: 'absolute',
       bottom: '-7%',
       left: 0,
       right: 0,
       backgroundColor: "#FFFFFF",
       height: 600,
       borderRadius: 20,
   },

    // <View style={{alignItems:'flex-end'}}>
    //     <Image source={down_arrow} />
    // </View>


})

export {styles};
