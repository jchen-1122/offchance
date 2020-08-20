import React from 'react';
import {Text, Linking} from 'react-native';

function TextLink(props) {
    return (
        <Text
            style={props.style}
            onPress={props.onPress} 
            > {props.title}
        </Text>
    )
}

export default TextLink;