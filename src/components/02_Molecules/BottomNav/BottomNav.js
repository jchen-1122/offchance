import React, {useState} from 'react'
import { View, Text, Footer, FooterTab, Button, Icon } from 'native-base';
import {colors} from '../../../settings/colors'

function BottomNav(props) {
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
            <Button onPress={() => props.navigation.navigate('Profile')}>
              <Icon name="person" style={(props.active === 'Account') ? {color:'white'} : null}/>
              <Text style={(props.active === 'Account') ? {color:'white'} : null}>Account</Text>
            </Button>
          </FooterTab>
        </Footer>
      </View>
    )
}

export default BottomNav;
