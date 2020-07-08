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
import BuyOptions from '../../../02_Molecules/BuyOptions/BuyOptions'
import SlidingSheet from '../../../04_Templates/SlidingSheet/SlidingSheet';

export default function Raffle({navigation}) {
    const images = [require('../../../../../assets/images/nintendoSwitch.jpeg'), require('../../../../../assets/images/michaelScott.jpg'), require('../../../../../assets/images/pamBeesly.jpg'), require('../../../../../assets/images/profilePic.png'), require('../../../../../assets/images/logo.png')]
    const proPic = require('../../../../../assets/images/profilePic.png')
    const donors = [require('../../../../../assets/images/naacp.jpg'), require('../../../../../assets/images/aclu.jpg')]

    // for sliding sheet (payment)
    const [sheetOpen, setSheetOpen] = useState(false);
    const [bounceValue, setBounceValue] = useState(new Animated.Value(100)); // initial position of sheet
    const [expired, setExpired] = useState(true)

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
                friction: 8,
                useNativeDriver: true
        }).start();

        setSheetOpen(!sheetOpen);
    };

    let sizes = [69, 420, 9, 9.5]
    let options = {
        5: {
            chances: 10
        },
        20: {
            chances: 50
        },
        50: {
            chances: 150
        },
        100: {
            chances: 400
        },
    }

    // uncomment for one image example
    // const images = [require('../../../../assets/images/dwightSchrute.jpg')]
    return (
        <View style={utilities.container}>
            <ScrollView contentContainerStyle={utilities.scrollview}>
                {images.length > 1 ? <ImageCarousel images={images}></ImageCarousel> : <Image source={images[0]} style={{width: 400, height: 300, resizeMode: 'center'}}></Image>}

                    <Text style={[fonts.h1,{marginLeft: '8%'}]}>Nintendo Switch with Neon Joy-Con</Text>
                    {(expired) ? <HostedBy image={images[1]} account={'Won by @mscott69'} navigation={navigation} backColor={colors.highlightColor}></HostedBy> : null}
                    <HostedBy image={proPic} account={'Hosted by @instagram'} navigation={navigation}></HostedBy>
                    <View style={styles.content}>
                        <Text style={fonts.h3}>Description</Text>
                        <Text style={{marginBottom: 15}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla cursus, dui ac fermentum dapibus, dolor lorem aliquam nibh, sit amet commodo mi massa id nunc. Aenean vel mollis lorem.</Text>
                        {(expired) ? <Text style={[fonts.bold, {marginBottom: 10}]}>THIS DRAWING HAS EXPIRED</Text> : <Text style={fonts.light}>DRAWING STARTS</Text>}
                        {(expired) ? null : <Text style={{fontWeight: 'bold', marginBottom: 15}}>July 16, 11:00 AM</Text>}

                        <Top5Donors images={images} />
                        {(expired) ? null : <ProgressBar progress={230 / 500} color={colors.highlightColor} raised={230} goal={500} width={315} />}
                        {(expired) ? null : <DropDown options={sizes} size='small'/>  } 
                        {(expired) ? null : <BuyOptions bonusAmount={10} bonusChances={40} bonusLimit={10} options={options}></BuyOptions>}
                        {(expired) ? null : <Text style={{marginRight: -10}}>*We we will never show donation amounts for any user</Text>}
                        <Text style={[fonts.p, {marginTop: 20, textAlign: 'justify'}]}>Off Chance is a for-good company that hosts drawings for incredible products to raise money for charities and important causes that affect us all. All net proceeds (after hosting and platform fees) for this drawing will benefit the partners below:</Text>
                        <View style={{flexDirection: 'row'}}>
                            <Image source={donors[0]} style={{marginTop: 10, marginRight: 70}}></Image>
                            <Image source={donors[1]} style={{marginTop: 10}}></Image>
                        </View>                        
                        <Text style={[fonts.p, {marginTop: 20, textAlign: 'justify'}]}><Text style={[fonts.p, {marginTop: 20, textAlign: 'justify'}]}>*All prizes are guaranteed to be 100% authentic and deadstock. You will be notified via email once donation goal is met and drawing starts.</Text></Text>
                    </View>
                    <View style={[styles.content, {flex: 0, alignItems: 'center', zIndex: -1}]}>
                        <BlockButton
                        title="PLAY GAME"
                        color="primary"
                        onPress={() => navigation.navigate('GameController')}
                        disabled={expired}/>
                        <BlockButton
                        title="ENTER DRAWING"
                        color="primary"
                        onPress={() => toggleSheet()}
                        disabled={expired}/>
                        <BlockButton
                        title="toggle expired view (TEST)"
                        color="primary"
                        onPress={() => setExpired(!expired)}/>
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