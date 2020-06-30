import * as React from 'react';
import { Button, View, Text } from 'react-native';

// just for the examples, delete later
import Divider from '../01_Atoms/Divider/Divider.js';
import BlockButton from '../01_Atoms/Buttons/BlockButton/BlockButton.js';

export default function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Navigation sucks</Text>

      {/* just examples, to be removed later */}
      <Divider />
      <BlockButton title="PRIMARY BUTTON" color="primary" />
      <BlockButton title="SECONDARY BUTTON" color="secondary" />
      <BlockButton title="FACEBOOK BUTTON" color="facebook" />
      <BlockButton title="INSTA BUTTON" color="instagram" />
      {/* ------------------------------------------ */}

      <Button
        title="Signup"
        onPress={() => navigation.navigate('Signup')}
      />
      <Button
        title="Login"
        onPress={() => navigation.navigate('Login')}
      />
    </View>
  );
}