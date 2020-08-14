import React, { Component } from "react";
import { TextInput, StyleSheet, Text, ScrollView, View, Dimensions, Image, Button, KeyboardAvoidingView } from "react-native";
import { Icon } from 'react-native-elements'
import BottomNav from '../../02_Molecules/BottomNav/BottomNav'
import io from "socket.io-client";
import { min } from "react-native-reanimated";
import { styles } from './Social.styling'
import { TouchableOpacity } from "react-native-gesture-handler";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default class Social extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatMessage: "",
      chatMessages: [],
      chatOn: true,
      // keyboardPadding: false,

    };
  }

  componentDidMount() {
    const ip = require('../../IP_ADDRESS.json')
    this.socket = io("http://192.168.0.22:4000");
    this.socket.emit("broadcast", { message: 'has joined the chat', profilePicture: this.props.currUser.profilePicture, username: this.props.currUser.username });
    this.socket.on("message", msg => {
      this.setState({ chatMessages: [msg, ...this.state.chatMessages] });
    });
  }

  componentWillUnmount() {
    this.socket.emit("broadcast", { message: 'has left the chat', profilePicture: this.props.currUser.profilePicture, username: this.props.currUser.username });
  }

  submitChatMessage() {
    if (this.state.chatMessage.length !== 0) {
      this.socket.emit("message", { message: this.state.chatMessage, profilePicture: this.props.currUser.profilePicture, username: this.props.currUser.username });
      this.setState({ chatMessage: "" });
    }
  }


  render() {
    const chatMessages = this.state.chatMessages.map(chatMessage => (
      <View style={[styles.chatMessage, { width: Math.max(chatMessage.message.length * 11, (chatMessage.username.length + 2) * 13) }]}>
        <Image source={{ uri: chatMessage.profilePicture }} style={styles.proPic}></Image>
        <View style={{ marginLeft: Dimensions.get('screen').width * 0.01, marginRight: (chatMessage.message.length * 11 < Dimensions.get('screen').width * 0.82) ? 0 : Dimensions.get('screen').width * 0.13 }}>
          <Text style={styles.usn}>@{chatMessage.username}</Text>
          <Text style={styles.msg}>{chatMessage.message}</Text>
        </View>
      </View>
    ));

    // console.log('touchable works')

    return (
      <KeyboardAwareScrollView
        style={{ backgroundColor: 'transparent' }}
        resetScrollToCoords={{ x: 0, y: 0 }}
        scrollEnabled={false}
      >
        <ScrollView
          directionalLockEnabled={false}
          scrollEnabled
          contentContainerStyle={styles.scroll}>
          {this.state.chatOn ? chatMessages : null}
        </ScrollView>

        <View style={styles.chatInput}>
          {/* <TouchableOpacity onPress={() => this.setState({ keyboardPadding: true })}> */}
            <TextInput
              style={styles.chatInput__Box}
              placeholder={'Comment...'}
              // pointerEvents={this.state.keyboardPadding ? "auto" : "none"}
              autoCorrect={false}
              value={this.state.chatMessage}
              onSubmitEditing={() => this.submitChatMessage()}
              onChangeText={chatMessage => {
                this.setState({ chatMessage });
              }}
            />
          {/* </TouchableOpacity> */}

          {this.state.chatOn ?
            <Text style={styles.chatInput__hide} onPress={() => this.setState({ chatOn: !this.state.chatOn })}>HIDE</Text>
            :
            <Text style={styles.chatInput__hide} onPress={() => this.setState({ chatOn: !this.state.chatOn })}>SHOW</Text>
          }
        </View>
      </KeyboardAwareScrollView>
    );
  }
}