import React from 'react'
import {View, Image, Text, Button} from 'react-native'
import BlockButton from '../../01_Atoms/Buttons/BlockButton/BlockButton';
import styles from './HostedBy.styling';
import {utilities} from '../../../settings/all_settings';

function HostedBy({navigation, data, backColor}) {
 let username;
 let profPic;
 if (data){
   username = data.username
   profPic = data.profilePicture
 }
 return (
    <View style={[styles.hostedby, {backgroundColor: backColor}]}>
       <View style={styles.hostedby__profile}>
         <Image source={{uri: profPic}} style={styles.hostedby__image}></Image>
         <Text>{'@'+username}</Text>
       </View>
         <BlockButton
            title={'Follow'}
            color="secondary"
            size="small"
            onPress={() => navigation.navigate('Profile')}></BlockButton>
     </View>
 )
}

export default HostedBy;