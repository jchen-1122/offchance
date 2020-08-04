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
    const [displayUser, setDisplayUser] = useState(false);
    const [buttonStyle, setButtonStyle] = useState(false);

    const { width, height } = Dimensions.get('window');

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

    // Get all raffles & users from db
    React.useEffect(() => {
        async function getRaffle() {
          let response = await fetch('http://'+data.ipAddress+':3000/raffle/all')
          response = await response.json()
          // filter raffles based on what type they want to see (donate, buy, all)
          response = (viewType == 1) ? response.filter((raffle)=>{return raffle.type==1}) : response
          response = (viewType == 2) ? response.filter((raffle)=>{return raffle.type==2}) : response
          setRaffles(response);
        }
        getRaffle()

        async function getUser() {
          let response = await fetch('http://' + data.ipAddress + ':3000/user/query');
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
    const USER_KEYS_TO_FILTERS = ['username', ]; // user filters
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

              containerStyle={{backgroundColor: 'rgba(0, 0, 0, 0.05)', padding: 12, }}
              inputContainerStyle={{borderRadius: 15, height: height * 0.05, backgroundColor: 'white', }}
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

            <Text style={{fontSize: 18, padding: height*0.02, marginTop: -10, fontWeight: '700'}}> { searchTerm === '' ? 'Recent' : 'Results' } </Text>

            {/* TODO: for raffle, bigger avatar, adjust margin, add like button; for users, add follow button */}
            {displayUser ?
              <ScrollView>
                <ListView users={sortUsers(filteredUsers)} navigation={navigation} currUser={user} setUser={setUser}/>

              </ScrollView>
                    :

                  <ScrollView>

                      {/* https://stackoverflow.com/questions/34689970/flex-react-native-how-to-have-content-break-to-next-line-with-flex-when-conte */}
                      <View style={{flexDirection:'row', alignItems: 'flex-start', flexWrap: 'wrap'}}>
                      {filteredRaffles.map((raffle, index) =>

                          <FlatCard
                              data={raffle}
                              key={index}
                              navigation={navigation}
                          />

                      )}

                    </View>
                  </ScrollView> }

          <BottomNav navigation={navigation} active={'Search'}></BottomNav>
        </View>
    )
}

export default Search;
