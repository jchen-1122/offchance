import React, { useEffect, useContext } from 'react';
import { View, Text, Image, ImageBackground, Linking, BackHandler, Alert, AsyncStorage } from 'react-native';
import { Icon } from 'react-native-elements';
import BlockButton from '../../01_Atoms/Buttons/BlockButton/BlockButton';
import TextLink from '../../01_Atoms/Buttons/TextLinks/TextLinks';
import { styles } from './Welcome.styling';
import { colors, fonts, utilities } from '../../../settings/all_settings';
import Divider from '../../01_Atoms/Divider/Divider.js';
import GlobalState from '../../globalState';


export default function HomeScreen({ navigation }) {
  const data = require('../../IP_ADDRESS.json');
  const {user, setUser} = useContext(GlobalState)
  const getUser = async (id) => {
    const response = await fetch('http://'+data.ipAddress+':3000/user/id/' + id)
    const json = await response.json()
    return json
  }

  useEffect(() => {
    async function logInRemUser() {
      const currUserid = await AsyncStorage.getItem('user')
      if (currUserid != null) {
        const loggedinUser = await getUser(currUserid)
        setUser(loggedinUser)
        navigation.navigate('Home')
      }
    }
    logInRemUser()
  }, [])

  var image = require('../../../../assets/images/background.jpg')

  // // BACKHANDLING FOR ANDROID BOTTOM NAV
  // const backAction = () => {
  //   Alert.alert("Hold on!", "Are you sure you want to exit the app?", [
  //     {
  //       text: "Cancel",
  //       onPress: () => null,
  //       style: "cancel"
  //     },
  //     { text: "YES", onPress: () => BackHandler.exitApp() }
  //   ]);
  //   return true;
  // };
  // const backHandler = BackHandler.addEventListener(
  //   "hardwareBackPress",
  //   backAction
  // );
  // return () => backHandler.remove();


  return (
    <View style={styles.container}>

      {/* TODO: image should be aligned closer to the top */}
      <Image style={styles.logo} source={{ uri: 'https://oc-mobile-images.s3.us-east.cloud-object-storage.appdomain.cloud/oc-logo.png' }} />
      <Text style={[fonts.h1, {textAlign: 'center'}]}>Daily Live Drawings for the Hottest Sneakers and Collectables</Text>
      <Text style={[fonts.h3, { fontWeight: 'normal'}]}>Donate to Important Causes and Win</Text>

      <Image style={styles.welcomeImage} source={{ uri: 'https://oc-mobile-images.s3.us-east.cloud-object-storage.appdomain.cloud/welcome_image.png' }} />
      {/* Links to Signup */}
      <BlockButton
        title="SIGN UP FOR 5 FREE CHANCES"
        color="secondary"
        onPress={() => navigation.navigate('Signup')} />

      <View style={{ flexDirection: 'row' }}>
        <TextLink
          title="Log in"
          style={fonts.link}
          onPress={() => navigation.navigate('Login', { reset: false })} />
        <Text> or</Text>
        <TextLink
          title="Start Exploring"
          style={fonts.link}
          onPress={() => navigation.navigate('Home')} />
      </View>

    </View>
  );
}
