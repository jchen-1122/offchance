import React, { useContext } from 'react'
import { View, Text, Footer, FooterTab, Button, Icon } from 'native-base';
import {colors} from '../../../settings/colors'
import {user_logged_in} from '../../../functions/user_functions'
import GlobalState from '../../globalState';

function BottomNav(props) {
    const {user, setUser} = useContext(GlobalState)
    return (
      <View>
        <Footer>
          <FooterTab style={{backgroundColor: 'black'}}>
            <Button onPress={() => {props.navigation.navigate('Home')}}>
              <Icon name="home" style={(props.active === 'Home') ? {color:'white'} : null}/>
              <Text style={(props.active === 'Home') ? {color:'white'} : null}>Home</Text>
            </Button>
            <Button onPress={() => {props.navigation.navigate('Drawings')}}>
              <Icon name="navigate" style={(props.active === 'Drawings') ? {color:'white'} : null}/>
              <Text style={(props.active === 'Drawings') ? {color:'white'} : null}>Drawings</Text>
            </Button>
            <Button onPress={() => props.navigation.navigate('Likes')}>
              <Icon name="card" style={(props.active === 'Likes') ? {color:'white'} : null}/>
              <Text style={(props.active === 'Likes') ? {color:'white'} : null}>Likes</Text>
            </Button>
            <Button onPress={() => (user_logged_in(user)) ? props.navigation.navigate('Account') : props.navigation.navigate('NotLogin')}>
              <Icon name="person" style={(props.active === 'Account') ? {color:'white'} : null}/>
              <Text style={(props.active === 'Account') ? {color:'white'} : null}>Account</Text>
            </Button>
          </FooterTab>
        </Footer>
      </View>
    )
}

export default BottomNav;
