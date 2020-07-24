import {StyleSheet} from 'react-native'

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

    logOutText: {
      fontSize: 22,
      marginTop:'5%',
      marginLeft:'7%',
      marginBottom:'5%',
      justifyContent:'center',
      alignItems:'center'
    },

    // <View style={{alignItems:'flex-end'}}>
    //     <Image source={down_arrow} />
    // </View>


})

export {styles};
