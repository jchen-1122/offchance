import * as React from 'react';
import { Button, View, Text } from 'react-native';

// just for the examples, delete later
import Divider from '../01_Atoms/Divider/Divider.js';
import BlockButton from '../01_Atoms/Buttons/BlockButton/BlockButton.js';
import InputField from '../02_Molecules/InputField/InputField.js';

export default function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Navigation sucks</Text>

      {/* just examples, to be removed later */}
      <Divider />
      <InputField label="Input" textArea/>
      <InputField label="Input"/>
      <BlockButton title="PRIMARY BUTTON" color="primary" />
      <BlockButton title="SECONDARY BUTTON" color="secondary" />
      {/* <BlockButton title="FACEBOOK BUTTON" color="facebook" />
      <BlockButton title="INSTA BUTTON" color="instagram" /> */}

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