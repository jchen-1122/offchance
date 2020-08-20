import React, {useState, useEffect} from 'react';
import {Text, Image, View, TouchableOpacity, ImageBackground } from 'react-native';
import styles from './BackCard.styling';
import {fonts, utilities} from '../../../settings/all_settings'
import UsernameDisplay from '../../01_Atoms/UsernameDisplay/UsernameDisplay'

// for small, unclickable cards like in Latest Winners
function BackCard(props){

    const [show, setShow] = useState(false)
    var user = props.user
    setTimeout(function() { setShow(true) }, props.time);

    var userpic = { uri: user.profilePicture }
    let cardsrc = null
    switch (user["prize"]) {
        case 0:
            cardsrc = { uri: 'https://oc-mobile-images.s3.us-east.cloud-object-storage.appdomain.cloud/backcards/black.png' }
            break;
        case 1:
            cardsrc = { uri: 'https://oc-mobile-images.s3.us-east.cloud-object-storage.appdomain.cloud/backcards/gold.png' }
            break;
        default:
            cardsrc = { uri: 'https://oc-mobile-images.s3.us-east.cloud-object-storage.appdomain.cloud/backcards/silver.png' }
            break;
    }

    return (
        <TouchableOpacity onPress={() => {
            if (show) {
                props.setoverlay(true)
            }
            props.setSelected(user)
            props.setPrize(user["prize"])
        }}>
            <ImageBackground 
              style={(props.user._id === props.currUser._id && show) ? styles.greenimgBackground : styles.imgBackground }
              source={cardsrc}>
                {show && <View style={styles.circle_outline} >
                    <Image
                        style={styles.circle_pic}
                        source={userpic}
                    />
                </View>}
            </ImageBackground>
        </TouchableOpacity>
    )
}

export default BackCard;