import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import { utilities } from '../../../../settings/all_settings';
import styles from './FollowButton.styling';

function FollowButton(props){
    let title;

    switch(props.following){
        // if you're already following them
        case(true):
            title = 'UNFOLLOW'
            color = 'secondary'
            break;
        // if you're not following them yet
        case(false):
            title = 'FOLLOW'
            color = 'primary'
            break;
    }

    return (
        <BlockButton title={title} color={color} size='small' />
    );
}

export default FollowButton;