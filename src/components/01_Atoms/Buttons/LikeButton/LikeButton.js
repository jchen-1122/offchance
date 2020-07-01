// Like button with Heart icon

import React from 'react';
import {TouchableOpacity} from 'react-native';
import {styles} from "./LikeButton.styling";
import { Icon } from 'react-native-elements'
//import InstagramIcon from '@material-ui/icons/Instagram';

function LikeButton(props){

    /*
    * Link of available icons
    * https://react-native-elements.github.io/react-native-elements/docs/icon.html#available-icon-sets
    */

    return (
        <TouchableOpacity style={styles.LikeButton}>
            <Icon name='heart-outline' type='material-community' />
        </TouchableOpacity>
    )
}

export default LikeButton;