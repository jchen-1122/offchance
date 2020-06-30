import * as React from 'react';
import { View, Text, Image } from 'react-native';
import OffchanceLogo from '../../../assets/images/White Background - Logotype.png'
import BlockButton from '../01_Atoms/Buttons/BlockButton/BlockButton';
import TextLink from '../01_Atoms/Buttons/TextLinks/TextLinks'

export default function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {/* image not showing uo? */}
      <Image style={{width:50, height:50}} source={OffchanceLogo}/>
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
          onPress={() => navigation.navigate('Login')}/>
        {/* Links to Explore (no explore page currently, button is ) */}
        <Text> or </Text>
        <TextLink
          title="Start Exploring"
          style={{color: 'black', textDecorationLine: 'underline'}}
          onPress={() => navigation.navigate('Welcome')}/>
      </View>
    </View>
  );
}