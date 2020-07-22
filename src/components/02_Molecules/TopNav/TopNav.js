import React, { useContext } from 'react'
import { View, Text, Footer, FooterTab, Button } from 'native-base';
import { styles } from './TopNav.styling';
import {user_logged_in} from '../../../functions/user_functions'
import GlobalState from '../../globalState';

function TopNav(props) {
    const {user, setUser} = useContext(GlobalState)
    return (
      <View>
        <Footer>
          <FooterTab>
            <Button style={props.active == 'Home' ? styles.active : null} onPress={() => props.navigation.navigate('Home')}>
              <Text>Home</Text>
            </Button>
            <Button style={props.active == 'Your Feed' ? styles.active : null} onPress={() => (user_logged_in(user)) ? props.navigation.navigate('YourFeed') : props.navigation.navigate('NotLogin')}>
              <Text>Your Feed</Text>
            </Button>
          </FooterTab>
        </Footer>
      </View>
    )
}

export default TopNav;