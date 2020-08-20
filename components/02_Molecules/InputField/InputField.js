import React, { useState, useEffect, useRef, useImperativeHandle, forwardRef } from 'react'
import { TextInput, Text, View, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform} from 'react-native';
import { styles } from "./InputField.styling";
import { Icon, colors } from 'react-native-elements';
import Tooltip from '../Tooltip/Tooltip';
import LikeButton from '../../01_Atoms/Buttons/LikeButton/LikeButton';

function InputField(props, ref) {
    const [active, setActive] = useState(false)

    // increase size of box if its a textArea
    let inputBoxSizes = [styles.InputField__box]
    if (props.textArea) {
        inputBoxSizes.push(styles.InputField__box_textArea)
    }
    if (active) {
        inputBoxSizes.push(styles.InputField__box_Green)
    }

    // if input is supposed to have an icon with a tooltip (i.e. insta handle)
    let icon = (props.tooltip) ? (<Tooltip label={<Icon name='info' />} content={props.tooltipContent} />) : null;

    // for going to the next input
    const inputRef = useRef();
    useImperativeHandle(ref, () => ({
      focus: () => {
        inputRef.current.focus();
      }
    }));

    return (
        <View style={[styles.InputField, props.style]}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TextInput
                    onFocus={() => setActive(true)}
                    onBlur={() => setActive(false)}
                    value={props.value}
                    placeholder={props.label + ((props.required) ? '*' : '')}
                    placeholderTextColor='#888888'
                    textContentType={props.textContentType}
                    returnKeyType={props.returnKeyType || "next"}
                    keyboardAppearance="dark"
                    autoCorrect={false}
                    autoCapitalize={props.autoCapitalize || "none"}
                    secureTextEntry={props.password}
                    multiline={props.textArea}
                    numberOfLines={4}
                    keyboardType={props.keyboardType}
                    style={inputBoxSizes}
                    maxLength={props.maxLength}
                    onChangeText={props.onChangeText}
                    onSubmitEditing={props.onSubmitEditing}
                    focus={props.focus}
                    ref={inputRef}
                    blurOnSubmit={false}
                    inputAccessoryViewID={props.inputAccessoryViewID}
                    />

                {icon}
            </View>
        </View>
    )
}
InputField = forwardRef(InputField);

export default InputField;
