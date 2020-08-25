import React, { useState, useEffect, useRef, useImperativeHandle, forwardRef } from 'react'
import { View, Text, Image, Dimensions, TouchableOpacity } from 'react-native';
import { colors, utilities } from '../../../settings/all_settings';
import { Overlay } from 'react-native-elements';
import styles from './WinnerCard.styling';
import TextLink from '../../01_Atoms/Buttons/TextLinks/TextLinks';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';

function WinnerCard(props, ref) {

    let winner;
    if (props.winner) {
        winner = props.winner
    }

    // load fonts for the cards
    const [loaded, error] = useFonts({
        'Steelfish': require('../../../../assets/fonts/Steelfish.ttf'),
        'Josefin Sans': require('../../../../assets/fonts/JosefinSans.ttf'),
        'Roboto_medium': require('../../../../assets/fonts/Roboto_medium.ttf')
    });
    if (!loaded) {
        return null;
    }


    // set styles based on the color of the card
    let gradient; // gradient for the background of the card
    let borderGradient;
    let headerColor = "#2E2E2E";
    let headerImage;
    let hostNameColor;
    let prizeTitleColor = 'black'
    let winnerLabelColor = colors.darkGreen
    let name = '@' + winner.username.toUpperCase()

    // if you are the winner of the card
    if (props.currUser._id === winner._id) {
        name = 'YOU'
    }

    // determine colors of the card
    const colorMap = ["black", "gold", "silver"]
    switch (colorMap[props.prize]) {
        case "black":
            gradient = ['#444444', , 'black', '#444444']
            borderGradient = colors.goldGradient
            headerImage = "https://oc-mobile-images.s3.us-east.cloud-object-storage.appdomain.cloud/winnercard-images/gold.png"
            hostNameColor = colors.gold1
            prizeTitleColor = 'white'
            winnerLabelColor = colors.lightGreen
            break;
        case "gold":
            gradient = colors.goldGradientBg
            borderGradient = colors.goldGradient
            headerImage = "https://oc-mobile-images.s3.us-east.cloud-object-storage.appdomain.cloud/winnercard-images/gold.png"
            headerColor = "#44270A"
            hostNameColor = colors.gold1
            break;
        case "silver":
            gradient = colors.silverGradientBg
            borderGradient = colors.silverGradient
            headerImage = "https://oc-mobile-images.s3.us-east.cloud-object-storage.appdomain.cloud/winnercard-images/silver.png"
            hostNameColor = '#9E9E9E'
            break;
    }

    return (
        <LinearGradient start={[0, 0]} end={[1, 0]}
            colors={borderGradient}>
            <View style={styles.WinnerCard}>

                {/* linear gradient for card background */}
                <LinearGradient
                    colors={gradient}
                    start={[0, 0]} end={[1, 0]}
                    style={{ position: 'absolute', left: 0, right: 0, top: 0, height: '100%', }} >

                    {/* HEADER */}
                    <View style={[styles.WinnerCard__header, { backgroundColor: headerColor }]}>
                        <Image style={styles.WinnerCard__header__image} source={{ uri: headerImage }} />
                    </View>
                    <LinearGradient
                        colors={borderGradient}
                        start={[0, 0]} end={[1, 0]}
                        style={{ height: 3, }} />
                    <LinearGradient
                        colors={borderGradient}
                        start={[0, 0]} end={[1, 0]}
                        style={{ height: 3, marginTop: 5 }} />

                    {/* product image */}
                    <View style={{ height: '35%', alignItems: 'center' }}>
                        <Image style={styles.WinnerCard__image} source={{ uri: props.raffle.images[0] }} />
                    </View>

                    {/* title of product */}
                    <View style={{ alignItems: 'center' }}>
                        <View style={[styles.WinnerCard__prizeTitleWrapper, { borderColor: prizeTitleColor }]}>
                            <Text style={[styles.WinnerCard__prizeTitle, { color: prizeTitleColor, borderColor: prizeTitleColor, fontFamily: 'Steelfish' }]}>{props.raffle.name.toUpperCase()}</Text>
                        </View>
                    </View>

                    {/* winner of prize */}
                    <View style={[utilities.flexCenter, { flexDirection: 'row', width: '100%' }]}>
                        <Image style={styles.WinnerCard__winnerPic} source={{ uri: winner.profilePicture }} />
                        <View>
                            <Text style={[styles.WinnerCard__winnerLabel, { color: winnerLabelColor, fontFamily: 'Josefin Sans' }]}>WINNER:</Text>
                            <Text style={[styles.WinnerCard__winnerName, { color: winnerLabelColor, fontFamily: 'Josefin Sans' }]}>{name}</Text>
                        </View>
                    </View>

                    {/* card footer */}
                    <View style={styles.WinnerCard__footer}>
                        <View style={[utilities.flexCenter, { flexDirection: 'row', justifyContent: 'flex-end' }]}>
                            <Image style={styles.WinnerCard__hostPic} source={{ uri: props.host.profilePicture }} />
                            <View>
                                <Text style={[styles.WinnerCard__hostLabel, { fontFamily: 'Josefin Sans' }]}>DRAWING BY:</Text>
                                <Text style={[styles.WinnerCard__hostName, { color: hostNameColor, fontFamily: 'Josefin Sans' }]}>@{props.host.username}</Text>
                            </View>
                        </View>
                        <View style={[utilities.flexCenter]}>
                            <Text style={[styles.WinnerCard__hostLabel, { fontFamily: 'Josefin Sans', marginTop: 5 }]}>BENEFITTING:</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <Image style={styles.WinnerCard__charity} source={require('../../../../assets/images/aclu.png')} />
                                <Image style={styles.WinnerCard__charity} source={require('../../../../assets/images/naacp.png')} />
                            </View>
                        </View>
                    </View>
                </LinearGradient>

            </View>
        </LinearGradient>
    )
}

WinnerCard = forwardRef(WinnerCard);
export default WinnerCard;