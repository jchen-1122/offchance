import React, { useContext, useState } from 'react'
import { View, Text, Footer, FooterTab, Button } from 'native-base';
import { colors } from '../../../settings/colors'
import { user_logged_in } from '../../../functions/user_functions'
import GlobalState from '../../globalState';
import { Icon } from 'react-native-elements';
import styles from './Bottomnav.styling'

// Line 12 (home ~ home-outline)
// Line 19 (chat ~ chat-outline)
// Line 28 (heart ~ heart-outline)
// Line 33 (account ~ account-outline)

function BottomNav(props) {
  const { user, setUser } = useContext(GlobalState)
  return (
    <View>
      <Footer>
        <FooterTab style={{ backgroundColor: 'black' }}>

          <Button onPress={() => { (props.active === 'Home') ? props.navigation.navigate('Home') : props.navigation.reset({ index: 0, routes: [{ name: 'Home' }] }) }}>
            {(props.active === 'Home') ? <Icon name='home' type='material-community' color='white' /> : <Icon name='home-outline' type='material-community' color='grey' />}
            <Text style={[styles.textFont, (props.active === 'Home') ? { color: 'white' } : null]}>Home</Text>
          </Button>

          <Button onPress={() => { (props.active === 'MyDrawings') ? props.navigation.navigate('MyDrawings') : props.navigation.reset({ index: 0, routes: [{ name: 'MyDrawings' }] }) }}>
            {(props.active === 'MyDrawings') ? <Icon name='chat' type='material-community' color='white' /> : <Icon name='chat-outline' type='material-community' color='grey' />}
            <Text style={[styles.textFont, (props.active === 'MyDrawings') ? { color: 'white' } : null]}>Social</Text>
          </Button>

          <Button onPress={() => { (props.active === 'Search') ? props.navigation.navigate('Search') : props.navigation.reset({ index: 0, routes: [{ name: 'Search' }] }) }}>
            {(props.active === 'Search') ? <Icon name='magnify' type='material-community' color='white' /> : <Icon name='magnify' type='material-community' color='grey' />}
            <Text style={[styles.textFont, (props.active === 'Search') ? { color: 'white' } : null]}>Search</Text>
          </Button>

          { user_logged_in(user) ? <Button onPress={() => { (props.active === 'Host') ? props.navigation.navigate('HostDashboard') : props.navigation.reset({ index: 0, routes: [{ name: 'HostDashboard' }] }) }}>
            {(props.active === 'Host') ? <Icon name='checkbox-marked-circle' type='material-community' color='white' /> : <Icon name='checkbox-marked-circle-outline' type='material-community' color='grey' />}
            <Text style={[styles.textFont, (props.active === 'Host') ? { color: 'white' } : null]}>Host</Text>
          </Button> :
          <Button onPress={() => { (props.active === 'Host') ? props.navigation.navigate('NotLogin') : props.navigation.reset({ index: 0, routes: [{ name: 'NotLogin' }] }) }}>
            {(props.active === 'Host') ? <Icon name='checkbox-marked-circle' type='material-community' color='white' /> : <Icon name='checkbox-marked-circle-outline' type='material-community' color='grey' />}
            <Text style={[styles.textFont, (props.active === 'Host') ? { color: 'white' } : null]}>Host</Text>
          </Button> }

          <Button onPress={() => (user_logged_in(user)) ? props.navigation.navigate('Profile') : props.navigation.navigate('NotLogin')}>
            {(props.active === 'Account') ? <Icon name='account' type='material-community' color='white' /> : <Icon name='account-outline' type='material-community' color='grey' />}
            <Text style={[styles.textFont, (props.active === 'Account') ? { color: 'white' } : null]}>Account</Text>
          </Button>
        </FooterTab>
      </Footer>
    </View>
  )
}

export default BottomNav;
