import React from 'react'
import { Text, View, ShadowPropTypesIOS } from 'react-native'
import BlockButton from '../../01_Atoms/Buttons/BlockButton/BlockButton'

export default function BuyOptions(props) {
    return (
        <View>
            {(Object.keys(props.options).map(element => {
                return (
                    <BlockButton
                        title={"$" + element + ' for ' + props.options[element].chances + " chances"}
                        color="highlight"/>
                )
            })
            )}
        </View>
    )
}