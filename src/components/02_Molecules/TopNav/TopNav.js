import React, { useContext } from 'react'
import { View, Text, Footer, FooterTab, Button } from 'native-base';
import { styles } from './TopNav.styling';
import {user_logged_in} from '../../../functions/user_functions'
import GlobalState from '../../globalState';

function TopNav(props) {
    const {user, setUser} = useContext(GlobalState)
    const left = ['Home', 'Drawings', 'Coming Soon']
    const right = ['Your Feed', 'Hosts', 'Live']
    return (
      (props.fromActive) ?
        // admin active top nav
        <View>
          <Footer>
            <FooterTab>
              <Button style={left.includes(props.active) ? [styles.TopNav, styles.active] : styles.TopNav} onPress={() => props.navigation.navigate('Active')}>
                <Text style={{color: 'black'}}>Coming Soon</Text>
              </Button>
              <Button style={right.includes(props.active) ? [styles.TopNav, styles.active] : styles.TopNav} onPress={() => (user_logged_in(user)) ? props.navigation.navigate('ActiveLive') : props.navigation.navigate('NotLogin')}>
                <Text style={{color: 'black'}}>Live</Text>
              </Button>
            </FooterTab>
          </Footer>
        </View>
    
      : <View>
        <Footer>
          <FooterTab>
            <Button style={left.includes(props.active) ? [styles.TopNav, styles.active] : styles.TopNav} onPress={() => props.navigation.navigate((props.admin) ? 'AdminHome' : 'Home')}>
              <Text style={{color: 'black'}}>{(props.admin) ? 'Drawings' : 'Home'}</Text>
            </Button>
            <Button style={right.includes(props.active) ? [styles.TopNav, styles.active] : styles.TopNav} onPress={() => (user_logged_in(user)) ? props.navigation.navigate((props.admin) ? 'AdminHomeHosts' : 'YourFeed') : props.navigation.navigate('NotLogin')}>
              <Text style={{color: 'black'}}>{(props.admin) ? 'Hosts' : 'Your Feed'}</Text>
            </Button>
          </FooterTab>
        </Footer>
      </View>
    )
}

export default TopNav;