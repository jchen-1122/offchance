import React, { Component } from "react";
import { TextInput, StyleSheet, Text, ScrollView, View, Dimensions, Image, Alert } from "react-native";
import { Icon } from 'react-native-elements'
import BottomNav from '../../02_Molecules/BottomNav/BottomNav'
import io from "socket.io-client";
import { min } from "react-native-reanimated";
import { styles } from './Chat.styling'
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

  async reportUser(id, reason, message) {
    const ip = require('../../IP_ADDRESS.json')
    let user = await fetch('https://8f5d9a32.us-south.apigw.appdomain.cloud/users/id', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({id : id})
    })
    user = await user.json()
    user = user.user
    const oldReported = (Object.keys(user).includes('reports')) ? user.reports : []
    oldReported.push(reason + ": " + message)
    const response = await fetch('https://8f5d9a32.us-south.apigw.appdomain.cloud/users/edit', {
          method: "POST",
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({reports: oldReported, id: id})
      })
      const json = await response.json()
      json = json.user
      return json
  }

  componentDidMount() {
    const ip = require('../../IP_ADDRESS.json')
    this.socket = io("https://offchance-live-chat.herokuapp.com/");
    this.socket.emit("broadcast", { message: 'has joined the chat', profilePicture: this.props.currUser.profilePicture, username: this.props.currUser.username, id: this.props.currUser._id });
    this.socket.on("message", msg => {
      this.setState({ chatMessages: [msg, ...this.state.chatMessages] });
    });
  }

  // has left the chat functionality
  // componentWillUnmount() {
  //   this.socket.emit("broadcast", { message: 'has left the chat', profilePicture: this.props.currUser.profilePicture, username: this.props.currUser.username });
  // }

  submitChatMessage() {
    if (this.state.chatMessage.length !== 0) {
      this.socket.emit("message", { message: this.state.chatMessage, profilePicture: this.props.currUser.profilePicture, username: this.props.currUser.username, id: this.props.currUser._id });
      this.setState({ chatMessage: "" });
    }
  }


  render() {
    const chatMessages = this.state.chatMessages.map(chatMessage => (
      <TouchableOpacity
        onLongPress={() => {
          Alert.alert(
            "Report User",
            "Are you sure you want to report this user?",
            [
                { text: "Report Abusive Chat", onPress: async () => {
                    await this.reportUser(chatMessage.id, "Abusive Chat", chatMessage.message)
                } },
                {
                   text: "Report Spam", onPress: async () => {
                    await this.reportUser(chatMessage.id, "Spam", chatMessage.message)
                   }
                },
                {
                  text: "Cancel", onPress: () => {
                      
                  }
               }
            ],
            { cancelable: true }
        );
        }}
      >
      <View style={[styles.Message, { width: Math.max(chatMessage.message.length * 11, (chatMessage.username.length + 2) * 13) }]}>
        <Image source={{ uri: chatMessage.profilePicture }} style={styles.Message__profPic}></Image>
        <View style={{ marginLeft: Dimensions.get('screen').width * 0.01, marginRight: (chatMessage.message.length * 11 < Dimensions.get('screen').width * 0.82) ? 0 : Dimensions.get('screen').width * 0.13 }}>
          <Text style={styles.Message__username}>@{chatMessage.username}</Text>
          <Text style={styles.Message__text}>{chatMessage.message}</Text>
        </View>
      </View>
      </TouchableOpacity>
    ));

    // console.log('touchable works')

    return (
      <KeyboardAwareScrollView
        style={{ backgroundColor: 'transparent', }}
        // resetScrollToCoords={{ x: 0, y: 0 }}
        scrollEnabled={true}
      >
        <ScrollView
          contentInset={{top: Math.max((this.state.chatMessages.length - 4) * 65, 0), bottom: 0 }}
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}>
          {this.state.chatOn ? chatMessages : null}
        </ScrollView>

        <View style={styles.ChatInput}>
          {/* <TouchableOpacity onPress={() => this.setState({ keyboardPadding: true })}> */}
            {(!Object.keys(this.props.currUser).includes('bannedUntil') || Math.floor(Date.now() / 1000) > this.props.currUser.bannedUntil) ? <TextInput
              style={styles.ChatInput__Box}
              placeholder={'Comment...'}
              // pointerEvents={this.state.keyboardPadding ? "auto" : "none"}
              autoCorrect={false}
              value={this.state.chatMessage}
              onSubmitEditing={() => this.submitChatMessage()}
              onChangeText={chatMessage => {
                this.setState({ chatMessage });
              }}
            /> : null}
          {/* </TouchableOpacity> */}

          {this.state.chatOn ?
            <Text style={styles.ChatInput__hide} onPress={() => this.setState({ chatOn: !this.state.chatOn })}>HIDE</Text>
            :
            <Text style={styles.ChatInput__hide} onPress={() => this.setState({ chatOn: !this.state.chatOn })}>SHOW</Text>
          }
        </View>
      </KeyboardAwareScrollView>
    );
  }
}