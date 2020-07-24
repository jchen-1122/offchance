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
          <Button onPress={() => {(props.active === 'Home') ? props.navigation.navigate('Home') : props.navigation.reset({index: 0, routes: [{ name: 'Home' }]})}}>
              {(props.active === 'Home') ? <Icon name='home' type='material-community' color='white' /> : <Icon name='home-outline' type='material-community' color='grey' />}
              <Text style={[styles.textFont, (props.active === 'Home') ? {color:'white'} : null]}>Home</Text>
            </Button>
            <Button onPress={() => {(props.active === 'Social') ? props.navigation.navigate('Social') : props.navigation.reset({index: 0, routes: [{ name: 'Social' }]})}}>
              {(props.active === 'Social') ? <Icon name='chat' type='material-community' color='white' /> : <Icon name='chat-outline' type='material-community' color='grey' />}
              <Text style={[styles.textFont, (props.active === 'Social') ? {color:'white'} : null]}>Social</Text>
            </Button>
            <Button onPress={() => {(props.active === 'Drawings') ? props.navigation.navigate('Drawings') : props.navigation.reset({index: 0, routes: [{ name: 'Drawings' }]})}}>
              {(props.active === 'Drawings') ? <Icon name='magnify' type='material-community' color='white' /> : <Icon name='magnify' type='material-community' color='grey' />}
              <Text style={[styles.textFont, (props.active === 'Drawings') ? {color:'white'} : null]}>Search</Text>
            </Button>
            <Button onPress={() => {(props.active === 'Likes') ? props.navigation.navigate('Likes') : props.navigation.reset({index: 0, routes: [{ name: 'Likes' }]})}}>
            {(props.active === 'Likes') ? <Icon name='heart' type='material-community' color='white' /> : <Icon name='heart-outline' type='material-community' color='grey' />}
            <Text style={[styles.textFont, (props.active === 'Likes') ? {color:'white'} : null]}>Likes</Text>
            </Button>
            <Button onPress={() => (user_logged_in(user)) ? props.navigation.navigate('Account') : props.navigation.navigate('NotLogin')}>
            {(props.active === 'Account') ? <Icon name='account' type='material-community' color='white' /> : <Icon name='account-outline' type='material-community' color='grey' />}
              <Text style={[styles.textFont, (props.active === 'Account') ? {color:'white'} : null]}>Account</Text>
            </Button>
          </FooterTab>
        </Footer>
      </View>
    )
}

export default BottomNav;
