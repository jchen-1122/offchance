import React, {useState} from 'react'
import { View, Text, Footer, FooterTab, Button, Icon } from 'native-base';
import {colors} from '../../../settings/colors'

function BottomNav(props) {
    return (
      // @chelly (can't figure out how to make the footer hug the bottom of the screen)
      <View>
        <Footer>
          <FooterTab>
            <Button onPress={() => {props.navigation.navigate('Home')}}>
              <Icon name="home" style={(props.active === 'Home') ? {color:colors.highlightColor} : null}/>
              <Text>Home</Text>
            </Button>
            <Button onPress={() => {props.navigation.navigate('Drawings')}}>
              <Icon name="navigate" style={(props.active === 'Drawings') ? {color:colors.highlightColor} : null}/>
              <Text>Drawings</Text>
            </Button>
            <Button onPress={() => props.navigation.navigate('Likes')}>
              <Icon name="card" style={(props.active === 'Likes') ? {color:colors.highlightColor} : null}/>
              <Text>Likes</Text>
            </Button>
            <Button onPress={() => props.navigation.navigate('Profile')}>
              <Icon name="person" style={(props.active === 'Account') ? {color:colors.highlightColor} : null}/>
              <Text>Account</Text>
            </Button>
          </FooterTab>
        </Footer>
      </View>
    )
}

export default BottomNav;