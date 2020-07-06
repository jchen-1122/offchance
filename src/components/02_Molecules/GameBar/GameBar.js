import React from 'react'
import { View, Text } from 'react-native'
// import {fonts} from '../../../settings/fonts';

function GameBar({currRound, chancesLeft, wins, numRounds, color}) {
    return (
        <View>
            <View style={{flexDirection: 'row', marginTop: 20}}>
                <Text style={{color: color, fontWeight: '700', fontSize: 50, marginLeft: 45}}>{currRound}</Text>
                <Text style={{color: color, fontWeight: '700', fontSize: 50, marginLeft: 100}}>{chancesLeft}</Text>
                <Text style={{color: color, fontWeight: '700', fontSize: 50, marginLeft: 100}}>{wins}</Text>
            </View>
            <View style={{flexDirection: 'row', marginTop: -5}}>
                <Text style={{color: color, fontWeight: '600', fontSize: 13, marginLeft: 20}}>/ {numRounds} ROUNDS</Text>
                <Text style={{color: color, fontWeight: '600', fontSize: 13, marginLeft: 45}}>CHANCES LEFT</Text>
                <Text style={{color: color, fontWeight: '600', fontSize: 13, marginLeft: 85}}>WINS</Text>
            </View>
        </View>
    )
}

export default GameBar;