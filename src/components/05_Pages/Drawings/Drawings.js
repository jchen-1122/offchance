import React from 'react'
import { View, Text } from 'react-native'
// import {fonts} from '../../../settings/fonts';
import { ScrollView } from 'react-native-gesture-handler';
import {colors, fonts, utilities} from '../../../settings/all_settings';
import BottomNav from '../../02_Molecules/BottomNav/BottomNav';
import GridView from '../../04_Templates/GridView/GridView';
import Construction from '../../04_Templates/Construction/Construction'

function Drawings({navigation}) {
    return (
        // just for demo
        <View style={utilities.container}>
            <Construction></Construction>
            <BottomNav navigation={navigation} active={'Drawings'}></BottomNav>
        </View>
        // <View style={utilities.container}>
        //     <ScrollView>
        //         <GridView title="Upcoming Raffles" bgColor="white" Gridtype="raffle" navigation={navigation}/>
        //     </ScrollView>
        //     <BottomNav navigation={navigation} active={'Drawings'}></BottomNav>
        // </View>
    )
}

export default Drawings;