import React, {useState} from 'react'
import { View, Text } from 'react-native'
// import {fonts} from '../../../settings/fonts';
import {colors, fonts, utilities} from '../../../settings/all_settings';
import DropDownPicker from 'react-native-dropdown-picker';
import BottomNav from '../../02_Molecules/BottomNav/BottomNav'

function Likes({navigation}) {
    const [state, setState] = useState('uk')
    return (
        <View style={utilities.container}>
            <Text>this is a placeholder page for Likes</Text>

            <DropDownPicker
                items={[
                    {label: 'UK', value: 'uk'},
                    {label: 'France', value: 'france'},
                ]}
                defaultValue={state}
                containerStyle={{height: 40}}
                style={{backgroundColor: '#fafafa', marginLeft: 300, marginRight: 50}}
                itemStyle={{
                    justifyContent: 'flex-start'
                }}
                dropDownStyle={{backgroundColor: '#fafafa', marginLeft: 300, marginRight: 100}}
                onChangeItem={item => setState(item.value)}
            />
            

            <BottomNav navigation={navigation} active={'Likes'}></BottomNav>
        </View>
    )
}

export default Likes;