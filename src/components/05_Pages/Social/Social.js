import React, {useState, useEffect} from 'react'
import { View, Text, TextInput, ScrollView } from 'react-native'
import {colors, fonts, utilities} from '../../../settings/all_settings';
import BottomNav from '../../02_Molecules/BottomNav/BottomNav'
import Construction from '../../04_Templates/Construction/Construction'
import io from 'socket.io-client'

function Social({navigation}) {
    const [chatMessage, setchatMessage] = useState('')
    const [chatMessages, setchatMessages] = useState([])
    const ip = require('../../IP_ADDRESS.json');
    const [socket, setSocket] = useState(io('http://'+ip.ipAddress+':3000'))

    useEffect(() => {
        socket.on('message', message => {
            let temp = chatMessages
            temp.push(message)
            setchatMessages(temp)
        })
    }, [])

    const submitChatMessages = () => {
        socket.emit('message', chatMessage)
        setchatMessage('')
    }

    return (
        <View style={utilities.container}>
            <TextInput style={{height: 40, width: 200, borderWidth: 2, margin: 20, alignSelf: "center"}} 
            onSubmitEditing={() => {
                submitChatMessages()
            }}
            value={chatMessage}
            onChangeText={chatMessage => {
                setchatMessage(chatMessage)
            }}></TextInput>
            <ScrollView>
                <Text>{chatMessages.length}</Text>
                {chatMessages.map(msg => <View><Text key={msg}>{msg}</Text></View>)}
            </ScrollView>
            <BottomNav navigation={navigation} active={'Social'}></BottomNav>
        </View>
    )
}

export default Social;