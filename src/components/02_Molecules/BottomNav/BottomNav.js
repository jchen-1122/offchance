import React from 'react'
import { View, Text, Footer, FooterTab, Button, Icon } from 'native-base';

function BottomNav(props) {
    return (
      <View>
        <Footer style={{backgroundColor: 'orange'}}>
          <FooterTab>
            <Button onPress={() => props.navigation.navigate('Home')}>
              <Icon name="home"/>
              <Text>Home</Text>
            </Button>
            <Button onPress={() => props.navigation.navigate('Drawings')}>
              <Icon name="navigate"/>
              <Text>Drawings</Text>
            </Button>
            <Button onPress={() => props.navigation.navigate('Likes')}>
              <Icon name="card" />
              <Text>Likes</Text>
            </Button>
            <Button onPress={() => props.navigation.navigate('Profile')}>
              <Icon name="person" />
              <Text>Account</Text>
            </Button>
          </FooterTab>
        </Footer>
      </View>
    )
}

export default BottomNav;