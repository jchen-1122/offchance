import React from 'react'
import {View, Image, Text, Button} from 'react-native'
import BlockButton from '../../01_Atoms/Buttons/BlockButton/BlockButton'
import {fonts} from '../../../settings/fonts'

function HostedBy({navigation, image, account}) {
 return (
    <View style={{flexDirection:'row'}}>
         <Image source={image} style={{width:20, height: 20, borderRadius: 20 / 2, marginLeft: 30, marginBottom: 10}}></Image>
         <Text> Hosted by {account} </Text>
         {/* @chelly I dont want to mess with block button, can you add a customized follow button so its aligned to the right (see Raffle demo) */}
         <BlockButton
            title={'Follow'}
            color="secondary"
            size="small"
            onPress={() => navigation.navigate('Profile')}></BlockButton>
     </View>
 )
}

export default HostedBy;