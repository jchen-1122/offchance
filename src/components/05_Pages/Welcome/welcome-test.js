import React, { useEffect } from 'react';
import { View, Text, Image, ImageBackground } from 'react-native';
import BlockButton from '../../01_Atoms/Buttons/BlockButton/BlockButton';
import TextLink from '../../01_Atoms/Buttons/TextLinks/TextLinks';
import {styles} from './Welcome.styling';
// import {fonts} from '../../../settings/fonts';
import {colors, fonts, utilities} from '../../../settings/all_settings';


export default function HomeScreen({ navigation }) {

  var image = require('../../../../assets/images/background.jpg')

  return (
      <ImageBackground source={image} style={styles.image} imageStyle= {{opacity:0.5}}>
          <View style={styles.container}>

                  {/* TODO: image should be aligned closer to the top */}
                  <Image style={styles.logo} source={require('../../../../assets/images/logo2.png')}/>
                  <Text style={[fonts.h1, {textAlign: 'center', marginBottom: 15, fontSize: 25}]}>Daily Live Drawings for the Hottest Sneakers and Collectables</Text>
                  <Text style={fonts.p, {fontSize: 18}}>Donate to Important Causes and Win</Text>

                  {/* Links to Signup */}
                  <BlockButton
                    title="SIGN UP FOR 5 FREE CHANCES"
                    color="secondary"
                    onPress={() => navigation.navigate('Signup')}/>

                  <Text style={fonts.p, {fontSize: 14}}> ───────── OR ───────── </Text>

                  <BlockButton
                    title="Sign Up With Facebook"
                    color="facebook"
                    onPress={() => navigation.navigate('Signup')}/>

                  <BlockButton
                    title="Sign Up With Google"
                    color="google"
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
      </ImageBackground>

  );
}
