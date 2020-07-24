import React, { useContext, useState } from 'react';
import { ScrollView, View, Text, Image, Animated, Button, Dimensions, } from 'react-native'
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

    return (
        <View style={utilities.container}>
            <View>
              <NavButton title="Profile" icon="account" onPress={() => navigation.navigate('Profile')}/>
              <NavButton title="Wallet" icon="cash" onPress={() => navigation.navigate('Wallet')}/>
              <NavButton title="How It Works" icon="help-box" onPress={() => navigation.navigate('HowItWorks')}/>
              <NavButton title="FAQ" icon="frequently-asked-questions"onPress={() => navigation.navigate('FAQ')}/>
              {user.isHost ? null : <NavButton title="Request Business Account" icon="briefcase" onPress={() => navigation.navigate('ReqBesAcct')}/>}
              {user.isHost ? <NavButton title="My Drawings" icon = "ticket-outline" onPress={() => navigation.navigate('MyDrawings')}/>:null}
              <NavButton title="Log Out" icon="logout-variant"onPress={() => {setIsVisible(true)}}/>

              <View >
                  <Overlay
                      isVisible={isVisible}
                      height={200}
                      width={400}
                      >

                      <Text style={styles.logOutText}> Do you really want to log out? </Text>

                      <View style={{flexDirection: 'row', marginTop:'1%',}}>
                          <BlockButton
                              title="Log Out"
                              color="logOut"
                              size='short'
                              onPress={() => {setUser({})
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
              </View>

            </View>
            <BottomNav navigation={navigation} active={'Account'}/>
        </View>
    )
}
