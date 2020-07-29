import React, { Component } from "react";
import { TextInput, StyleSheet, Text, ScrollView, View } from "react-native";
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
      <View >
      <ScrollView contentContainerStyle={{backgroundColor: 'green'}}>
        <Text style={{fontSize: 40}}>lol</Text>
        <Text style={{fontSize: 40}}>lol</Text>
        <Text style={{fontSize: 40}}>lol</Text>
        <Text style={{fontSize: 40}}>lol</Text>
        <Text style={{fontSize: 40}}>lol</Text>
        <Text style={{fontSize: 40}}>lol</Text>
      </ScrollView>
      <View style={{position: "absolute"}}>
      <TextInput
          style={{ height: 40, borderWidth: 2, width: 300, marginTop: 300 }}
          autoCorrect={false}
          value={this.state.chatMessage}
          onSubmitEditing={() => this.submitChatMessage()}
          onChangeText={chatMessage => {
            this.setState({ chatMessage });
          }}
        />
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