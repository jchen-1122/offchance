import React from 'react'
import { View, Text, ScrollView } from 'react-native'
import { utilities } from '../../../../settings/all_settings';
import TopNav from '../../../02_Molecules/TopNav/TopNav'
import BottomNav from '../../../02_Molecules/BottomNav/BottomNav'
import Construction from '../../../04_Templates/Construction/Construction'
import Card from '../../../03_Organisms/Card/Card';
import Nswitch from '../../../../../assets/images/nintendoSwitch.jpeg'
import aang from '../../../../../assets/images/donor_placeholders/aang.png';


function YourFeed({ navigation }) {
    return (
        <View style={utilities.container}>
            <Construction></Construction>
            {/* <ScrollView contentContainerStyle={utilities.scrollview}>
                <TopNav navigation={navigation} active='Your Feed' />
                <View style={utilities.flexCenter}>
                    <Card
                        type='notification'
                        title="barbequeued Appa. btw This is Notification Card"
                        date='July 16, 11:00 AM'
                        host={{ name: "theAvatar", pic: aang }}
                        navigation={navigation}
                        imageURI={Nswitch} />
                    <Card
                        type='notification'
                        title="barbequeued Appa. btw This is Notification Card"
                        date='July 16, 11:00 AM'
                        host={{ name: "theAvatar", pic: aang }}
                        navigation={navigation}
                        imageURI={Nswitch} />
                </View>
            </ScrollView> */}
            <BottomNav navigation={navigation} active={'Home'}></BottomNav>
        </View>
    )
}

export default YourFeed;