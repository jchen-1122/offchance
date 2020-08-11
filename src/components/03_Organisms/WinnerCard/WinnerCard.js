import React, { useState, forwardRef } from 'react';
import { View, Text, Image, Dimensions, TouchableOpacity } from 'react-native';
import { colors, utilities } from '../../../settings/all_settings';
import { Overlay } from 'react-native-elements';
import styles from './WinnerCard.styling';
import TextLink from '../../01_Atoms/Buttons/TextLinks/TextLinks';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import * as Font from 'expo-font';

function WinnerCard(props) {
    let winner;
    if (props.winner) {
        winner = props.winner
    }

    // load fonts for the cards
    const [loaded, error] = useFonts({
        'Steelfish': require('../../../../assets/fonts/Steelfish.ttf'),
        'Josefin Sans': require('../../../../assets/fonts/JosefinSans.ttf'),

    });
    if (!loaded) {
        return null;
    }

    const colorMap = ["gold", "silver", "bronze", "blue"]

    // set styles based on the color of the card
    let gradient; // gradient for the background of the card
    let borderGradient;
    let headerColor = "#2E2E2E";
    let headerImage;
    let hostNameColor;
    let prizeTitleColor = 'black'
    let winnerLabelColor = colors.darkGreen
    let name = '@' + winner.username.toUpperCase()

    if (props.currUser._id === winner._id) {
        name = 'YOU'
    }
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
        case "bronze":
            gradient = colors.bronzeGradientBg
            borderGradient = colors.bronzeGradient
            headerImage = "https://oc-mobile-images.s3.us-east.cloud-object-storage.appdomain.cloud/winnercard-images/bronze.png"
            headerColor = "#44270A"
            hostNameColor = "#44270A"
            break;
        case "blue":
            gradient = colors.whiteGradientBg
            borderGradient = [colors.limeGreen, colors.limeGreen]
            headerImage = "https://oc-mobile-images.s3.us-east.cloud-object-storage.appdomain.cloud/winnercard-images/lime.png"
            headerColor = colors.blue
            hostNameColor = colors.blue
            prizeTitleColor = colors.blue
            winnerLabelColor = colors.blue
            break;
    }
    return (
        <LinearGradient start={[0, 0]} end={[1, 0]}
            colors={borderGradient}>
            <View style={styles.overlay}>

                {/* linear gradient for card background */}
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
                        <Image style={styles.winnerPic} source={{ uri: winner.profilePicture }} />
                        <View>
                            <Text style={[styles.winnerLabel, { color: winnerLabelColor, fontFamily: 'Josefin Sans' }]}>WINNER:</Text>
                            <Text style={[styles.winnerName, { color: winnerLabelColor, fontFamily: 'Josefin Sans' }]}>{name}</Text>
                        </View>
                    </View>

                    {/* card footer */}
                    <View style={styles.footer}>
                        <View style={[utilities.flexCenter, { flexDirection: 'row', justifyContent: 'flex-end' }]}>
                            <Image style={styles.hostPic} source={{ uri: props.host.profilePicture }} />
                            <View>
                                <Text style={[styles.hostLabel, { fontFamily: 'Josefin Sans' }]}>DRAWING BY:</Text>
                                <Text style={[styles.hostName, { color: hostNameColor, fontFamily: 'Josefin Sans' }]}>@{props.host.username}</Text>
                            </View>
                        </View>
                        <View style={[utilities.flexCenter]}>
                            <Text style={[styles.hostLabel, { fontFamily: 'Josefin Sans' }]}>BENEFITTING:</Text>
                            <View style={{ flexDirection: 'row' }}>
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

WinnerCard = forwardRef(WinnerCard);
export default WinnerCard;