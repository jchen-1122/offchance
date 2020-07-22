import React from 'react'
import { View, Image, Text, Button } from 'react-native'
import BlockButton from '../../01_Atoms/Buttons/BlockButton/BlockButton';
import styles from './HostedBy.styling';
import { utilities, fonts } from '../../../settings/all_settings';
import { TouchableOpacity } from 'react-native-gesture-handler';

function HostedBy({ navigation, data, backColor }) {
  // get username and prof pic info from db
  let username;
  let profPic;
  if (data) {
    username = data.username
    profPic = data.profilePicture
  }
  
  return (
    <View style={[styles.hostedby, { backgroundColor: backColor }]}>
      <TouchableOpacity onPress={() => navigation.navigate('Profile',data)}>
        <View style={styles.hostedby__profile}>
          <Image source={{ uri: profPic }} style={styles.hostedby__image}></Image>
          <Text style={fonts.link}>{'@' + username}</Text>
        </View>
      </TouchableOpacity>

      <BlockButton
        title={'Follow'}
        color="secondary"
        size="small" />
    </View>
  )
}

export default HostedBy;