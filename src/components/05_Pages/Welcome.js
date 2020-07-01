import * as React from 'react';
import { View, Text, Image } from 'react-native';
import OffchanceLogo from '../../../assets/images/WhiteBackground-Logotype.png'
import BlockButton from '../01_Atoms/Buttons/BlockButton/BlockButton';
import TextLink from '../01_Atoms/Buttons/TextLinks/TextLinks'

export default function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {/* DONE: image not showing up? */}
      {/* Removed spaces from logo file name */}
      <Image style={{width:293, height:293}} source={OffchanceLogo}/>
      <Text>Limited Flash-Drawings for Collectibles</Text>
      <Text>Donate to Make Change and Win.</Text>
      {/* Links to Signup */}
      <BlockButton 
        title="SIGN UP" 
        color="primary"
        onPress={() => navigation.navigate('Signup')}/>
      <View style={{flexDirection: 'row'}}>
        {/* Links to Login */}
        <TextLink
          title="Log in"
          style={{color: 'black', textDecorationLine: 'underline'}}
          onPress={() => navigation.navigate('Login', { reset: false })}/>
        {/* TODO: Links to Explore (no explore page currently, button is not functional) */}
        <Text> or </Text>
        <TextLink
          title="Start Exploring"
          style={{color: 'black', textDecorationLine: 'underline'}}
          onPress={() => navigation.navigate('Welcome')}/>
      </View>
    </View>
  );
}