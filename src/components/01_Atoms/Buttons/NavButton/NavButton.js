// insta button + facebook button + login button

import React from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';
import { styles } from "./NavButton.styling";
import { Icon } from 'react-native-elements';
import { colors } from '../../../../settings/all_settings';

function NavButton(props) {

    return (
        <TouchableOpacity style={styles.NavButton} onPress={props.onPress} disabled={props.disabled}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {props.profilePicture ?
                    <Image style={{ height: 25, width: 25, borderRadius: 25, marginRight: 15 }} source={{ uri: props.profilePicture }} /> :
                    <Icon name={props.icon} type='material-community' color={colors.darkGray} containerStyle={{ marginRight: 10 }} />
                }
                <Text style={styles.NavButton__label}>{props.title}</Text>
            </View>
            <Icon name='chevron-right' type='material-community' />
        </TouchableOpacity>
    )
}

export default NavButton;
