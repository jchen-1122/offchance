import React, { useContext, useState } from 'react'
import { View, ScrollView, Text, Image, Animated, Button, TouchableHighlight, Dimensions} from 'react-native'
import { set } from 'react-native-reanimated';
import { Overlay } from 'react-native-elements';
import GlobalState from '../../../globalState';
import BottomNav from '../../../02_Molecules/BottomNav/BottomNav'
import {utilities, fonts, colors} from '../../../../settings/all_settings';
import styles from './Wallet.styling';
import BlockButton from '../../../01_Atoms/Buttons/BlockButton/BlockButton';
import { get_user } from '../../../fake_users/stub-users';
import SlidingSheet from '../../../04_Templates/SlidingSheet/SlidingSheet';

export default function Wallet({navigation}) {

  const {user, setUser} = useContext(GlobalState)
  const [sheetOpen, setSheetOpen] = useState(false); // isHidden
  const [bounceValue, setBounceValue] = useState(new Animated.Value(1000)); // initial position of sheet
  const [containerStyle, setContainerStyle] = useState(styles.container);

  const { width, height } = Dimensions.get('window');

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

      setContainerStyle( !sheetOpen ?
        {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      } : {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        });
      setSheetOpen(!sheetOpen);
  };

    // https://react-native-elements.github.io/react-native-elements/docs/overlay.html
    // <Overlay isVisible={isVisible}>
    //     <Text>Hello from Overlay!</Text>
    // </Overlay>

    let sizeTypes = ['W', 'M', 'Y'];

    return (
        <View style={containerStyle}>

            {/* Header */}
            <View>
                <Text style={styles.header}>Balance:</Text>
                {/* TODO: Retrieve user remaining chance from backend. */}
                <Text style={styles.chance}>{user.walletChances} CHANCES</Text>
                <Text style={styles.appendix}>*Chances can be used toward raffle entries</Text>
            </View>

            {/* Content */}
            <View>
                <Text style={styles.content}>Chances can be earned by sharing and inviting friends, playing games and reloading your wallet by donating!</Text>
            </View>

            <View style={styles.button}>
                <BlockButton
                    title="ADD CHANCES"
                    color="secondary"
                    size='short'
                    onPress={() => toggleSheet()}/>
            </View>

            {/* sliding sheet */}
            <Animated.View
                style={[styles.subView,
                { transform: [{ translateY: bounceValue }] }]}>
                    <SlidingSheet
                    title='Add Chances'
                    content={['Wallet Balance', 'Reload Source', 'Reload Amount']}
                    toggleSheet={toggleSheet} />
            </Animated.View>

            <BottomNav navigation={navigation} active={'Account'}></BottomNav>
        </View>
    )
}
