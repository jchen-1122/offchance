import React from 'react'
import { View, Image, Text } from 'react-native'
import styles from './Top5Donors.styling'
import { fonts } from '../../../settings/all_settings'

function Top5Donors({ navigation, users}) {
    let donors = [];
    if (users[0] != null){
        for (var i=0; i<5; i++){
            donors.push(
            <Image source={{uri:users[i].profilePicture}} style={styles.donor} />
            )
        }
    }
    
    return (
            <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                <Text style={[fonts.italic,{textAlign: 'left'}]}>Top 5 Donors: </Text>
                {donors}
            </View>
    )
}

export default Top5Donors;