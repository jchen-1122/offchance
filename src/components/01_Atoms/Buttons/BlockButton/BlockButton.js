// insta button + facebook button + login button

import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {styles} from "./BlockButton.styling";


function BlockButton(props){
    return (
    <TouchableOpacity style={styles.BlockButton}>
        <Text style={styles.BlockButton__title}>Button</Text>
    </TouchableOpacity>
    )
    // return <Button style={styles.BlockButton} title="Hello"/>
}

export default BlockButton;