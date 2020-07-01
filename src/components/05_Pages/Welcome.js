import * as React from 'react';
import { View, Text, Image } from 'react-native';
import BlockButton from '../01_Atoms/Buttons/BlockButton/BlockButton';
import TextLink from '../01_Atoms/Buttons/TextLinks/TextLinks'

export default function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white'}}>
      {/* TODO: image should be aligned closer to the top */}
      <Image style={{ height:300, resizeMode:'contain'}} source={require('../../../assets/images/logo.png')}/>
      <Text style={{fontSize: 20, fontWeight:'bold', marginBottom: 25}}>Limited Flash-Drawings for Collectibles</Text>
      <Text style={{fontSize: 16}}>Donate to Make Change and Win.</Text>
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
        {/* TODO: Links to Explore (no explore page currently, button is not functional) */}
        <Text> or</Text>
        <TextLink
          title="Start Exploring"
          style={{color: 'black', textDecorationLine: 'underline'}}
          onPress={() => navigation.navigate('Welcome')}/>
      </View>
    </View>
  );
}