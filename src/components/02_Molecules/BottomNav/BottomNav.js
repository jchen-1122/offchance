import React, { useContext, useState } from 'react'
import { View, Text, Footer, FooterTab, Button } from 'native-base';
import {colors} from '../../../settings/colors'
import {user_logged_in} from '../../../functions/user_functions'
import GlobalState from '../../globalState';
import { Icon } from 'react-native-elements';
import styles from './Bottomnav.styling'

// Line 12 (home ~ home-outline)
// Line 19 (chat ~ chat-outline)
// Line 28 (heart ~ heart-outline)
// Line 33 (account ~ account-outline)

function BottomNav(props) {
    const {user, setUser} = useContext(GlobalState)
    return (
      <View>
        <Footer>
          <FooterTab style={{backgroundColor: 'black'}}>
          <Button onPress={() => {props.navigation.navigate('Home')}}>
              {(props.active === 'Home') ? <Icon name='home' type='material-community' color='white' /> : <Icon name='home-outline' type='material-community' color='grey' />}
              <Text style={[(props.active === 'Home') ? {color:'white'} : null, styles.textFont]}>Home</Text>
            </Button>
            <Button onPress={() => {props.navigation.navigate('Social')}}>
              {(props.active === 'Social') ? <Icon name='chat' type='material-community' color='white' /> : <Icon name='chat-outline' type='material-community' color='grey' />}
              <Text style={[(props.active === 'Social') ? {color:'white'} : null, styles.textFont]}>Social</Text>
            </Button>
            <Button onPress={() => {props.navigation.navigate('Drawings')}}>
              {(props.active === 'Drawings') ? <Icon name='magnify' type='material-community' color='white' /> : <Icon name='magnify' type='material-community' color='grey' />}
              <Text style={[(props.active === 'Drawings') ? {color:'white'} : null, styles.textFont]}>Search</Text>
            </Button>
            <Button onPress={() => props.navigation.navigate('Likes')}>
            {(props.active === 'Likes') ? <Icon name='heart' type='material-community' color='white' /> : <Icon name='heart-outline' type='material-community' color='grey' />}
            <Text style={[(props.active === 'Likes') ? {color:'white'} : null, styles.textFont]}>Likes</Text>
            </Button>
            <Button onPress={() => (user_logged_in(user)) ? props.navigation.navigate('Account') : props.navigation.navigate('NotLogin')}>
            {(props.active === 'Account') ? <Icon name='account' type='material-community' color='white' /> : <Icon name='account-outline' type='material-community' color='grey' />}
              <Text style={[(props.active === 'Account') ? {color:'white'} : null, styles.textFont]}>Account</Text>
            </Button>
          </FooterTab>
        </Footer>
      </View>
    )
}

export default BottomNav;
