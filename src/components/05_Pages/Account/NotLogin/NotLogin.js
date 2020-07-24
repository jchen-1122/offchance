import React, {useState} from 'react'
import { View, ScrollView, Text, Image, Dimensions} from 'react-native'
import BottomNav from '../../../02_Molecules/BottomNav/BottomNav'
import BlockButton from '../../../01_Atoms/Buttons/BlockButton/BlockButton';
import TextLink from '../../../01_Atoms/Buttons/TextLinks/TextLinks';
import {utilities, fonts, colors} from '../../../../settings/all_settings';
import styles from './NotLogin.styling';
import { set } from 'react-native-reanimated';
import { get_user } from '../../../fake_users/stub-users';

export default function NotLogin({navigation}) {

    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    return (
        <View style={utilities.container}>
            <View style={styles.content}>
                <Text style={[fonts.h1, {marginTop: windowHeight*.2, textAlign: "center", fontSize: 23}]}>Sign Up or Log In to Enter Drawings!</Text>
                <BlockButton
                title="SIGN UP"
                color="primary"
                onPress={() => navigation.navigate('Signup')}/>
                <BlockButton
                title="LOG IN"
                color="secondary"
                onPress={() => navigation.navigate('Login', { reset: false })}/>
            </View>
            <BottomNav navigation={navigation} active={'Account'}></BottomNav>
        </View>
    )
}
