import React, {useState} from 'react';
import { ScrollView, View, Text, Image, Animated } from 'react-native'
import {utilities, fonts, colors} from '../../../../settings/all_settings';
import styles from './Raffle.styling';
import BottomNav from '../../../02_Molecules/BottomNav/BottomNav'
import ProgressBar from '../../../02_Molecules/ProgressBar/ProgressBar'
import HostedBy from '../../../02_Molecules/HostedBy/HostedBy'
import Top5Donors from '../../../02_Molecules/Top5Donors/Top5Donors'
import DropDown from '../../../01_Atoms/DropDown/DropDown'
import ImageCarousel from '../../../02_Molecules/ImageCarousel/ImageCarousel'
import BlockButton from '../../../01_Atoms/Buttons/BlockButton/BlockButton';
import SlidingSheet from '../../../04_Templates/SlidingSheet/SlidingSheet';

export default function Raffle({navigation}) {
    const images = [require('../../../../../assets/images/nintendoSwitch.jpeg'), require('../../../../../assets/images/michaelScott.jpg'), require('../../../../../assets/images/pamBeesly.jpg'), require('../../../../../assets/images/profilePic.png'), require('../../../../../assets/images/logo.png')]
    const proPic = require('../../../../../assets/images/profilePic.png')

    // for sliding sheet (payment)
    const [sheetOpen, setSheetOpen] = useState(false);
    const [bounceValue, setBounceValue] = useState(new Animated.Value(100)); // initial position of sheet

    const toggleSheet = () => {
        var toValue = 100;
        if (sheetOpen == false) {
            toValue=0
        }

        Animated.spring(
            bounceValue, {
                toValue: toValue,
                velocity: 3,
                tension: 2,
                friction: 8
        }).start();

        setSheetOpen(!sheetOpen);
    };

    let sizes = [69, 420, 9, 9.5]

    // uncomment for one image example
    // const images = [require('../../../../assets/images/dwightSchrute.jpg')]
    return (
        <View style={utilities.container}>
            <ScrollView contentContainerStyle={utilities.scrollview}>
                {images.length > 1 ? <ImageCarousel images={images}></ImageCarousel> : <Image source={images[0]} style={{width: 400, height: 300, resizeMode: 'center'}}></Image>}

                    <Text style={[fonts.h1,{marginLeft: '8%'}]}>Nintendo Switch with Neon Joy-Con</Text>
                    <HostedBy image={proPic} account={'@instagram'} navigation={navigation}></HostedBy>
                    <View style={styles.content}>
                        <Text style={fonts.h3}>Description</Text>
                        <Text style={{marginBottom: 15}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla cursus, dui ac fermentum dapibus, dolor lorem aliquam nibh, sit amet commodo mi massa id nunc. Aenean vel mollis lorem.</Text>
                        <Text style={fonts.light}>DRAWING STARTS</Text>
                        <Text style={{fontWeight: 'bold', marginBottom: 15}}>July 16, 11:00 AM</Text>

                        <Top5Donors images={images} />
                        <ProgressBar progress={230 / 500} color={colors.highlightColor} raised={230} goal={500} width={315} />
                        <DropDown options={sizes}/>
                    </View>
                    <View style={[styles.content, {flex: 0, alignItems: 'center'}]}>
                        <BlockButton
                        title="PLAY GAME"
                        color="primary"
                        onPress={() => navigation.navigate('GameController')}/>
                        <BlockButton
                        title="ENTER DRAWING"
                        color="primary"
                        onPress={() => toggleSheet()}/>
                        {/* // onPress={() => navigation.navigate('PlayGame')}/> */}
                    </View>

                    <Animated.View
                        style={[styles.subView,
                        {transform: [{translateY: bounceValue}]}]}
                    >
                        <SlidingSheet title='Enter Drawing' visible={sheetOpen} toggleSheet={toggleSheet}/>
                    </Animated.View>
                    

            </ScrollView>
            <BottomNav navigation={navigation} active={'Home'}></BottomNav>
        </View>
    )
}