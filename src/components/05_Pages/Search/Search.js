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
import ListView from '../../04_Templates/ListView/ListView';
import UsernameDisplay from '../../01_Atoms/UsernameDisplay/UsernameDisplay';
import GlobalState from '../../globalState';
import {user_logged_in} from '../../../functions/user_functions'

import emails from './emails'

function Search({navigation}) {

    const data = require('../../IP_ADDRESS.json');
    const {user, setUser} = useContext(GlobalState)
    const [raffles, setRaffles] = useState([]);
    const [users, setUsers] = useState([]);
    const [recentRaffles, setRecentRaffles] = useState([]);
    const [recentUsers, setRecentUsers] = useState([]);
    const [displayUser, setDisplayUser] = useState(false);
    const [recent, setRecent] = useState(user.recentRaffles.length > 0);

    const { width, height } = Dimensions.get('window');
    const recentLimit = 10;

    // for toggling types of cards (0=all, 1=donate, 2=buy)
    const [viewType, setViewType ] = useState(0)
    const [toggleMenuOpen, setToggleMenuOpen] = useState(false)

    // sort entered users so the people you're following show up at the front
    const sortUsers = (rua) => {
        if (!user_logged_in(user)) {
            return rua
        }
        var entered = []
        for (let i = 0; i < rua.length; i++) {
            let enteredUser = rua[i]
            // not showing yourself in the search
            if (enteredUser.username === user.username) {
              continue;
            }
            // if you're following them, add to the top
            if (user.following.includes(enteredUser.userID)) {
                entered.unshift(enteredUser)
            }
            // if you're not following them, push to back
            else {
                entered.push(enteredUser)
            }
        }
        return entered
    }

    const updateRecent = (term) => {
      setSearchTerm(term); 
      // console.log(user.recentRaffles);
      // console.log("searchTerm: ", term);
      if (term === '') {
        setRecent(true);
        async function getRecentRaffle(_id) {
          let response = await fetch('http://'+data.ipAddress+'/raffle/id/'+_id)
          response = await response.json()          
          let identical = false                      
          // console.log("response: ", response);
          for (let i = 0; i < recentRaffles.length; i++) {
            if (recentRaffles[i]._id == response._id) {
              identical = true;
            }
          }
          if (!identical) {
            recentRaffles.unshift(response);
          }   
        }
        for (let i = 0; i < recentLimit; i++) {
          getRecentRaffle(user.recentRaffles[user.recentRaffles.length-1-i]);
        }
      } else {
        setRecent(false);
      }
    }

    // Get all raffles & users from db
    React.useEffect(() => {

        async function getRaffle() {
          let response = await fetch('http://'+data.ipAddress+'/raffle/all')
          response = await response.json()
          setRaffles(response);
        }
        getRaffle()

        async function getUser() {
          let response = await fetch('http://' + data.ipAddress + '/user/query');
          response = await response.json()
          setUsers(response);
        }
        getUser()

        async function getRecentRaffle(_id) {
          let response = await fetch('http://'+data.ipAddress+'/raffle/id/'+_id)
          response = await response.json()
          // console.log("response: ", response);
          if (!recentRaffles.includes(response)) {
            recentRaffles.unshift(response);
          } 
        }
        for (let i = 0; i < recentLimit; i++) {
          getRecentRaffle(user.recentRaffles[user.recentRaffles.length-1-i]);
        }

        // console.log("recent raffles: ", recentRaffles);

        async function getRecentUser() {
          let response = await fetch('http://' + data.ipAddress + '/user/query');
          response = await response.json()
          setRecentUsers(response);
        }
        getRecentUser()

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
    const USER_KEYS_TO_FILTERS = ['username', ]; // user filters
    const filteredUsers = users.filter(createFilter(searchTerm, USER_KEYS_TO_FILTERS));
    const RAFFLE_KEYS_TO_FILTERS = ['name', 'description']; // user filters
    const filteredRaffles = raffles.filter(createFilter(searchTerm, RAFFLE_KEYS_TO_FILTERS));

    const changeData = (obj) => {
      if (obj==='switch') {
        setDisplayUser(false)
      } else {
        setDisplayUser(true)
      }
      setSearchTerm('');
    };

    // const recentViewed = user.recentRaffles;
    // console.log('recent raffles: ', recentViewed)
    // console.log('our recent: ', recentRaffles)
    // console.log('filtered raffles: ', filteredRaffles[0])

    // ------------------------------------------------------------------------------------

    {/* TODO: Add a like button at the top right corner on raffle */}
    return (
        <View style={styles.container}>

            <SearchBar
              platform='ios'
              // lightTheme={true}
              showCancel={true}
              placeholder="Search"
              onChangeText={(term) => {  updateRecent(term); }}
              value={searchTerm}

              containerStyle={{backgroundColor: 'rgba(0, 0, 0, 0.05)', padding: 12, }}
              inputContainerStyle={{borderRadius: 15, height: height * 0.05, backgroundColor: 'white', }}
              cancelButtonProps={{color:'rgba(0, 0, 0, 0.5)', }}
            />

            <View style={styles.switch}>
                <TouchableOpacity style={[styles.switch__item,(!displayUser) ? styles.switch__item_active : null]} onPress={() => changeData('switch')}>
                  <Text>DRAWINGS</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.switch__item,(displayUser) ? styles.switch__item_active : null]} onPress={() => changeData('user')}>
                  <Text>PEOPLE</Text>
                </TouchableOpacity>
            </View>

            <Text style={{fontSize: 18, padding: height*0.02, marginTop: -10, fontWeight: '700'}}> { searchTerm === '' ? 'Recent' : 'Results' } </Text>

            {/* TODO: for raffle, bigger avatar, adjust margin, add like button; for users, add follow button */}
            {displayUser ?
              // User Search
              <ScrollView>
                <ListView users={sortUsers(filteredUsers)} navigation={navigation} currUser={user} setUser={setUser}/>
              </ScrollView>
                    :
              
              <ScrollView>
                  {/* https://stackoverflow.com/questions/34689970/flex-react-native-how-to-have-content-break-to-next-line-with-flex-when-conte */}
                  <View style={{flexDirection:'row', alignItems: 'flex-start', flexWrap: 'wrap'}}>
                  { recent ? 
                  recentRaffles.map((raffle, index) =>
                      <FlatCard
                          data={raffle}
                          key={index}
                          navigation={navigation}
                          currUserG={user}
                          setUserG={setUser}
                      />) 
                      : 
                  filteredRaffles.map((raffle, index) => 
                      <FlatCard
                      data={raffle}
                      key={index}
                      navigation={navigation}
                      currUserG={user}
                      setUserG={setUser}
                      />) 
                  }
                </View>
              </ScrollView>
            }
          
          <BottomNav navigation={navigation} active={'Search'}></BottomNav>
        </View>
    )
}

export default Search;
