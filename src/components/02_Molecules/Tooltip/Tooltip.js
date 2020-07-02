import React from 'react';
import {Tooltip, Text } from 'react-native-elements';
import {styles} from './Tooltip.styling';

function ToolTip(props) {
    return (
    <Tooltip popover={<Text style={{color: 'white'}}>{props.content}</Text>} 
                overlayColor='transparent' 
                backgroundColor='black'
                containerStyle={styles.container}>
            {props.label}
        </Tooltip>
    );
}

export default ToolTip;