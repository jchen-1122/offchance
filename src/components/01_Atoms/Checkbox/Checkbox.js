// insta button + facebook button + login button

import React, {useState} from 'react';
import {View,Text} from 'react-native';
import {styles} from "./Checkbox.styling";
import CheckBox from '@react-native-community/checkbox';


function Checkbox(props){
    const [toggleCheckBox, setToggleCheckBox] = useState(false)

    return (
        <View style={styles.CheckBox}>
              <CheckBox
        disabled={false}
        value={toggleCheckBox}
        />
            <Text>{props.title}</Text>
        </View>

    )
}

export default Checkbox;