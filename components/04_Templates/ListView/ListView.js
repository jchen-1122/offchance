import React, {useState, useContext, useEffect} from 'react'
import {TouchableOpacity} from 'react-native'
import { View, Text, Footer, FooterTab, Button, Icon } from 'native-base';
import { fonts, utilities } from '../../../settings/all_settings';
import {styles} from './ListView.styling';
import UsernameDisplay from '../../01_Atoms/UsernameDisplay/UsernameDisplay';
import BlockButton from '../../01_Atoms/Buttons/BlockButton/BlockButton';

// e.g. the "top 10 donors" section
function ListView(props) {
    const currUser = props.currUser
    const setUser = props.setUser
    const [enabled, setEnabled] = useState({})

    useEffect(() => {
        for (let user in props.users) {
            let temp = enabled
            temp[user._id] = true
            setEnabled(temp)
        }
    })
    
    const addFollower = async (user) => {
        const data = require('../../IP_ADDRESS.json')
        if (currUser.following.includes(user._id)) {
            return
        }
        const response = await fetch('http://'+data.ipAddress+'/user/edit/'+currUser._id,{
          method: "PATCH",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: makeAddJSON(user)
        })
        const json = await response.json()
        // followed user "follower" count also increases
        const response2 = await fetch('http://'+data.ipAddress+'/user/edit/'+user._id,{
          method: "PATCH",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: makeAddJSON2(user)
        })
        return json
    }

    const removeFollower = async (user) => {
        const data = require('../../IP_ADDRESS.json')
        if (!currUser.following.includes(user._id)) {
            return
        }
        const response = await fetch('http://'+data.ipAddress+'/user/edit/'+currUser._id,{
          method: "PATCH",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: makeDeleteJSON(user)
        })
        const json = await response.json()
        // followed user "follower" count also decreases
        const response2 = await fetch('http://'+data.ipAddress+'/user/edit/'+user._id,{
          method: "PATCH",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: makeDeleteJSON2(user)
        })
        return json
    }

    const makeAddJSON = (user) => {
        let prevFollowing = currUser.following
        prevFollowing.push(user._id)
        let data = {
            following: prevFollowing
        }
        return JSON.stringify(data)
    }

    const makeAddJSON2 = (user) => {
        let prevFollowing = user.followers
        if (user.followers.includes(currUser._id)) {
            return JSON.stringify(prevFollowing)
        }
        prevFollowing.push(currUser._id)
        let data = {
            followers: prevFollowing
        }
        return JSON.stringify(data)
    }

    const makeDeleteJSON = (user) => {
        let prevFollowing = currUser.following
        for(var i = prevFollowing.length - 1; i >= 0; i--) {
            if(prevFollowing[i] === user._id) {
                prevFollowing.splice(i, 1);
            }
        }
        let data = {
            following: prevFollowing
        }
        return JSON.stringify(data)
    }

    const makeDeleteJSON2 = (user) => {
        let prevFollowing = user.followers
        for(var i = prevFollowing.length - 1; i >= 0; i--) {
            if(prevFollowing[i] === currUser._id) {
                prevFollowing.splice(i, 1);
            }
        }
        let data = {
            followers: prevFollowing
        }
        return JSON.stringify(data)
    }
    // console.log('Curr user id: ', currUser._id);
    // console.log('props.users is : ', props.users);
    // build rows of usernames and profile pics
    let usernameList = [];
    for (let user in props.users) {
        // console.log('User is: ', props.users[user]._id);
        usernameList.push(
            <View style={styles.ListViewRow}>
                <TouchableOpacity
                    onPress={() => {
                        currUser._id === props.users[user]._id ?
                        props.navigation.navigate('Profile') :
                        props.navigation.navigate('OtherUser', {currUser: props.currUser, user: props.users[user]})
                        }}>
                    <UsernameDisplay username={props.users[user].username} profPic={{uri: props.users[user].profilePicture}} size="large"/>
                </TouchableOpacity>
                {typeof currUser._id === 'undefined' ? null : currUser._id === props.users[user]._id ? null : currUser.following.includes(props.users[user]._id)  ? 
                <BlockButton color="secondary" size="small" title='FOLLOWING'
                onPress={async () => {
                    if (enabled[user._id]) {
                        let temp = enabled
                        enabled[user._id] = false
                        setEnabled(temp)
                        const userObj = await removeFollower(props.users[user])
                        setUser(userObj)
                        let temp1 = enabled
                        enabled[user._id] = true
                        setEnabled(temp)
                    }
                }}
                /> :
                <BlockButton color="primary" size="small" title='FOLLOW'
                onPress={async () => {
                    if (enabled[user._id]) {
                        let temp = enabled
                        enabled[user._id] = false
                        setEnabled(temp)
                        const userObj = await addFollower(props.users[user])
                        setUser(userObj)
                        let temp1 = enabled
                        enabled[user._id] = true
                        setEnabled(temp)
                    }
                }}
                />}
            </View>
        )
    }

    let title;
    if (props.title){
        title = <Text style={[fonts.h1, {textAlign: 'center'}]}>{props.title}</Text>
    }
    return (
      <View>
          {title}
          {usernameList}
      </View>
    )
}

export default ListView;
