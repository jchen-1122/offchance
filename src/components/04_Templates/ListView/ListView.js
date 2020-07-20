import React from 'react'
import {TouchableOpacity} from 'react-native'
import { View, Text, Footer, FooterTab, Button, Icon } from 'native-base';
import { fonts, utilities } from '../../../settings/all_settings';
import {styles} from './ListView.styling';

import UsernameDisplay from '../../01_Atoms/UsernameDisplay/UsernameDisplay';
import BlockButton from '../../01_Atoms/Buttons/BlockButton/BlockButton';

// e.g. the "top 10 donors" section
function ListView(props) {
    // build rows of usernames and profile pics
    let usernameList = [];
    for (let user in props.users) {
        usernameList.push(
            <View style={styles.ListViewRow}>
                <TouchableOpacity
                    onPress={() => {
                        props.navigation.navigate('OtherUser', {currUser: props.currUser, user: props.users[user]})}}>
                    <UsernameDisplay username={props.users[user].username} profPic={{uri: props.users[user].profilePic}} size="large"/>
                </TouchableOpacity>
                {props.users[user].followingBool ? 
                <BlockButton color="primary" size="small" title='FOLLOWED'/> :
                <BlockButton color="secondary" size="small" title='FOLLOW'/>}
            </View>
        )
    }

    let title;
    if (props.title){
        title = <Text style={[fonts.h1, {textAlign: 'center'}]}>{props.title}</Text>
    }
    return (
      <View>
          {title}
          {usernameList}
      </View>
    )
}

export default ListView;