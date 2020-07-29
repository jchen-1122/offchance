import React, { Component } from "react";
import { TextInput, StyleSheet, Text, ScrollView, View, Dimensions, Button } from "react-native";
import BottomNav from '../../02_Molecules/BottomNav/BottomNav'
import io from "socket.io-client";

export default class Social extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatMessage: "",
      chatMessages: []
    };
  }

  componentDidMount() {
    const ip = require('../../IP_ADDRESS.json')
    this.socket = io("http://" +ip.ipAddress+ ":3000");
    this.socket.on("message", msg => {
      this.setState({ chatMessages: [...this.state.chatMessages, msg] });
    });
  }

  submitChatMessage() {
    this.socket.emit("message", this.state.chatMessage);
    this.setState({ chatMessage: "" });
  }

  render() {
    const chatMessages = this.state.chatMessages.map(chatMessage => (
      <Text style={{fontSize: 40}} key={chatMessage}>{chatMessage}</Text>
    ));

    return (
      <View style={{position: 'absolute', marginTop: Dimensions.get('screen').height * 0.5, marginBottom: -Dimensions.get('screen').height * 0.4}}>
      <View>
      <ScrollView 
      snapToStart={false}
      contentContainerStyle={{flex: 0.7, flexDirection: 'column', marginLeft: Dimensions.get('screen').width * 0.035, maxHeight: Dimensions.get('screen').height * 0.3}}>  
        {chatMessages}
      </ScrollView>
      </View>
      <View style={{flexDirection: 'row', position: "absolute", marginTop: Dimensions.get('screen').height * 0.3, marginLeft: Dimensions.get('screen').width * 0.035}}>
      <TextInput
          style={{ height: 40, borderWidth: 4, width: 300 }}
          placeholder={'   Comment...'}
          autoCorrect={false}
          value={this.state.chatMessage}
          onSubmitEditing={() => this.submitChatMessage()}
          onChangeText={chatMessage => {
            this.setState({ chatMessage });
          }}
        />
        <Button title={'hide'}></Button>
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