import React, {useState} from 'react'
import { View, ScrollView, Text, Image } from 'react-native'
// import {fonts} from '../../../settings/fonts';
import {colors, fonts, utilities} from '../../../settings/all_settings';
import InfoFeed from '../../02_Molecules/InfoFeed/InfoFeed'
import BlockButton from '../../01_Atoms/Buttons/BlockButton/BlockButton'
import Card from '../../03_Organisms/Card/Card'
import BottomNav from '../../02_Molecules/BottomNav/BottomNav'
import StatsBar from '../../02_Molecules/StatsBar/StatsBar'
import Nswitch from '../../../../assets/images/switch.jpeg'
import { set } from 'react-native-reanimated';
import {styles} from './Profile.styling'
import { get_user } from '../../fake_users/stub-users';

function Profile({navigation, route}) {
    const [info, setInfo] = useState(true)
    const [viewing, setViewing] = useState((route.params != null) ? route.params.viewing : false)
    let name, username, profilePic, email, followers, following, enteredRaffles
    const userObj = route.params
    if (route.params == null) {
        name = 'John Doe'
        username = '@johndoe'
        profilePic = "https://i.pinimg.com/originals/dc/24/88/dc2488feb2d6dc4750a95a1f715c67d8.jpg"
        email = 'fakeemail'
        followers = []
        following = []
        enteredRaffles = []
    } else {
        name = route.params.name
        username = route.params.username
        profilePic = "https://i.pinimg.com/originals/dc/24/88/dc2488feb2d6dc4750a95a1f715c67d8.jpg"
        email = route.params.email
        followers = route.params.followers
        following = route.params.following
        enteredRaffles = route.params.enteredRaffles
    }
    if (viewing) {
        profilePic = 'https://i.ytimg.com/vi/oHg5SJYRHA0/hqdefault.jpg'
    }
    return (
        <View style={utilities.container}>
            <ScrollView>
                <Image source={{uri:profilePic}} style={styles.profilePic}></Image>
                <Text style={styles.header_name}>{name}</Text>
                <Text style={styles.header_username}>@{username}</Text>

                <StatsBar followers={followers.length} following={following.length} enteredRaffles={enteredRaffles.length}></StatsBar>

                <View style={styles.toggleBar}>
                    <InfoFeed info={info} setInfo={setInfo}></InfoFeed>
                </View>

                {(info) ? <View style={{alignItems: 'flex-start', marginLeft: 38}}>
                    <Text style={styles.descriptor}>Email</Text>
                    <Text style={styles.description}>{email}</Text>

                    {(!viewing) ? 
                    <View>

                    <Text style={styles.descriptor}>Address</Text>
                    <Text style={styles.description}>1234 Plumbus St. New York, New York 10001</Text>

                    <Text style={styles.descriptor}>Shoe Size</Text>
                    <Text style={styles.description}>Womens 5.5</Text>

                    <Text style={styles.descriptor}>Shirt Size</Text>
                    <Text style={styles.description}>M</Text>

                    <Text style={styles.descriptor}>Payment Information</Text>
                    <Text style={styles.description}>**** **** **** 1234</Text>

                    <View style={{flexDirection: 'row'}}>
                        <View style={styles.payment}>
                            <BlockButton
                            title="ADD PAYMENT"
                            color="secondary"
                            size="short"
                            onPress={() => navigation.navigate("RaffleResult", {name:name, setViewing:setViewing})}></BlockButton>
                        </View>
                        <View style={styles.payment}>
                            <BlockButton
                            title="EDIT PROFILE"
                            color="secondary"
                            size="short"
                            onPress={() => navigation.navigate("EditProfile", route.params)}></BlockButton>
                        </View>
                    </View>

                    </View> : null}
                </View> : 

                <View style={utilities.flexCenter}>
                    <Card
                        type='notification'
                        title="barbequeued Appa. btw This is Notification Card"
                        date='18hr'
                        host={{ name: "theAvatar", pic: Nswitch }}
                        navigation={navigation}
                        imageURI={Nswitch} />
                    <Card
                        type='notification'
                        title="barbequeued Appa. btw This is Notification Card"
                        date='26hr'
                        host={{ name: "theAvatar", pic: Nswitch }}
                        navigation={navigation}
                        imageURI={Nswitch} />
                </View>}
            </ScrollView>
            
            <BottomNav navigation={navigation} active={'Account'}></BottomNav>
        </View>
    )
}

export default Profile;