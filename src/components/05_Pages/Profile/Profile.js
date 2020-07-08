import React, {useState} from 'react'
import { View, ScrollView, Text, Image } from 'react-native'
// import {fonts} from '../../../settings/fonts';
import {colors, fonts, utilities} from '../../../settings/all_settings';
import InfoFeed from '../../02_Molecules/InfoFeed/InfoFeed'
import BlockButton from '../../01_Atoms/Buttons/BlockButton/BlockButton'
import Card from '../../03_Organisms/Card/Card'
import BottomNav from '../../02_Molecules/BottomNav/BottomNav'
import Nswitch from '../../../../assets/images/switch.jpeg'
import { set } from 'react-native-reanimated';

function Profile({navigation, route}) {
    const [info, setInfo] = useState(true)
    const { name, username, profilePic, following, prize, id } = route.params
    return (
        <View style={utilities.container}>
            <ScrollView>
                <Text style={{fontSize: 25, textAlign: 'center', fontWeight: '700', marginTop: 15, marginBottom: 15}}>{name}</Text>
                <Image source={profilePic} style={{width: 120, height: 120, resizeMode: 'contain',  borderRadius: 120 / 2, alignSelf: 'center'}}></Image>
                
                <View style={{alignItems: 'center'}}>
                    <InfoFeed info={info} setInfo={setInfo}></InfoFeed>
                </View>

                {(info) ? <View style={{alignItems: 'flex-start', marginLeft: 38}}>
                    <Text style={{fontWeight: '800', fontSize: 15}}>Name</Text>
                    <Text style={{fontWeight: '300', fontSize: 17, marginBottom: 25}}>{name}</Text>

                    <Text style={{fontWeight: '800', fontSize: 15}}>Email</Text>
                    <Text style={{fontWeight: '300', fontSize: 17, marginBottom: 25}}>qwerty@gmail.com</Text>

                    <Text style={{fontWeight: '800', fontSize: 15}}>Username</Text>
                    <Text style={{fontWeight: '300', fontSize: 17, marginBottom: 25}}>@{username}</Text>

                    <Text style={{fontWeight: '800', fontSize: 15}}>Address</Text>
                    <Text style={{fontWeight: '300', fontSize: 17, marginBottom: 25}}>1234 Plumbus St. New York, New York 10001</Text>

                    <Text style={{fontWeight: '800', fontSize: 15}}>Shoe Size</Text>
                    <Text style={{fontWeight: '300', fontSize: 17, marginBottom: 25}}>Womens 5.5</Text>

                    <Text style={{fontWeight: '800', fontSize: 15}}>Shirt Size</Text>
                    <Text style={{fontWeight: '300', fontSize: 17, marginBottom: 25}}>M</Text>

                    <Text style={{fontWeight: '800', fontSize: 15}}>Payment Information</Text>
                    <Text style={{fontWeight: '300', fontSize: 17, marginBottom: 25}}>**** **** **** 1234</Text>

                    <View style={{marginLeft: -15}}>
                        <BlockButton
                        title="ADD PAYMENT"
                        color="secondary"
                        size="short"></BlockButton>
                    </View>
                </View> : 

                <View style={utilities.flexCenter}>
                    <Card
                        type='notification'
                        title="barbequeued Appa. btw This is Notification Card"
                        date='18hr'
                        host={{ name: "theAvatar", pic: profilePic }}
                        navigation={navigation}
                        imageURI={Nswitch} />
                    <Card
                        type='notification'
                        title="barbequeued Appa. btw This is Notification Card"
                        date='26hr'
                        host={{ name: "theAvatar", pic: profilePic }}
                        navigation={navigation}
                        imageURI={Nswitch} />
                </View>}
            </ScrollView>
            
            <BottomNav navigation={navigation} active={'Account'}></BottomNav>
        </View>
    )
}

export default Profile;