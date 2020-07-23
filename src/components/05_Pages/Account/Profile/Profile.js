import React, {useState, useContext, useEffect} from 'react'
import { View, ScrollView, Text, Image,Button } from 'react-native'
import {colors, fonts, utilities} from '../../../../settings/all_settings';
import InfoFeed from '../../../02_Molecules/InfoFeed/InfoFeed'
import BlockButton from '../../../01_Atoms/Buttons/BlockButton/BlockButton'
import Card from '../../../03_Organisms/Card/Card'
import BottomNav from '../../../02_Molecules/BottomNav/BottomNav'
import StatsBar from '../../../02_Molecules/StatsBar/StatsBar'
import Nswitch from '../../../../../assets/images/switch.jpeg'
import {styles} from './Profile.styling'
import GlobalState from '../../../globalState';

function Profile({navigation}) {
    const {user, setUser} = useContext(GlobalState)

    // add edit button in topbar
    React.useLayoutEffect(() => {
        navigation.setOptions({
          headerRight: () => (
            <Button onPress={() => {
                navigation.navigate("EditProfile", user)}} title="Edit" />
          ),
        });
      }, [navigation]);

    const [info, setInfo] = useState(true)
    const [viewing, setViewing] = useState((user != null) ? user.viewing : false)
    let name, username, profilePic, email, followers, following, enteredRaffles, address, shoeSize, shirtSize
    useEffect(() => {
        name = 'JohnDoe'
    })
    if (user == null) {
        name = 'John Doe'
        username = '@johndoe'
        profilePic = "https://i.pinimg.com/originals/dc/24/88/dc2488feb2d6dc4750a95a1f715c67d8.jpg"
    } else {
        name = user.name
        username = user.username
        profilePic = user.profilePicture
        email = user.email
        followers = user.followers
        following = user.following
        enteredRaffles = user.enteredRaffles
        address = user.shippingAddress
        shoeSize = user.shoeSize
        shirtSize = user.shirtSize
    }
    if (user.shoeSize == null) {
        user.shoeSize = 15
    } 
    if (user.shirtSize == null) {
        user.shirtSize = 15
    } 
    return (
        <View style={utilities.container}>
            <ScrollView>
                <Image source={{uri:profilePic}} style={styles.profilePic}></Image>
                <Text style={styles.header_name}>{name}</Text>
                <Text style={styles.header_username}>@{username}</Text>

                <StatsBar currUser={user} followers={followers} following={following} enteredRaffles={enteredRaffles} navigation={navigation}></StatsBar>

                <View style={styles.toggleBar}>
                    <InfoFeed info={info} setInfo={setInfo}></InfoFeed>
                </View>

                {(info) ? <View style={{alignItems: 'flex-start', marginLeft: 38}}>
                    <Text style={styles.descriptor}>Name</Text>
                    <Text style={styles.description}>{name}</Text>

                    <Text style={styles.descriptor}>Email</Text>
                    <Text style={styles.description}>{email}</Text>

                    {(!viewing) ?
                    <View>

                    <Text style={styles.descriptor}>Address</Text>
                    <Text style={styles.description}>{address}</Text>

                    <Text style={styles.descriptor}>Shoe Size</Text>
                    <Text style={styles.description}>{shoeSize}</Text>

                    <Text style={styles.descriptor}>Shirt Size</Text>
                    <Text style={styles.description}>{shirtSize}</Text>

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
                            onPress={() => {
                                navigation.navigate("EditProfile", user)}}></BlockButton>
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
