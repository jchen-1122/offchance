import React, {useContext} from 'react';
import { ScrollView, View, Text, Image, Animated, Button, Dimensions} from 'react-native'
import {utilities, fonts, colors} from '../../../settings/all_settings';
import NavButton from '../../01_Atoms/Buttons/NavButton/NavButton';
import BlockButton from '../../01_Atoms/Buttons/BlockButton/BlockButton';
import BottomNav from '../../02_Molecules/BottomNav/BottomNav'
import { COLOR } from 'react-native-material-ui';
import { color } from 'react-native-reanimated';
import GlobalState from '../../globalState';

export default function Account({navigation}) {
    const {user, setUser} = useContext(GlobalState)
    // To change height, go to BlockButton.styling.js/BlockButton_transparent:height

    return (
        <View style={utilities.container}>
            <View>
              <NavButton title="Profile" icon="account" onPress={() => navigation.navigate('Profile')}/>
              <NavButton title="Wallet" icon="cash" onPress={() => navigation.navigate('Wallet')}/>
              <NavButton title="How It Works" icon="help-box" onPress={() => navigation.navigate('HowItWorks')}/>
              <NavButton title="FAQ" icon="frequently-asked-questions"onPress={() => navigation.navigate('FAQ')}/>
              {user.isHost ? null : <NavButton title="Request Business Account" icon="briefcase" onPress={() => navigation.navigate('ReqBesAcct')}/>}
              {user.isHost ? <NavButton title="My Drawings" icon = "ticket-outline" onPress={() => navigation.navigate('MyDrawings')}/>:null}
              <NavButton title="Log Out" icon="logout-variant"onPress={() => {
                  setUser({})
                  navigation.navigate(' ')}}/>
            </View>

            <BottomNav navigation={navigation} active={'Account'}/>
        </View>
    )
}
