import React, { useContext, useState } from 'react';
import { ScrollView, View, Text, Image, Animated, Button, Dimensions, TouchableOpacity, AsyncStorage, Alert } from 'react-native'
import { Overlay } from 'react-native-elements';
import {utilities, fonts, colors} from '../../../settings/all_settings';
import NavButton from '../../01_Atoms/Buttons/NavButton/NavButton';
import BlockButton from '../../01_Atoms/Buttons/BlockButton/BlockButton';
import BottomNav from '../../02_Molecules/BottomNav/BottomNav'
import GlobalState from '../../globalState';

export default function Account({navigation}) {
    const {user, setUser} = useContext(GlobalState)

    return (
        <View style={utilities.container}>
            <View>
              <NavButton title="Profile" icon="account" onPress={() => navigation.navigate('Profile')}/>
              <NavButton title="Wallet" icon="cash" onPress={() => navigation.navigate('Wallet')}/>
              <NavButton title="How It Works" icon="help-box" onPress={() => navigation.navigate('HowItWorks', {fromLogin: false})}/>
              <NavButton title="FAQ" icon="frequently-asked-questions"onPress={() => navigation.navigate('FAQ')}/>
              <NavButton title="My Likes" icon="heart" onPress={()=>navigation.navigate('Likes')}/>
              <NavButton title="Log Out" icon="logout-variant" onPress={() => 
                  Alert.alert(
                    "Log Out?",
                    "Are you sure you want to log out?",
                    [
                      {
                        text: "Cancel",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                      },
                      { text: "OK", onPress: 
                      async () => {
                        await AsyncStorage.removeItem('user')
                        setUser({})
                    navigation.reset({
                      index: 0,
                      routes: [{ name: ' ' }]
                    })}
                     }
                    ],
                    { cancelable: true }
                  )
            }/>

            </View>
            <BottomNav navigation={navigation} active={'Account'}/>
        </View>
    )
}
