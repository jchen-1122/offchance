import React from 'react'
import { View, Text, ScrollView } from 'react-native'
// import {fonts} from '../../../settings/fonts';
import {colors, fonts, utilities} from '../../../settings/all_settings';
import BlockButton from '../../01_Atoms/Buttons/BlockButton/BlockButton';
import BottomNav from '../../02_Molecules/BottomNav/BottomNav';
import TopNav from '../../02_Molecules/TopNav/TopNav';
import Card from '../../03_Organisms/Card/Card';
import logo from '../../../../assets/images/michaelScott.jpg';
import Nswitch from '../../../../assets/images/nintendoSwitch.jpeg';

function Home({navigation}) {
    return (
        <View style={utilities.container}>
            <ScrollView contentContainerStyle={utilities.scrollview}>
                <TopNav navigation={navigation} active='Home'/>
                <View style={utilities.flexCenter}>
                <Card 
                    type='default'
                    title="Default Card"
                    host={{name:"theAvatar", pic: aang}}
                    navigation={navigation}
                    imageURI={Nswitch}/>
                <Card 
                    type='buy'
                    date='July 16, 11:00 AM'
                    title="Enter To Buy Card"
                    host={{name:"arrowhead", pic: aang}}
                    navigation={navigation}
                    imageURI={logo}/>
                <Card 
                    type='free'
                    date='July 16, 11:00 AM'
                    title="Free Drawing Card"
                    host={{name:"arrowhead", pic: aang}}
                    navigation={navigation}
                    imageURI={logo}/>
                <Card 
                    type='upcoming'
                    date='July 16, 11:00 AM'
                    title="Upcoming Raffle Card"
                    host={{name:"thisguyagain", pic: aang}}
                    navigation={navigation}
                    imageURI={logo}/>
                
                {/* <Card 
                    type='default-dark'
                    title="Dark Card (Go to Card.styles.js to change color at card__dark)"
                    host={{name:"theAvatar", pic: aang}}
                    navigation={navigation}
                    imageURI={Nswitch}/> */}
                </View>
            </ScrollView>
            <BottomNav navigation={navigation} active={'Home'}></BottomNav>
        </View>

    )
}

export default Home;