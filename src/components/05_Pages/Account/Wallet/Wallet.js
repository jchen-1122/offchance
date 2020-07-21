import React, {useState} from 'react'
import { View, ScrollView, Text, Image, Animated, Button, } from 'react-native'
import BottomNav from '../../../02_Molecules/BottomNav/BottomNav'
import {utilities, fonts, colors} from '../../../../settings/all_settings';
import styles from './Wallet.styling';
import BlockButton from '../../../01_Atoms/Buttons/BlockButton/BlockButton';
import { set } from 'react-native-reanimated';
import { get_user } from '../../../fake_users/stub-users';
import SlidingSheet from '../../../04_Templates/SlidingSheet/SlidingSheet';

import SlidingUpPanel from 'rn-sliding-up-panel';

export default function Wallet({navigation}) {

  const [sheetOpen, setSheetOpen] = useState(false);
  const [bounceValue, setBounceValue] = useState(new Animated.Value(1000)); // initial position of sheet

  const toggleSheet = () => {
      var toValue = 1000;
      if (sheetOpen == false) {
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

      setSheetOpen(!sheetOpen);
  };

    return (
        <View style={utilities.container}>
            <Text style={{fontSize: 40, }}>Balance</Text>

            <BlockButton
                title="ADD CHANCES"
                color="primary"
                onPress={() => toggleSheet()}/>

            {/* sliding sheet */}
            <View style={utilities.container}>
              <Button title='Show panel' onPress={() => this._panel.show()} />
              
              <SlidingUpPanel ref={c => this._panel = c}>
                <View style={styles.container}>
                  <Text>Here is the content inside panel</Text>
                  <Button title='Hide' onPress={() => this._panel.hide()} />
                </View>
              </SlidingUpPanel>

            </View>

            <BottomNav navigation={navigation} active={'Account'}></BottomNav>
        </View>
    )
}
