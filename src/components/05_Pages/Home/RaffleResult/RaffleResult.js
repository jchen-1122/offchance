import React, {useState} from 'react';
import { ScrollView, View, Text, Image, Dimensions, TouchableOpacity } from 'react-native'
import { Overlay } from 'react-native-elements';
import {utilities, fonts, colors} from '../../../../settings/all_settings';
import styles from './RaffleResult.styling';
import BottomNav from '../../../02_Molecules/BottomNav/BottomNav'
import ProgressBar from '../../../02_Molecules/ProgressBar/ProgressBar'
import HostedBy from '../../../02_Molecules/HostedBy/HostedBy'
import Top5Donors from '../../../02_Molecules/Top5Donors/Top5Donors'
import DropDown from '../../../01_Atoms/DropDown/DropDown'
import ImageCarousel from '../../../02_Molecules/ImageCarousel/ImageCarousel'
import BlockButton from '../../../01_Atoms/Buttons/BlockButton/BlockButton';
import { get_user } from '../../../fake_users/stub-users.js';


export default function RaffleResult({navigation}) {
    const [selected, setSelected] = useState(null)
    const [overlay, setoverlay] = useState(false)
    const [prize, setPrize] = useState(null)

    //const customData = require('../../../fake_users/stub-users.json');
    //let plswork = customData.users[2].name

    let CardArray = Array(100).fill().map((_, i) => <TouchableOpacity style={styles.card} 
        onPress={() => {
            setoverlay(true)
            setSelected(get_user(i+1).name)
            setPrize(get_user(i+1).prize)
        }}>
            <Text>{i + 1}</Text>
            {/* This is what will be displayed on the back of the cards */}
        </TouchableOpacity>);


    return (
        <ScrollView>
            <View style={styles.container}>
                {CardArray}
                <Overlay isVisible={overlay} onBackdropPress={() => setoverlay(false)}>
                    <View style={styles.overlay}>
                        {/* This is what is displayed within the overlay */}
                        <Text>{selected}</Text>
                        <Text>has won</Text>
                        <Text>{prize}</Text>
                    </View>
                </Overlay>
            </View>
        </ScrollView>
    )
}