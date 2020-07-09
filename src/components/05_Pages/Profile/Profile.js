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
import {styles} from './Profile.styling'

function Profile({navigation, route}) {
    const [info, setInfo] = useState(true)
    const { name, username, profilePic, following, prize, id } = route.params
    return (
        <View style={utilities.container}>
            <ScrollView>
                <Text style={styles.header_name}>{name}</Text>
                <Image source={profilePic} style={styles.profilePic}></Image>
                
                <View style={styles.toggleBar}>
                    <InfoFeed info={info} setInfo={setInfo}></InfoFeed>
                </View>

                {(info) ? <View style={{alignItems: 'flex-start', marginLeft: 38}}>
                    <Text style={styles.descriptor}>Name</Text>
                    <Text style={styles.description}>{name}</Text>

                    <Text style={styles.descriptor}>Email</Text>
                    <Text style={styles.description}>qwerty@gmail.com</Text>

                    <Text style={styles.descriptor}>Username</Text>
                    <Text style={styles.description}>@{username}</Text>

                    <Text style={styles.descriptor}>Address</Text>
                    <Text style={styles.description}>1234 Plumbus St. New York, New York 10001</Text>

                    <Text style={styles.descriptor}>Shoe Size</Text>
                    <Text style={styles.description}>Womens 5.5</Text>

                    <Text style={styles.descriptor}>Shirt Size</Text>
                    <Text style={styles.description}>M</Text>

                    <Text style={styles.descriptor}>Payment Information</Text>
                    <Text style={styles.description}>**** **** **** 1234</Text>

                    <View style={styles.payment}>
                        <BlockButton
                        title="ADD PAYMENT"
                        color="secondary"
                        size="short"
                        onPress={() => navigation.navigate("Profile")}></BlockButton>
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