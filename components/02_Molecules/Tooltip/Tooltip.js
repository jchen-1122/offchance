import React from 'react';
import {Tooltip, Text } from 'react-native-elements';
import {styles} from './Tooltip.styling';

function ToolTip(props) {

    let TooltipStyle = (props.like) ? (styles.LikeButton) : (styles.container);


    return (
    <Tooltip popover={<Text style={{color: 'white'}}>{props.content}</Text>} 
                overlayColor='transparent' 
                backgroundColor='black'
                containerStyle={TooltipStyle}>
            {props.label}
        </Tooltip>
    );
}

export default ToolTip;