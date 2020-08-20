import React, { useState, useContext, useEffect } from 'react';
import { Text, View, Dimensions, ScrollView, BackHandler, Alert } from 'react-native'
import { colors, fonts, utilities } from '../../../../settings/all_settings';
import GlobalState from '../../../globalState'
import BottomNav from '../../../02_Molecules/BottomNav/BottomNav';
import TopNav from '../../../02_Molecules/TopNav/TopNav';
import Card from '../../../03_Organisms/Card/Card';
import ToggleType from '../../../01_Atoms/Buttons/ToggleType/ToggleType';
import ToggleTypeMenu from '../../../03_Organisms/ToggleTypeMenu/ToggleTypeMenu'

function SeeAll({ navigation, route }) {
    var allRaffles = route.params.raffles
    var donateRaffles = allRaffles.filter((raffle) => { return raffle.type == 1 })
    var buyRaffles = allRaffles.filter((raffle) => { return raffle.type == 2 })

    const [raffles, setRaffles] = useState(allRaffles)
    var titles = ['Trending', 'Coming Soon', 'Entered Drawings']
    var toggle = titles.includes(route.params.title)

    const { user, setUser } = useContext(GlobalState)
    const [viewType, setViewType] = useState(0)
    const [toggleMenuOpen, setToggleMenuOpen] = useState(false)
    
    useEffect(() => {
        console.log(allRaffles.length)
        if (viewType == 0){
            setRaffles(allRaffles)
        }
        if (viewType == 1){
           setRaffles(donateRaffles)
        }
        if (viewType == 2){
            setRaffles(buyRaffles)
        }
    },[viewType])

    return (
        <View style={utilities.container}>
            <ScrollView contentContainerStyle={utilities.scrollview}>
                <View style={utilities.flexCenter}>
                    {toggle ?
                        <View style={{ width: Dimensions.get('window').width * 0.85, alignItems: 'flex-end', marginTop: '5%' }}>
                            <ToggleType viewType={viewType} toggleMenuOpen={toggleMenuOpen} setToggleMenuOpen={setToggleMenuOpen} />
                        </View> :
                        null
                    }
                    {raffles.map((raffle, index) =>
                        <Card
                            data={raffle}
                            viewType={viewType}
                            key={index}
                            navigation={navigation}
                            currUserG={user}
                            setUserG={setUser}
                            banner={toggle}
                        />
                    )}
                </View>
            </ScrollView>
            {toggleMenuOpen ? <ToggleTypeMenu setToggleMenuOpen={setToggleMenuOpen} viewType={viewType} setViewType={setViewType} /> : null}
            <BottomNav navigation={navigation} active={'Home'} />
        </View>

    )
}

export default SeeAll;
