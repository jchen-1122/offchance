import React from 'react'
import { View, Text, Footer, FooterTab, Button } from 'native-base';

function TopNav(props) {
    return (
      <View>
        <Footer>
          <FooterTab>
            <Button onPress={() => props.navigation.navigate('Home')}>
              <Text>Home</Text>
            </Button>
            <Button onPress={() => props.navigation.navigate('YourFeed')}>
              <Text>Your Feed</Text>
            </Button>
            <Button onPress={() => props.navigation.navigate('Explore')}>
              <Text>Explore</Text>
            </Button>
          </FooterTab>
        </Footer>
      </View>
    )
}

export default TopNav;