import React, {useState, useEffect} from 'react';
import {Text, Image, View, TouchableOpacity, ImageBackground } from 'react-native';
import styles from './BackCard.styling';

function BackCard(props){
    const [show, setShow] = useState(false)
    var user = props.user
    setTimeout(function() { setShow(true) }, props.time);

    // determine what picture to use for BackCard
    var userpic = { uri: user.profilePicture }
    let cardsrc = null
    // switch (user["prize"]) {
    //     case 0:
    //         cardsrc = { uri: 'https://oc-mobile-images.s3.us-east.cloud-object-storage.appdomain.cloud/backcards/black.png' }
    //         break;
    //     case 1:
    //         cardsrc = { uri: 'https://oc-mobile-images.s3.us-east.cloud-object-storage.appdomain.cloud/backcards/gold.png' }
    //         break;
    //     default:
    //         cardsrc = { uri: 'https://oc-mobile-images.s3.us-east.cloud-object-storage.appdomain.cloud/backcards/silver.png' }
    //         break;
    // }
    if (user["prize"] == 101) {
        cardsrc = { uri: 'https://oc-mobile-images.s3.us-east.cloud-object-storage.appdomain.cloud/backcards/black.png' }
    } else if (user["prize"] == 100 || user["prize"] == 50) {
        cardsrc = { uri: 'https://oc-mobile-images.s3.us-east.cloud-object-storage.appdomain.cloud/backcards/gold.png' }
    } else if (user["prize"] == 40 || user["prize"] == 25 || user["prize"] == 15) {
        cardsrc = { uri: 'https://oc-mobile-images.s3.us-east.cloud-object-storage.appdomain.cloud/backcards/silver.png' }
    } else {
        // @chelly
        cardsrc = { uri: 'https://oc-mobile-images.s3.us-east.cloud-object-storage.appdomain.cloud/backcards/blue.png' }
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
              style={(props.user._id === props.currUser._id && show) ? styles.BackCard__imgBg_green : styles.BackCard__imgBg }
              source={cardsrc}>
                {show && <View style={styles.BackCard__circleOutline} >
                    <Image
                        style={styles.BackCard__circlePic}
                        source={userpic}
                    />
                </View>}
            </ImageBackground>
        </TouchableOpacity>
    )
}

export default BackCard;