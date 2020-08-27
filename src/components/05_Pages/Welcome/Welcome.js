import React, { useEffect, useContext } from 'react';
import { View, Text, Image, ImageBackground, Linking, BackHandler, Alert, AsyncStorage } from 'react-native';
import { Icon } from 'react-native-elements';
import BlockButton from '../../01_Atoms/Buttons/BlockButton/BlockButton';
import TextLink from '../../01_Atoms/Buttons/TextLinks/TextLinks';
import { styles } from './Welcome.styling';
import { colors, fonts, utilities } from '../../../settings/all_settings';
import GlobalState from '../../globalState';

export default function HomeScreen({ navigation }) {
  const data = require('../../IP_ADDRESS.json');
  const {user, setUser} = useContext(GlobalState)
  const getUser = async (id) => {
    let response = await fetch('https://8f5d9a32.us-south.apigw.appdomain.cloud/users/id', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({id : id})
    })
    let json = await response.json()
    json = json.user
    return json
  }

  useEffect(() => {
    async function logInRemUser() {
      const currUserid = await AsyncStorage.getItem('user')
      if (currUserid != null) {
        const loggedinUser = await getUser(currUserid)
        setUser(loggedinUser)
        // admin account
        if (loggedinUser.email === 'admin@admin.com') {
          navigation.navigate('AdminHome')
        } else {
          navigation.navigate('Home')
        }
      }
    }
    logInRemUser()
  }, [])

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
    <View style={styles.Welcome}>

      {/* TODO: image should be aligned closer to the top */}
      <Image style={styles.Welcome__logo} source={{ uri: 'https://oc-mobile-images.s3.us-east.cloud-object-storage.appdomain.cloud/oc-logo.png' }} />
      <Text style={[fonts.h3, {textAlign: 'center', marginHorizontal: '3%'}]}>{'Daily Live Drawings for the Hottest Sneakers and Collectables'.toUpperCase()}</Text>
      <Text style={[fonts.h3, { fontWeight: 'normal', marginTop: '2%'}]}>{'Donate to Important Causes and Win'.toUpperCase()}</Text>

      <Image style={styles.Welcome__image} source={{ uri: 'https://oc-mobile-images.s3.us-east.cloud-object-storage.appdomain.cloud/welcome_image.png' }} />
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
