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
    const [containerStyle, setContainerStyle] = useState(styles.container);
    const [sheetController, setSheetController] = useState(0); // 0 - close, 1 - open. TODO: GLOBAL STATE

    const { width, height } = Dimensions.get('window');
    
    const trigger = () => {
        setSheetController(sheetController^1);

        setContainerStyle( sheetController === 0 ?
          { // light on
          flex: 1,
          justifyContent: 'space-between',
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        } : { // light off
          flex: 1,
          justifyContent: 'space-between',
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          });

        // console.log(sheetController); 101010
      }

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
                    onPress={() => trigger()}/>
            </View>

            {/* sliding sheet */}
            <SlidingSheet
            title='Add Chances'
            sheet={sheetController}
            content={['Wallet Balance', 'Reload Source', 'Reload Amount']}/>


            <BottomNav navigation={navigation} active={'Account'}></BottomNav>
        </View>
    )
}
