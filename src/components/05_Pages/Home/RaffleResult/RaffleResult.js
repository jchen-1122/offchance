import React, {useState} from 'react';
import { ScrollView, View, Text, Image, Dimensions, TouchableOpacity } from 'react-native'
import { Overlay } from 'react-native-elements';
import {utilities, fonts, colors} from '../../../../settings/all_settings';
import styles from './RaffleResult.styling';
import get_user from '../../../stub-users';
import BottomNav from '../../../02_Molecules/BottomNav/BottomNav'
import ProgressBar from '../../../02_Molecules/ProgressBar/ProgressBar'
import HostedBy from '../../../02_Molecules/HostedBy/HostedBy'
import Top5Donors from '../../../02_Molecules/Top5Donors/Top5Donors'
import DropDown from '../../../01_Atoms/DropDown/DropDown'
import ImageCarousel from '../../../02_Molecules/ImageCarousel/ImageCarousel'
import BlockButton from '../../../01_Atoms/Buttons/BlockButton/BlockButton';



export default function RaffleResult({navigation}) {
    const [selected, setSelected] = useState(0)
    const [overlay, setoverlay] = useState(false)

    let test = get_user(9)

    let CardArray = Array(8).fill().map((_, i) => <TouchableOpacity style={styles.card} 
        onPress={() => {
            setoverlay(true)
            setSelected(i)
        }}/>);


    return (
        <ScrollView>
            <View style={styles.container}>
                {CardArray}
                <Overlay isVisible={overlay} onBackdropPress={() => setoverlay(false)}>
                    <Text>{selected}</Text>
                </Overlay>
    <Text>{test}</Text>
            </View>
        </ScrollView>
    )
}