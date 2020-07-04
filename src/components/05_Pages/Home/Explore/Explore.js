import React from 'react'
import { View, Text } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { colors, utilities } from '../../../../settings/all_settings';
import TopNav from '../../../02_Molecules/TopNav/TopNav'
import BottomNav from '../../../02_Molecules/BottomNav/BottomNav';

import ListView from '../../../04_Templates/ListView/ListView';
import GridView from '../../../04_Templates/GridView/GridView';

function Explore({navigation}) {
    // example for top 5 donors
    let usernames = ['Aang', 'Katara', 'Toph', 'Sokka', 'Zuko']
    let profPics = [
        require('../../../../../assets/images/donor_placeholders/aang.png'),
        require('../../../../../assets/images/donor_placeholders/katara.png'),
        require('../../../../../assets/images/donor_placeholders/toph.png'),
        require('../../../../../assets/images/donor_placeholders/sokka.png'),
        require('../../../../../assets/images/donor_placeholders/zuko.png')
    ]

    return (
        <View style={utilities.container}>
<<<<<<< HEAD
            <ScrollView>
                <TopNav navigation={navigation} />
                <ListView title="Top 5 Donors" usernames={usernames} profPics={profPics}/>
                <GridView title="Latest Winners" bgColor="white"/>
            </ScrollView>
            <BottomNav navigation={navigation}></BottomNav>
=======
            <TopNav navigation={navigation}></TopNav>
            <Text>this is a placeholder page for Explore</Text>
            <BottomNav navigation={navigation} active={'Home'}></BottomNav>
>>>>>>> DropDown
        </View>
    )
}

export default Explore;