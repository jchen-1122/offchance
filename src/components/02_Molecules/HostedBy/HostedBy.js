import React from 'react'
import {View, Image, Text, Button} from 'react-native'
import BlockButton from '../../01_Atoms/Buttons/BlockButton/BlockButton';
import styles from './HostedBy.styling';
import {utilities} from '../../../settings/all_settings';

function HostedBy({navigation, image, account, backColor}) {
 return (
    <View style={[styles.hostedby, {backgroundColor: backColor}]}>
       <View style={styles.hostedby__profile}>
         <Image source={image} style={styles.hostedby__image}></Image>
         <Text> {account} </Text>
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