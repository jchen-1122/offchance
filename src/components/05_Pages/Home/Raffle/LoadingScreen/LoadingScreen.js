import React, {useEffect, useContext, useState} from 'react'
import {Text, View} from 'react-native'
import Social from '../../../../03_Organisms/Chat/Chat'
import GlobalState from '../../../../globalState'

export default function LoadingScreen({navigation, route}) {
    const {user, setUser} = useContext(GlobalState)

    // change to raffle startime + 90 - currentTime (number just for testing rn)
    const [localTime, localSetTime] = useState(90)

    useEffect(() => {
        let interval = null
        if (localTime > 0) {
            interval = setInterval(() => {
                localSetTime(localTime => localTime - 1)
            }, 1000)
        }
        return () => {
            clearInterval(interval)
        }
    }, [localTime])

    return (
        <View>
            <Text>{localTime}</Text>
            <Social currUser={user}></Social>
        </View>
    )
}