import React, {useState, useContext} from 'react';
import { View, Dimensions, ScrollView } from 'react-native'
// import {fonts} from '../../../settings/fonts';
import {colors, fonts, utilities} from '../../../settings/all_settings';
import BottomNav from '../../02_Molecules/BottomNav/BottomNav';
import TopNav from '../../02_Molecules/TopNav/TopNav';
import Card from '../../03_Organisms/Card/Card';
import ToggleType from '../../01_Atoms/Buttons/ToggleType/ToggleType';
import ToggleTypeMenu from '../../03_Organisms/ToggleTypeMenu/ToggleTypeMenu'
import GlobalState from '../../globalState'

import {get_user} from '../../fake_users/stub-users';
function Home({navigation}) {
    const data = require('../../IP_ADDRESS.json');
    const {user, setUser} = useContext(GlobalState)
    const [raffles, setRaffles] = useState([])

    // for toggling types of cards (0=all, 1=donate, 2=buy)
    const [viewType, setViewType ] = useState(0)
    const [toggleMenuOpen, setToggleMenuOpen] = useState(false)

    // get all raffles and maybe filter them by type
    React.useEffect(() => {
        async function getRaffle() {
          let response = await fetch('http://'+data.ipAddress+':3000/raffle/all')
          response = await response.json()
          // filter raffles based on what type they want to see (donate, buy, all)
          response = (viewType == 1) ? response.filter((raffle)=>{return raffle.type==1}) : response
          response = (viewType == 2) ? response.filter((raffle)=>{return raffle.type==2}) : response
          setRaffles(response)
        }
        getRaffle()

      }, [viewType])

    return (
        <View style={utilities.container}>
            <ScrollView contentContainerStyle={utilities.scrollview}>
                <TopNav navigation={navigation} active='Home'/>

                <View style={utilities.flexCenter}>
                    <View style={{width: Dimensions.get('window').width * 0.85, alignItems: 'flex-end', marginTop: '5%'}}>
                        <ToggleType viewType={viewType} toggleMenuOpen={toggleMenuOpen} setToggleMenuOpen={setToggleMenuOpen}/>
                    </View>
                    {raffles.map((raffle, index) => 
                        <Card
                            data={raffle}
                            viewType={viewType}
                            key={index}
                            navigation={navigation}
                            currUserG={user}
                            setUserG={setUser}
                        />
                    )} 
                </View>
            </ScrollView>
            {toggleMenuOpen ? <ToggleTypeMenu setToggleMenuOpen={setToggleMenuOpen} viewType={viewType} setViewType={setViewType}/> : null}
            
            <BottomNav navigation={navigation} active={'Home'} />
        </View>

    )
}

export default Home;