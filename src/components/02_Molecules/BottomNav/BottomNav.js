import React from 'react'
import { View, Text, Footer, FooterTab, Button, Icon } from 'native-base';

function BottomNav() {
    return (
      <View>
        <Footer style={{backgroundColor: 'orange'}}>
          <FooterTab>
            <Button>
              <Icon name="home"/>
              <Text>Home</Text>
            </Button>
            <Button>
              <Icon name="navigate"/>
              <Text>Drawings</Text>
            </Button>
            <Button style={{width:2000, height: 3000}}>
              <Icon name="card" />
              <Text>Likes</Text>
            </Button>
            <Button>
              <Icon name="person" />
              <Text>Account</Text>
            </Button>
          </FooterTab>
        </Footer>
      </View>
    )
}

export default BottomNav;