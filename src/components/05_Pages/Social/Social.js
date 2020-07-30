import React, { Component } from "react";
import { TextInput, StyleSheet, Text, ScrollView, View, Dimensions, Image, Button } from "react-native";
import {Icon} from 'react-native-elements'
import BottomNav from '../../02_Molecules/BottomNav/BottomNav'
import io from "socket.io-client";
import { min } from "react-native-reanimated";

export default class Social extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatMessage: {},
      chatMessages: [],
      chatOn: true
    };
  }

  componentDidMount() {
    const ip = require('../../IP_ADDRESS.json')
    this.socket = io("http://" +ip.ipAddress+ "");
    this.socket.on("message", msg => {
      this.setState({ chatMessages: [msg, ...this.state.chatMessages] });
    });
  }

  submitChatMessage() {
    this.socket.emit("message", {message: this.state.chatMessage, profilePicture: this.props.currUser.profilePicture, username: this.props.currUser.username});
    this.setState({ chatMessage: {} });
  }

  render() {
    const chatMessages = this.state.chatMessages.map(chatMessage => (
      <View style={{flexDirection: 'row', marginBottom: Dimensions.get('screen').height * 0.02, backgroundColor: 'rgba(255,250,250,0.7)', borderRadius: '22/2', padding: '2%', paddingBottom: '1%', maxWidth: Dimensions.get('screen').width * 0.82, width: Math.max(chatMessage.message.length * 11, chatMessage.username.length * 13)}}>
        <Image source={{uri: chatMessage.profilePicture}} style={{width: 40, height: 40, borderRadius: 40/2 }}></Image>
        <View style={{marginLeft: Dimensions.get('screen').width * 0.01, marginRight: (chatMessage.message.length * 11 < Dimensions.get('screen').width * 0.82) ? 0 : Dimensions.get('screen').width * 0.13}}>
          <Text style={{fontSize: 14, color: 'black', fontWeight: '700'}}>{chatMessage.username}</Text>
          <Text style={{fontSize: 14, color: 'black', fontWeight: '600'}}>{chatMessage.message}</Text>
        </View>
      </View>
    ));

    return (
      <View style={{position: 'absolute', marginTop: Dimensions.get('screen').height * 0.5}}>
      <View>
      <ScrollView 
      directionalLockEnabled={false}
      contentContainerStyle={{flexDirection: 'column-reverse', marginLeft: Dimensions.get('screen').width * 0.035, maxHeight: Dimensions.get('screen').height * 0.25}}>  
        {this.state.chatOn ? chatMessages : null}
      </ScrollView>
      </View>
      <View style={{flexDirection: 'row', position: "absolute", marginTop: Dimensions.get('screen').height * 0.3, marginLeft: Dimensions.get('screen').width * 0.035}}>
      <TextInput
          style={{ height: 40, width: 300, backgroundColor: 'white', borderRadius: '22/2' }}
          placeholder={'  Comment...'}
          autoCorrect={false}
          value={this.state.chatMessage}
          onSubmitEditing={() => this.submitChatMessage()}
          onChangeText={chatMessage => {  
            this.setState({ chatMessage });
          }}
        />
        {this.state.chatOn ? 
        <Text style={{fontSize: 14, color: 'black', fontWeight: '800', margin: 10}} onPress={() => this.setState({chatOn: !this.state.chatOn})}>HIDE</Text>
        :
        <Text style={{fontSize: 14, color: 'black', fontWeight: '800', margin: 10}} onPress={() => this.setState({chatOn: !this.state.chatOn})}>SHOW</Text>
        }
      </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF"
  }
});