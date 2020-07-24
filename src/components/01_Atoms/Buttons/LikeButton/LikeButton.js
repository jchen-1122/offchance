// Like button with Heart icon

import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {styles} from "./LikeButton.styling";
import { Icon } from 'react-native-elements';
import Tooltip from '../../../02_Molecules/Tooltip/Tooltip';

function LikeButton(props){
    const currUser = props.currUser
    const setUser = props.setUser
    const raffle = props.raffle
    const navigation = props.navigation
    const inLikesPage = (props.inLikesPage != null) ? props.inLikesPage : false
    const [color, setColor] = useState((typeof currUser._id === 'undefined' ? true : currUser.likedRaffles.includes(raffle)))

    const setLike = async () => {
        const ip = require('../../../IP_ADDRESS.json')
        const response = await fetch('http://'+ip.ipAddress+':3000/user/edit/'+currUser._id,{
          method: "PATCH",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },  
          body: makeAddJSON()
        })
        const json = await response.json()
        return json
    }

    const setUnlike = async () => {
        const ip = require('../../../IP_ADDRESS.json')
        const response = await fetch('http://'+ip.ipAddress+':3000/user/edit/'+currUser._id,{
          method: "PATCH",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },  
          body: makeDeleteJSON()
        })
        const json = await response.json()
        return json
    }

    const makeAddJSON = () => {
        let prevLikes = currUser.likedRaffles
        if (!prevLikes.includes(raffle)) {
            prevLikes.push(raffle)
        } 
        let data = {
            likedRaffles: prevLikes
        }
        return JSON.stringify(data)
    }

    const makeDeleteJSON = () => {
        let prevLikes = currUser.likedRaffles
        for(var i = prevLikes.length - 1; i >= 0; i--) {
            if(prevLikes[i] === raffle) {
                prevLikes.splice(i, 1);
            }
        }
        let data = {
            likedRaffles: prevLikes
        }
        return JSON.stringify(data)
    }

    /*
    * Link of available icons
    * https://react-native-elements.github.io/react-native-elements/docs/icon.html#available-icon-sets
    */
    if (inLikesPage) {
        return null
    }
    if (typeof currUser._id === 'undefined' || inLikesPage) {
        return (
            <TouchableOpacity style={styles.LikeButton} 
            onPress={() => {
                navigation.navigate('NotLogin')
            }}>
                <Icon name='heart-outline' type='material-community'/>
            </TouchableOpacity>
        )
    }
    
    return (
        <TouchableOpacity style={styles.LikeButton} 
        onPress={async () => {
            setColor(!color)
            if (!color) {
                await setLike()
            } else {
                await setUnlike()
            }
            setUser(currUser)
        }}>
            {color ? <Icon name='heart' type='material-community' color={'red'}/> : 
            <Icon name='heart-outline' type='material-community'/>}
        </TouchableOpacity>
    )
}

export default LikeButton;