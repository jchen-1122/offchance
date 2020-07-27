import React, { useEffect } from 'react';
import { View, Text, Image, Dimensions, TouchableOpacity } from 'react-native';
import { colors } from '../../../settings/all_settings';
import { Overlay } from 'react-native-elements';
import styles from './WinnerCard.styling';
import TextLink from '../../01_Atoms/Buttons/TextLinks/TextLinks';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';


export default function WinnerCard(props) {

    let [fontsLoaded] = useFonts({
        'Steelfish': require('../../../../assets/fonts/Steelfish.ttf'),
    });


    // set styles based on the color of the card
    let gradient; // gradient for the background
    let borderGradient;
    let borderColor;
    let headerColor;
    let headerImage;
    switch (props.color) {
        case "gold":
            gradient = ['#444444', , 'black', '#444444']
            borderGradient = [colors.gold1, colors.gold2]
            borderColor = colors.gold1
            headerColor = "#2E2E2E"
            headerImage = "https://oc-mobile-images.s3.us-east.cloud-object-storage.appdomain.cloud/winnercard-images/gold.png"
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

                    <View style={{ width: '100%' }}>
                        <Image style={styles.winnerPic} source={{ uri: props.winner.profilePicture }} />
                        <View>
                            <Text>WINNER:</Text>
                            <Text></Text>
                        </View>
                    </View>


                </LinearGradient>

            </View>
        </LinearGradient>
    )
}