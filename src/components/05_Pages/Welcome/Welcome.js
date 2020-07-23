import React, { useEffect } from 'react';
import { View, Text, Image, ImageBackground, Linking, BackHandler, Alert } from 'react-native';
import BlockButton from '../../01_Atoms/Buttons/BlockButton/BlockButton';
import TextLink from '../../01_Atoms/Buttons/TextLinks/TextLinks';
import {styles} from './Welcome.styling';
import {colors, fonts, utilities} from '../../../settings/all_settings';
import Divider from '../../01_Atoms/Divider/Divider.js';


export default function HomeScreen({ navigation }) {

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
      <ImageBackground source={image} style={styles.image} imageStyle= {{opacity:0}}>
          <View style={styles.container}>

                  {/* TODO: image should be aligned closer to the top */}
                  <Image style={styles.logo} source={require('../../../../assets/images/logo2.png')}/>
                  <Text style={[fonts.h1, styles.title]}>Daily Live Drawings for the Hottest Sneakers and Collectables</Text>
                  <Text style={fonts.p, {fontSize: 18, marginBottom: '5%', }}>Donate to Important Causes and Win</Text>

                  {/* Links to Signup */}
                  <BlockButton
                    title="SIGN UP FOR 5 FREE CHANCES"
                    color="secondary"
                    onPress={() => navigation.navigate('Signup')}/>

                  <Divider />

                  <BlockButton
                    title="Sign Up With Facebook"
                    color="facebook"
                    onPress={() => Linking.openURL('https://www.facebook.com/')}/>

                  <BlockButton
                    title="Sign Up With Google"
                    color="google"
                    onPress={() => Linking.openURL('https://www.google.com/')}/>

                  <View style={{flexDirection: 'row', marginTop:'1%',}}>
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
      </ImageBackground>

  );
}
