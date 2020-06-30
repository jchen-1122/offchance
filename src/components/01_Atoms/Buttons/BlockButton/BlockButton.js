// insta button + facebook button + login button

import React from 'react';
import { TouchableOpacity, Text, Image} from 'react-native';

function BlockButton(props) {
    return (
        <TouchableOpacity style={props.btnType.BlockButton}>
            {props.logo && <Image style={props.btnType.BlockButton__icon} source={props.logo} />}
            <Text style={props.btnType.BlockButton__title}>{props.content}</Text>
        </TouchableOpacity>
    )
    // return <Button style={styles.BlockButton} title="Hello"/>
}

export default BlockButton;