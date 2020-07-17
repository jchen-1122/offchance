import React, {useState} from 'react';
import { View, Text, ScrollView } from 'react-native'
// import {fonts} from '../../../settings/fonts';
import {colors, fonts, utilities} from '../../../settings/all_settings';
import BottomNav from '../../02_Molecules/BottomNav/BottomNav';
import TopNav from '../../02_Molecules/TopNav/TopNav';
import Card from '../../03_Organisms/Card/Card';
import aang from '../../../../assets/images/donor_placeholders/aang.png';

import {get_user} from '../../fake_users/stub-users';
function Home({navigation}) {
    const data = require('../../IP_ADDRESS.json');
    const [raffles, setRaffles] = useState([])

    // get one raffle item
    React.useEffect(() => {
        async function getRaffle() {
        let raffleID = '5f0f88c325ed43ab8af8612c'
          let response = await fetch('http://'+data.ipAddress+':3000/raffle/all')
          response = await response.json()
          setRaffles(response)
        }
        getRaffle()
      }, [])

    return (
        <View style={utilities.container}>
            <ScrollView contentContainerStyle={utilities.scrollview}>
                <TopNav navigation={navigation} active='Home'/>
                <View style={utilities.flexCenter}>
                    {raffles.map( 
                        d => 
                        <Card
                            data={d}
                            type='default'
                            host={{name:"theAvatar", pic: aang}}
                            navigation={navigation}
                        />
                    )} 
                
                {/* <Card 
                    type='upcoming'
                    date='July 16, 11:00 AM'
                    title="Upcoming Raffle Card"
                    host={{name:"thisguyagain", pic: aang}}
                    navigation={navigation}
                    imageURI={logo}/> */}
                </View>
            </ScrollView>
            <BottomNav navigation={navigation} active={'Home'} />
        </View>

    )
}

export default Home;