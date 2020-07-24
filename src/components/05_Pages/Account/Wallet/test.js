<View>
    <View style={{flex: 1, justifyContent: 'space-between', alignItems: 'center'}}>
        <Text style={{fontSize: 40, }}>Balance</Text>
        <BlockButton
            title="ADD CHANCES"
            color="primary"
            onPress={() => toggleSheet()}/>
            <BottomNav navigation={navigation} active={'Account'}></BottomNav>
    </View>

    <View>
        {/* sliding sheet */}
        <Animated.View
            style={[styles.subView,
            { transform: [{ translateY: bounceValue }] }]}>
            <SlidingSheet
            title='Add Chances'
            content={['Wallet Balance', 'Reload Source', ]}
            toggleSheet={toggleSheet} />
        </Animated.View>
    </View>
</View>



<View style={utilities.container}>
  <Button title='Show panel' onPress={() => this._panel.show()} />

  <SlidingUpPanel ref={c => this._panel = c}>
    <View style={styles.container}>
      <Text>Here is the content inside panel</Text>
      <Button title='Hide' onPress={() => this._panel.hide()} />
    </View>
  </SlidingUpPanel>

</View>


return (
    <View style={utilities.container}>
        <Text style={{fontSize: 40, }}>Balance</Text>

        <BlockButton
            title="ADD CHANCES"
            color="primary"
            onPress={() => toggleSheet()}/>

        {/* sliding sheet */}
        <Animated.View
            style={[styles.subView,
            { transform: [{ translateY: bounceValue }] }]}>
            <Overlay isVisible={isVisible}>
                <SlidingSheet
                title='Add Chances'
                content={['Wallet Balance', 'Reload Source', ]}
                toggleSheet={toggleSheet} />
            </Overlay>
        </Animated.View>

        <BottomNav navigation={navigation} active={'Account'}></BottomNav>
    </View>
)




// https://www.npmjs.com/package/react-native-sliding-up-down-panel
return (
      <View style={styles.container}>

          <Text style={{fontSize: 40, }}>Balance</Text>

          <BlockButton
              title="ADD CHANCES"
              color="primary"
              onPress={() => toggleSheet()}/>

          <SlidingPanel
              headerLayoutHeight = {100}
              headerLayout = { () =>
                  <View style={styles.headerLayoutStyle}>
                    <Text style={styles.commonTextStyle}>My Awesome sliding panel</Text>
                  </View>
              }
              slidingPanelLayout = { () =>
                  <View style={styles.slidingPanelLayoutStyle}>
                    <Text style={styles.commonTextStyle}>The best thing about me is you</Text>
                  </View>
              }
          />
    </View>
)

import React, {useState} from 'react'
import { View, ScrollView, Text, Image, Animated, Button, TouchableHighlight, Dimensions} from 'react-native'
import { set } from 'react-native-reanimated';
import { Overlay } from 'react-native-elements';

import BottomNav from '../../../02_Molecules/BottomNav/BottomNav'
import {utilities, fonts, colors} from '../../../../settings/all_settings';
import styles from './Wallet.styling';
import BlockButton from '../../../01_Atoms/Buttons/BlockButton/BlockButton';
import { get_user } from '../../../fake_users/stub-users';
import SlidingSheet from '../../../04_Templates/SlidingSheet/SlidingSheet';

import SlidingUpPanel from 'rn-sliding-up-panel';
import SlidingPanel from 'react-native-sliding-up-down-panels';

export default function Wallet({navigation}) {

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

    return (
        <View style={containerStyle}>
            <Text style={{fontSize: 40, }}>Balance</Text>

            <BlockButton
                title="ADD CHANCES"
                color="primary"
                onPress={() => toggleSheet()}/>

            {/* sliding sheet */}
            <Animated.View
                style={[styles.subView,
                { transform: [{ translateY: bounceValue }] }]}>
                    <SlidingSheet
                    title='Add Chances'
                    content={['Wallet Balance', 'Reload Source', ]}
                    toggleSheet={toggleSheet} />
            </Animated.View>

            <BottomNav navigation={navigation} active={'Account'}></BottomNav>
        </View>
    )
}
