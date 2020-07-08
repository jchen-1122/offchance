import React from 'react'
import { Text, View, ShadowPropTypesIOS} from 'react-native'
import BlockButton from '../../01_Atoms/Buttons/BlockButton/BlockButton'

export default function BuyOptions(props) {
    return (
        <View>
            <Text style={{marginBottom: -10}}>Bonus: {props.bonusChances} chances for the first {props.bonusLimit} donations</Text>
            <View style={{marginLeft: -15}}>
                <BlockButton
                title={"$" + props.bonusAmount + '\n' + props.bonusChances + " chances"}
                color="highlight"
                size="short"></BlockButton>
            </View>
            <View style={{marginLeft: -15, flexDirection: 'row'}}>
                {(Object.keys(props.options).map(element => {
                    return (
                        <BlockButton
                        title={"$" + element + '\n' + props.options[element].chances + " chances"}
                        color="highlight"
                        size="shortSmall"></BlockButton>
                    )})
                )}
            </View>
        </View>
    )
}