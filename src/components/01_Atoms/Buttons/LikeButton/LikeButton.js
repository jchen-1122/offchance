// Like button with Heart icon

import React from 'react';
import {TouchableOpacity} from 'react-native';
import {styles} from "./LikeButton.styling";
import { Icon } from 'react-native-elements';
import Tooltip from '../../../02_Molecules/Tooltip/Tooltip';

function LikeButton(props){

    /*
    * Link of available icons
    * https://react-native-elements.github.io/react-native-elements/docs/icon.html#available-icon-sets
    */

    console.log(props.raffle)

    return (
        <TouchableOpacity style={styles.LikeButton}>
            <Icon name='heart-outline' type='material-community' />
        </TouchableOpacity>
    )
}

export default LikeButton;