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

    return (
        <TouchableOpacity style={styles.LikeButton}>
            <Tooltip label={<Icon name='heart-outline' type='material-community' />} content={"You will get a notification when this drawing becomes available/live"} like={true}/>
        </TouchableOpacity>
    )
}

export default LikeButton;