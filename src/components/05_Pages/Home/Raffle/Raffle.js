import React, { useState } from 'react';
import { ScrollView, View, Text, Image, Animated } from 'react-native'
import { utilities, fonts, colors } from '../../../../settings/all_settings';
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
import { unix_to_date, is_expired } from '../../../../functions/convert_dates';


export default function Raffle({ navigation, route }) {

    // get host of raffle from db
    const [host, setHost] = useState(null)
    const ip = require('../../../IP_ADDRESS.json');
    React.useEffect(() => {
        async function getHost() {
            let response = await fetch('http://' + ip.ipAddress + ':3000/user/id/' + route.params.hostedBy)
            response = await response.json()
            setHost(response)
            console.log(host)
        }
        getHost()
    }, [])

    // get fields of raffle from db
    let name;
    let description;
    let date;
    let expired;
    let images_strs; // string rep of images for carousel
    let sizes;
    if (route.params != null) {
        name = route.params.name
        description = route.params.description
        date = unix_to_date(route.params.startTime)
        expired = is_expired(route.params.startTime)
        images_strs = route.params.images
        sizes = route.params.sizes
    }

    let images = [];
    for (let i in images_strs) {
        images.push({ uri: images_strs[i] })
    }
    // const images = [require('../../../../../assets/images/nintendoSwitch.jpeg'), require('../../../../../assets/images/michaelScott.jpg'), require('../../../../../assets/images/pamBeesly.jpg'), require('../../../../../assets/images/profilePic.png'), require('../../../../../assets/images/logo.png')]
    const donors = [require('../../../../../assets/images/naacp.jpg'), require('../../../../../assets/images/aclu.jpg')]

    // for sliding sheet (payment)
    const [sheetOpen, setSheetOpen] = useState(false);
    const [bounceValue, setBounceValue] = useState(new Animated.Value(100)); // initial position of sheet

    const toggleSheet = () => {
        var toValue = 100;
        if (sheetOpen == false) {
            toValue = 0
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

    let sizeTypes = ['W', 'M', 'Y']
    let options = {
        5: { chances: 10 },
        10: { chances: 40 },
        20: { chances: 50 },
        50: { chances: 150 },
        100: { chances: 400 },
    }

    // uncomment for one image example
    // const images = [require('../../../../assets/images/dwightSchrute.jpg')]
    return (
        <View style={[utilities.container, { backgroundColor: 'white' }]}>
            <ScrollView contentContainerStyle={utilities.scrollview}>
                {images.length > 1 ? <ImageCarousel images={images}></ImageCarousel> : <Image source={images[0]} style={{ width: 400, height: 300, resizeMode: 'center' }}></Image>}

                {/* raffle title */}
                <Text style={[fonts.h1, { marginLeft: '8%', marginBottom: 0 }]}>{name}</Text>

                <View style={styles.content}>
                    <View style={{ marginTop: 15 }}>
                        {(expired) ? <Text style={[fonts.bold, fonts.error,{ marginBottom: 10 }]}>THIS DRAWING HAS EXPIRED</Text> : <Text style={fonts.italic}>Drawing Starts:</Text>}
                        {(expired) ? null : <Text style={{ fontWeight: 'bold', marginBottom: 15 }}>{date}</Text>}
                    </View>

                    <View style={{ marginRight: '-5%', marginBottom: 15 }}>
                        <Text style={fonts.italic}>Hosted by:</Text>
                        <HostedBy data={host} navigation={navigation} />
                    </View>
                    {/* !!!!!!!!!!!!! TODO: connect to db and format !!!!!!!!!!!!!!*/}
                    {/* winner of raffle if expired */}
                    {expired ?
                        <View style={{ backgroundColor: colors.lightGreen, marginRight: '-5%', marginBottom: 15,}}>
                            <Text style={fonts.italic}>Won by:</Text>
                            <HostedBy data={host} navigation={navigation}/>
                        </View>
                        :
                        null
                    }

                    <Text style={fonts.italic}>Description</Text  >
                    <Text style={{ marginBottom: 15 }}>{description}</Text>

                    <Text style={fonts.italic}>Valued At</Text  >
                    <Text style={{ marginBottom: 15 }}>$200</Text>

                    {/* !!!!!!!!!!!!! TODO: top 5 donors !!!!!!!!!!!!!!*/}
                    <Top5Donors images={images} />

                    {(expired) ? null :
                        <View>
                            {/* !!!!!!!!!!!!! TODO: conditionally show progress bar !!!!!!!!!!!!!!*/}
                            <ProgressBar progress={230 / 500} color={colors.primaryColor} raised={230} goal={500} width={315} />

                            <View style={styles.pickSize}>
                                <Text>PICK YOUR SIZE</Text>
                                {(sizeTypes.length > 0) ? <DropDown options={sizeTypes} size='small' /> : null}
                                <DropDown options={sizes} size='small' />
                            </View>

                            <BuyOptions bonusAmount={10} bonusChances={40} bonusLimit={10} options={options} />
                            <Text style={{ marginRight: -10 }}>*We we will never show donation amounts for any user</Text>
                        </View>
                    }

                    <Text style={[fonts.p, { marginTop: 20, textAlign: 'justify' }]}>Off Chance is a for-good company that hosts drawings for incredible products to raise money for charities and important causes that affect us all. All net proceeds (after hosting and platform fees) for this drawing will benefit the partners below:</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, marginBottom: 20 }}>
                        <Image source={donors[0]} />
                        <Image source={donors[1]} />
                    </View>
                    <Text style={[fonts.p, { textAlign: 'justify' }]}>*All prizes are guaranteed to be 100% authentic and deadstock. You will be notified via email once donation goal is met and drawing starts.</Text>
                </View>

                <View style={[styles.content, { flex: 0, alignItems: 'center', zIndex: -1 }]}>
                    <BlockButton
                        title="PLAY GAME"
                        color="primary"
                        onPress={() => navigation.navigate('GameController')}
                        disabled={expired} />
                    <BlockButton
                        title="ENTER DRAWING"
                        color="highlight"
                        onPress={() => toggleSheet()}
                        disabled={expired} />
                </View>

                {/* sliding sheet */}
                <Animated.View
                    style={[styles.subView,
                    { transform: [{ translateY: bounceValue }] }]}>
                    <SlidingSheet title='Enter Drawing' content={['abc']} visible={sheetOpen} toggleSheet={toggleSheet} />
                </Animated.View>

            </ScrollView>
            <BottomNav navigation={navigation} active={'Home'}></BottomNav>
        </View>
    )
}
