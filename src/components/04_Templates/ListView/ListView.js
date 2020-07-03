import React from 'react'
import { View, Text, Footer, FooterTab, Button, Icon } from 'native-base';
import { fonts, utilities } from '../../../settings/all_settings';
import {styles} from './ListView.styling';

import UsernameDisplay from '../../01_Atoms/UsernameDisplay/UsernameDisplay';
import BlockButton from '../../01_Atoms/Buttons/BlockButton/BlockButton';

// e.g. the "top 10 donors" section
function ListView(props) {

    // build rows of usernames and profile pics
    let usernameList = [];
    for (let name in props.usernames) {
        usernameList.push(
            <View style={styles.ListViewRow}>
                <UsernameDisplay username={props.usernames[name]} profPic={props.profPics[name]}size="large"/>
                <BlockButton color="secondary" size="small" title="FOLLOW"/>
            </View>
        )
    }

    return (
      <View>
          <Text style={[fonts.h1, {textAlign: 'center'}]}>{props.title}</Text>
          {usernameList}
      </View>
    )
}

export default ListView;