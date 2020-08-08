import React, { useContext, useState } from 'react';
import { ScrollView, View, Text, Image, Animated, Button, Dimensions, TouchableOpacity, AsyncStorage } from 'react-native'
import { Overlay } from 'react-native-elements';
import {utilities, fonts, colors} from '../../../settings/all_settings';
import NavButton from '../../01_Atoms/Buttons/NavButton/NavButton';
import BlockButton from '../../01_Atoms/Buttons/BlockButton/BlockButton';
import BottomNav from '../../02_Molecules/BottomNav/BottomNav'
import { COLOR } from 'react-native-material-ui';
import { color } from 'react-native-reanimated';
import GlobalState from '../../globalState';
import { styles } from './Account.styling'

export default function Account({navigation}) {
    const {user, setUser} = useContext(GlobalState)
    const [isVisible, setIsVisible] = useState(false);
    const [bounceValue, setBounceValue] = useState(new Animated.Value(0)); // initial position of sheet

    const toggleSheet = () => {
        setIsVisible(true);

        var toValue = 1000;
        if (isVisible == false) {
            toValue = 0
        }

        Animated.spring(
            bounceValue, {
            toValue: toValue,
            velocity: 3,
            tension: 2,
            friction: 8,
            useNativeDriver: true
        }).start();
    };

    return (
        <View style={utilities.container}>
            <View>
              <NavButton title="Profile" icon="account" onPress={() => navigation.navigate('Profile')}/>
              <NavButton title="Wallet" icon="cash" onPress={() => navigation.navigate('Wallet')}/>
              <NavButton title="How It Works" icon="help-box" onPress={() => navigation.navigate('HowItWorks', {fromLogin: false})}/>
              <NavButton title="FAQ" icon="frequently-asked-questions"onPress={() => navigation.navigate('FAQ')}/>
              <NavButton title="My Likes" icon="heart" onPress={()=>navigation.navigate('Likes')}/>
              <NavButton title="Log Out" icon="logout-variant" onPress={() => toggleSheet()}/>

                  <Animated.View
                    style={[  styles.container, {transform:[{ translateY: bounceValue }]}  ]}>

                      <Overlay
                          isVisible={isVisible}
                          height={200}
                          width={400}
                          onBackdropPress={() => {setIsVisible(false)}}>
                          <Text style={styles.logOutText}> Do you really want to log out? </Text>
                          <View style={{flexDirection: 'row', marginTop:'1%',}}>
                              <BlockButton
                                  title="Log Out"
                                  color="logOut"
                                  size='short'
                                  onPress={async () => {
                                      await AsyncStorage.removeItem('user')
                                      setUser({})
                                  navigation.reset({
                                    index: 0,
                                    routes: [{ name: ' ' }]
                                  })
                                  setIsVisible(false)}}/>
                              <BlockButton
                                  title="Not Now"
                                  color="secondary"
                                  size='short'
                                  onPress={() => {setIsVisible(false)}}/>
                          </View>
                      </Overlay>

                  </Animated.View>

            </View>
            <BottomNav navigation={navigation} active={'Account'}/>
        </View>
    )
}
