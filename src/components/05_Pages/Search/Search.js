import React, { Component, useState, useContext } from 'react'
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Dimensions, BackHandler, Alert, Button, } from 'react-native'
import { SearchBar } from 'react-native-elements';
import { colors, fonts, utilities } from '../../../settings/all_settings';
import BottomNav from '../../02_Molecules/BottomNav/BottomNav';
import SearchInput, { createFilter } from 'react-native-search-filter';
import { styles } from './Search.styling'
import BlockButton from '../../01_Atoms/Buttons/BlockButton/BlockButton'
import Card from '../../03_Organisms/Card/Card';
import FlatCard from '../../03_Organisms/FlatCard/FlatCard';
import UsernameDisplay from '../../01_Atoms/UsernameDisplay/UsernameDisplay';
import GlobalState from '../../globalState';
// import {user_logged_in} from '../../../functions/user_functions';

import emails from './emails'

function Search({navigation}) {

    {/* TODO: Search for yourself */}
    const data = require('../../IP_ADDRESS.json');
    const {user, setUser} = useContext(GlobalState)
    const [raffles, setRaffles] = useState([]);
    const [users, setUsers] = useState([]);
    const [displayUser, setDisplayUser] = useState(false);
    const [buttonStyle, setButtonStyle] = useState(false);

    // for toggling types of cards (0=all, 1=donate, 2=buy)
    const [viewType, setViewType ] = useState(0)
    const [toggleMenuOpen, setToggleMenuOpen] = useState(false)

    // Get all raffles & users from db
    React.useEffect(() => {
        async function getRaffle() {
          let response = await fetch('http://'+data.ipAddress+'/raffle/all')
          response = await response.json()
          // filter raffles based on what type they want to see (donate, buy, all)
          response = (viewType == 1) ? response.filter((raffle)=>{return raffle.type==1}) : response
          response = (viewType == 2) ? response.filter((raffle)=>{return raffle.type==2}) : response
          setRaffles(response);
        }
        getRaffle()

        async function getUser() {
          let response = await fetch('http://' + data.ipAddress + '/user/query');
          response = await response.json()
          setUsers(response);
        }
        getUser()

        // BACKHANDLING FOR ANDROID BOTTOM NAV
        const backAction = () => {
            Alert.alert("Hold on!", "Are you sure you want to exit the app?", [
              {
                text: "Cancel",
                onPress: () => null,
                style: "cancel"
              },
              { text: "YES", onPress: () => BackHandler.exitApp() }
            ]);
            return true;
          };
          const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
          );
          return () => backHandler.remove();

      }, [viewType])

    // console.log(raffles[0]);
    // console.log(users[0]);

    // ---------------------------------  Search pool and results  --------------------------------------
    const [searchTerm, setSearchTerm] = useState('');
    const USER_KEYS_TO_FILTERS = ['username', 'name', 'email', 'phoneNumber']; // user filters
    const filteredUsers = users.filter(createFilter(searchTerm, USER_KEYS_TO_FILTERS));
    const RAFFLE_KEYS_TO_FILTERS = ['name', 'description']; // user filters
    const filteredRaffles = raffles.filter(createFilter(searchTerm, RAFFLE_KEYS_TO_FILTERS));

    const changeData = (obj) => {
      if (obj==='switch') {
        setDisplayUser(false)
        setButtonStyle(false)
      } else {
        setDisplayUser(true)
        setButtonStyle(true)
      }
      setSearchTerm('');
    };

    // ------------------------------------------------------------------------------------

    return (
        <View style={styles.container}>

            <SearchBar
              platform='ios'
              // lightTheme={true}
              showCancel={true}
              placeholder="Search"
              onChangeText={(term) => { setSearchTerm(term) }}
              value={searchTerm}

              containerStyle={{backgroundColor: 'rgba(0, 0, 0, 0.05)', padding: 15, }}
              inputContainerStyle={{borderRadius: 30, }}
              cancelButtonProps={{color:'rgba(0, 0, 0, 0.5)', }}
            />

            <View style={styles.switch}>
              <View style={ buttonStyle ? styles.childView_1 : styles.childView_2 }>
                <Button
                title="Drawings"
                color='grey'
                onPress={() => changeData('switch')}/>
              </View>

              <View style={ buttonStyle ? styles.childView_2 : styles.childView_1 }>
                <Button
                title="People"
                color='grey'
                onPress={() => changeData('user')}/>
              </View>
            </View>

            <Text style={{fontSize: 18, padding: 17, fontWeight: '700'}}> { searchTerm === '' ? 'Recent' : 'Results' } </Text>

            {displayUser ?
              <ScrollView>
                {filteredUsers.map(map_user => {
                  {/* What&How you want results to display */}
                  return (
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('OtherUser', {user: map_user})}}>
                        { map_user._id == user._id ?
                          <UsernameDisplay username={map_user.username + ' (self)'} profPic={{uri: map_user.profilePicture}} size="large"/>
                                    :
                          <UsernameDisplay username={map_user.username} profPic={{uri: map_user.profilePicture}} size="large"/> }
                    </TouchableOpacity>
                    )
                })}
              </ScrollView>
                    :
                  <ScrollView>
                    {filteredRaffles.map((raffle, index) =>

                        <FlatCard
                            data={raffle}
                            key={index}
                            navigation={navigation}
                        />

                    )}
                  </ScrollView> }

          <BottomNav navigation={navigation} active={'Search'}></BottomNav>
        </View>
    )
}

export default Search;
