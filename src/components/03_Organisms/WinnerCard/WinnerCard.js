import React, { useEffect } from 'react';
import { View, Text, Image, Dimensions, TouchableOpacity } from 'react-native';
import { colors, utilities } from '../../../settings/all_settings';
import { Overlay } from 'react-native-elements';
import styles from './WinnerCard.styling';
import TextLink from '../../01_Atoms/Buttons/TextLinks/TextLinks';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import * as Font from 'expo-font';

export default function WinnerCard(props) {

    const [loaded, error] = useFonts({
        'Steelfish': require('../../../../assets/fonts/Steelfish.ttf'),
        'Josefin Sans': require('../../../../assets/fonts/JosefinSans.ttf'),

    });

    if (!loaded) {
        return null;
    }

    var FontDisplay = {
        AUTO: 'auto',
        BLOCK: 'block',
        SWAP: 'swap',
        FALLBACK: 'fallback',
        OPTIONAL: 'optional',
    }

    // set styles based on the color of the card
    let gradient; // gradient for the background
    let borderGradient;
    let headerColor;
    let headerImage;
    let hostNameColor;
    switch (props.color) {
        case "gold":
            gradient = ['#444444', , 'black', '#444444']
            borderGradient = [colors.gold1, colors.gold2]
            headerColor = "#2E2E2E"
            headerImage = "https://oc-mobile-images.s3.us-east.cloud-object-storage.appdomain.cloud/winnercard-images/gold.png"
            hostNameColor = colors.gold1
            break;
    }
    return (

        <LinearGradient start={[0, 0]} end={[1, 0]}
            colors={borderGradient}>
            <View style={styles.overlay}>

                <LinearGradient
                    colors={gradient}
                    start={[0, 0]} end={[1, 0]}
                    style={{ position: 'absolute', left: 0, right: 0, top: 0, height: '100%', }} >

                    {/* HEADER */}
                    <View style={[styles.header, { backgroundColor: headerColor }]}>
                        <Image style={styles.header__image} source={{ uri: headerImage }} />
                    </View>
                    <LinearGradient
                        colors={borderGradient}
                        start={[0, 0]} end={[1, 0]}
                        style={{ height: 3, }} />
                    <LinearGradient
                        colors={borderGradient}
                        start={[0, 0]} end={[1, 0]}
                        style={{ height: 3, marginTop: 5 }} />

                    {/* <View style={{ width: '100%', justifyContent: 'space-around' }}> */}
                    <View style={{ height: '35%', alignItems: 'center' }}>
                        <Image style={styles.WinnerCard__image} source={{ uri: props.raffle.images[0] }} />
                    </View>

                    {/* title of product */}
                    <View style={{ alignItems: 'center' }}>
                        <View style={styles.WinnerCard__prizeTitleWrapper}>
                            <Text style={[styles.WinnerCard__prizeTitle, { fontFamily: 'Steelfish' }]}>{props.raffle.name.toUpperCase()}</Text>
                        </View>
                    </View>

                    <View style={[utilities.flexCenter, { flexDirection: 'row', width: '100%' }]}>
                        <Image style={styles.winnerPic} source={{ uri: props.winner.profilePicture }} />
                        <View>
                            <Text style={[styles.winnerLabel, { fontFamily: 'Josefin Sans' }]}>WINNER:</Text>
                            <Text style={[styles.winnerName, { fontFamily: 'Josefin Sans' }]}>@{props.winner.username.toUpperCase()}</Text>
                        </View>
                    </View>

                    {/* card footer */}
                    <View style={styles.footer}>
                        <View style={[utilities.flexCenter,{flexDirection: 'row'}]}>
                            <Image style={styles.hostPic} source={{ uri: props.host.profilePicture }} />
                            <View>
                                <Text style={[styles.hostLabel, { fontFamily: 'Josefin Sans' }]}>DRAWING BY:</Text>
                                <Text style={[styles.hostName, { color: hostNameColor, fontFamily: 'Josefin Sans' }]}>@{props.host.username.toUpperCase()}</Text>
                            </View>
                        </View>
                        <View style={[utilities.flexCenter]}>
                            <Text style={[styles.hostLabel, { fontFamily: 'Josefin Sans' }]}>BENEFITTING:</Text>
                            <View style={{flexDirection: 'row'}}>
                             <Image style={styles.charity} source={require('../../../../assets/images/aclu.png')} />
                             <Image style={styles.charity} source={require('../../../../assets/images/naacp.png')} />

                            </View>

                        </View>
                    </View>

                </LinearGradient>

            </View>
        </LinearGradient>
    )
}