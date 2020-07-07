import React from 'react'
import { View, Text, Footer, FooterTab, Button } from 'native-base';
import { styles } from './TopNav.styling';

function TopNav(props) {
    return (
      <View>
        <Footer>
          <FooterTab>
            <Button style={props.active == 'Home' ? styles.active : null} onPress={() => props.navigation.navigate('Home')}>
              <Text>Home</Text>
            </Button>
            <Button style={props.active == 'Your Feed' ? styles.active : null} onPress={() => props.navigation.navigate('YourFeed')}>
              <Text>Your Feed</Text>
            </Button>
            <Button style={props.active == 'Explore' ? styles.active : null} onPress={() => props.navigation.navigate('Explore')}>
              <Text>Explore</Text>
            </Button>
          </FooterTab>
        </Footer>
      </View>
    )
}

export default TopNav;