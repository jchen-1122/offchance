import React, { useContext } from 'react'
import { View, Text } from 'react-native'
import { colors, fonts, utilities } from '../../../../../settings/all_settings';
import BottomNav from '../../../../02_Molecules/BottomNav/BottomNav';
import BlockButton from '../../../../01_Atoms/Buttons/BlockButton/BlockButton'
import UsernameDisplay from '../../../../01_Atoms/UsernameDisplay/UsernameDisplay';
import GlobalState from '../../../../globalState'

function EndGame(props) {
    const { user, setUser } = useContext(GlobalState)

    return (
        <View style={utilities.container}>
            <View style={{ alignItems: 'center', height: '90%', paddingVertical: '5%', justifyContent: 'space-between' }}>
                <View style={{ alignItems: 'center' }}>
                    <Text style={fonts.h2}>You</Text>
                    <UsernameDisplay size="game" username={user.username} profPic={{ uri: user.profilePicture }} />
                </View>

                <View style={[utilities.flexCenter, { flex: 0, width: '100%' }]}>
                    <Text style={fonts.h1}>THANKS FOR PLAYING!</Text>
                    <Text style={fonts.p}>You've won {Math.floor(props.wins / 2)} bonus chances!</Text>
                    <Text style={fonts.p}>Buy more chances for another chance to play!</Text>
                    <BlockButton
                        title="EXIT"
                        color="secondary"
                        size="short"
                        onPress={() => props.navigation.navigate('Home')} />
                </View>

                <View style={{ alignItems: 'center' }}>
                    <Text style={fonts.h2}>Challenger</Text>
                    <UsernameDisplay size="game" username={props.opponent.username} profPic={{ uri: props.opponent.profilePicture }} />
                </View>
            </View>
            <BottomNav navigation={props.navigation} active={'Likes'} />
        </View>
    )
}

export default EndGame;