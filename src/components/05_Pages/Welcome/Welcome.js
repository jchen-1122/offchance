import React, { useEffect } from 'react';
import { View, Text, Image, BackHandler, Alert } from 'react-native';
import BlockButton from '../../01_Atoms/Buttons/BlockButton/BlockButton';
import TextLink from '../../01_Atoms/Buttons/TextLinks/TextLinks';
import {styles} from './Welcome.styling';
// import {fonts} from '../../../settings/fonts';
import {colors, fonts, utilities} from '../../../settings/all_settings';


export default function HomeScreen({ navigation }) {

  React.useEffect(() => {
    fetch('http://192.168.0.22:3000/signup/5f0cf346718f40cc64419ed7')
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((e) => console.log(e))

    // BACKHANDLING FOR ANDROID BOTTOM NAV
    const backAction = () => {
      Alert.alert("Hold on!", "Are you sure you want to exit the app?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel"
        },
        { text: "YES", onPress: () => BackHandler.exitApp() }
      ]);
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
    
  }, [])

  return (
    <View style={[utilities.flexCenter, styles.container]}>
      {/* TODO: image should be aligned closer to the top */}
      <Image style={styles.logo} source={require('../../../../assets/images/logo.png')}/>
      <Text style={[fonts.h1, {textAlign: 'center', marginBottom: 15}]}>Limited Flash-Drawings for Collectibles</Text>
      <Text style={fonts.p}>Donate to Make Change and Win.</Text>

      {/* Links to Signup */}
      <BlockButton
        title="SIGN UP FOR 5 FREE CHANCES"
        color="secondary"
        onPress={() => navigation.navigate('Signup')}/>

      <View style={{flexDirection: 'row'}}>
        {/* Links to Login */}
        <TextLink
          title="Log in"
          style={fonts.link}
          onPress={() => navigation.navigate('Login', { reset: false })}/>
        {/* TODO: Links to Explore (no explore page currently, button is not functional) */}
        <Text> or</Text>
        <TextLink
          title="Start Exploring"
          style={fonts.link}
          onPress={() => navigation.navigate('Home')}/>
      </View>
    </View>
  );
}
