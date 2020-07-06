import * as React from 'react';
import { ScrollView, View, Text, Image } from 'react-native'
import BottomNav from '../../../02_Molecules/BottomNav/BottomNav'
import ProgressBar from '../../../02_Molecules/ProgressBar/ProgressBar'
import HostedBy from '../../../02_Molecules/HostedBy/HostedBy'
import Top5Donors from '../../../02_Molecules/Top5Donors/Top5Donors'
import DropDown from '../../../01_Atoms/DropDown/DropDown'
import ImageCarousel from '../../../02_Molecules/ImageCarousel/ImageCarousel'
import {utilities, fonts, colors} from '../../../../settings/all_settings';
import BlockButton from '../../../01_Atoms/Buttons/BlockButton/BlockButton';


export default function Raffle({navigation}) {
    const images = [require('../../../../../assets/images/nintendoSwitch.jpeg'), require('../../../../../assets/images/michaelScott.jpg'), require('../../../../../assets/images/pamBeesly.jpg'), require('../../../../../assets/images/profilePic.png'), require('../../../../../assets/images/logo.png')]
    const proPic = require('../../../../../assets/images/profilePic.png')
    // uncomment for one image example
    // const images = [require('../../../../assets/images/dwightSchrute.jpg')]
    return (
        <View style={utilities.container}>
            <ScrollView contentContainerStyle={utilities.scrollview}>
                {images.length > 1 ? <ImageCarousel images={images}></ImageCarousel> : <Image source={images[0]} style={{width: 400, height: 300, resizeMode: 'center'}}></Image>}
                <Text style={[fonts.h1, {fontWeight: 'bold', textAlign:'center', width: 400}]}>Nintendo Switch with Neon Joy-Con</Text>
                <HostedBy image={proPic} account={'@instagram'} navigation={navigation}></HostedBy>
                <Text style={{marginLeft: 30, fontWeight: '600', fontSize: 16, marginBottom: 5}}>Description</Text>
                <Text style={{marginLeft: 30, textAlign:'justify', marginRight: 30, marginBottom: 30}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla cursus, dui ac fermentum dapibus, dolor lorem aliquam nibh, sit amet commodo mi massa id nunc. Aenean vel mollis lorem.</Text>
                <Text style={{marginLeft: 30, textAlign:'justify', marginRight: 30, fontWeight: '300'}}>DRAWING STARTS</Text>
                <Text style={{marginLeft: 30, textAlign:'justify', marginRight: 30, fontWeight: '800', marginBottom: 50}}>July 16, 11:00 AM</Text>
                <Top5Donors images={images}></Top5Donors>
                <ProgressBar progress={230 / 500} color={colors.highlightColor} raised={230} goal={500} width={350}></ProgressBar>
                <DropDown></DropDown>
                <BlockButton
                    title="PLAY GAME"
                    color="primary"
                    onPress={() => navigation.navigate('GameController')}/>
                    {/* // onPress={() => navigation.navigate('PlayGame')}/> */}
            </ScrollView>
            <BottomNav navigation={navigation} active={'Home'}></BottomNav>
        </View>
    )
}