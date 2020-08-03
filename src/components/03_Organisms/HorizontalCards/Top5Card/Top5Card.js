import React from 'react';
import { Text, Image, View, TouchableOpacity } from 'react-native';
import styles from './Top5Card.styling';
import BlockButton from '../../../01_Atoms/Buttons/BlockButton/BlockButton'
import { fonts } from '../../../../settings/all_settings'

// for small, unclickable cards like in Latest Winners
function Top5Card(props) {
    let user = props.data
    return (
        <View style={styles.Top5Card}>
            <TouchableOpacity style={styles.touchable} onPress={() => props.navigation.navigate('OtherUser',{user: user})}>
                <Image style={styles.image} source={{ uri: user.profilePicture }} />
                <Text style={[fonts.h3, styles.name]}>@{user.username}</Text>
            </TouchableOpacity>
            <BlockButton color="primary" title="FOLLOW" size="small"/>
        </View>
    )
}

export default Top5Card;