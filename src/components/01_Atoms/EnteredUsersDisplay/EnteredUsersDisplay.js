// insta button + facebook button + login button

import React from 'react';
import {TouchableOpacity, Text, Image, View, ScrollView} from 'react-native';
import { fonts, utilities } from '../../../settings/all_settings';
import styles from './EnteredUsersDisplay.styling';

function EnteredUsersDisplay(props){

    return (
        <TouchableOpacity onPress={() => props.navigation.navigate('EnteredUsers')}>
            <View style={styles.container}>
                <Image style={[styles.image, styles.image_overlapped]} source={{uri: "https://i.pinimg.com/originals/dc/24/88/dc2488feb2d6dc4750a95a1f715c67d8.jpg"}} />
                <Image style={styles.image} source={{uri: "https://vignette.wikia.nocookie.net/avatar/images/7/7a/Katara_smiles_at_coronation.png/revision/latest?cb=20150104171449"}} />
                <Text style={[fonts.p,{marginLeft: 5}]}>Entered by user1 and 12 others</Text>
            </View>
        </TouchableOpacity>
    )
}

export default EnteredUsersDisplay;