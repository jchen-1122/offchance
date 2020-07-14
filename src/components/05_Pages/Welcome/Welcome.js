import React, { useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import BlockButton from '../../01_Atoms/Buttons/BlockButton/BlockButton';
import TextLink from '../../01_Atoms/Buttons/TextLinks/TextLinks';
import {styles} from './Welcome.styling';
// import {fonts} from '../../../settings/fonts';
import {colors, fonts, utilities} from '../../../settings/all_settings';

export default function HomeScreen({ navigation }) {

  useEffect(() => {
    fetch('http://10.0.0.145:3000/signup/5f0dd47a03a8ba7e10fb794e')
      .then((response) => response.json())
      .then((json) => console.log(json))
      .catch((error) => console.log(error))
  }, []);

  return (
    <View style={[utilities.flexCenter, styles.container]}>
      {/* TODO: image should be aligned closer to the top */}
      <Image style={styles.logo} source={require('../../../../assets/images/logo.png')}/>
      <Text style={[fonts.h1, {textAlign: 'center', marginBottom: 15}]}>Limited Flash-Drawings for Collectibles</Text>
      <Text style={fonts.p}>Donate to Make Change and Win.</Text>
      
      {/* Links to Signup */}
      <BlockButton 
        title="SIGN UP" 
        color="primary"
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