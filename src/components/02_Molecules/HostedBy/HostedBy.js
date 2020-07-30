import React from 'react'
import { View, Image, Text, Button } from 'react-native'
import BlockButton from '../../01_Atoms/Buttons/BlockButton/BlockButton';
import styles from './HostedBy.styling';
import { utilities, fonts } from '../../../settings/all_settings';
import { TouchableOpacity } from 'react-native-gesture-handler';

function HostedBy({ navigation, data, backColor, currUser, setUser }) {
  const ip = require('../../IP_ADDRESS.json')
  // get username and prof pic info from db
  let username;
  let profPic;
  if (data) {
    username = data.username
    profPic = data.profilePicture
  }

  const addFollower = async () => {
    const data = require('../../IP_ADDRESS.json')
    if (currUser.following.includes(data._id)) {
        return
    }
    const response = await fetch('http://'+ip.ipAddress+'/user/edit/'+currUser._id,{
      method: "PATCH",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },  
      body: makeAddJSON()
    })
    const json = await response.json()
    // followed user "follower" count also increases
    const response2 = await fetch('http://'+ip.ipAddress+'/user/edit/'+data._id,{
      method: "PATCH",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },  
      body: makeAddJSON2()
    })
    return json
  }

  const removeFollower = async () => {
      const data = require('../../IP_ADDRESS.json')
      if (!currUser.following.includes(data._id)) {
          return
      }
      const response = await fetch('http://'+ip.ipAddress+'/user/edit/'+currUser._id,{
        method: "PATCH",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },  
        body: makeDeleteJSON()
      })
      const json = await response.json()
      // followed user "follower" count also decreases
      const response2 = await fetch('http://'+data.ipAddress+'/user/edit/'+data._id,{
        method: "PATCH",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },  
        body: makeDeleteJSON2()
      })
      return json
  }

  const makeAddJSON = () => {
      let prevFollowing = currUser.following
      prevFollowing.push(data._id)
      let res = {
          following: prevFollowing
      }
      return JSON.stringify(res)
  }

  const makeAddJSON2 = () => {
      let prevFollowing = data.followers
      if (data.followers.includes(currUser._id)) {
          return JSON.stringify(prevFollowing)
      }
      prevFollowing.push(currUser._id)
      let res = {
          followers: prevFollowing
      }
      return JSON.stringify(res)
  }

  const makeDeleteJSON = () => {
      let prevFollowing = currUser.following
      for(var i = prevFollowing.length - 1; i >= 0; i--) {
          if(prevFollowing[i] === data._id) {
              prevFollowing.splice(i, 1);
          }
      }
      let res = {
          following: prevFollowing
      }
      return JSON.stringify(res)
  }

  const makeDeleteJSON2 = () => {
      let prevFollowing = data.followers
      for(var i = prevFollowing.length - 1; i >= 0; i--) {
          if(prevFollowing[i] === currUser._id) {
              prevFollowing.splice(i, 1);
          }
      }
      let res = {
          followers: prevFollowing
      }
      return JSON.stringify(res)
  }
  
  return (
    <View style={[styles.hostedby, { backgroundColor: backColor }]}>
      <TouchableOpacity onPress={() => navigation.navigate('OtherUser',{user: data})}>
        <View style={styles.hostedby__profile}>
          <Image source={{ uri: profPic }} style={styles.hostedby__image}></Image>
          <Text style={fonts.link}>{'@' + username}</Text>
        </View>
      </TouchableOpacity>

      {<BlockButton
        title={'Follow'}
        color="primary"
        size="small" />}
    </View>
  )
}

export default HostedBy;