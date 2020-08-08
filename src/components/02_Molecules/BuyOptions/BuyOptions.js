import React from 'react'
import { Text, View, ShadowPropTypesIOS } from 'react-native'
import BlockButton from '../../01_Atoms/Buttons/BlockButton/BlockButton'

export default function BuyOptions(props) {
    return (
        <View style={{flex: 0, alignItems: 'center'}}>
            {(Object.keys(props.options).map(element => {
                return (
                    <BlockButton
                        title={"$" + element + ' for ' + props.options[element].chances + " chances"}
                        color={element == 10 ? "light" : "secondary"}
                        bannerTitle={element == 10 ? 'BEST DEAL' : null}
                        onPress={() => props.setBuyOption(element)}
                        selected={props.buyOption == element}/>
                )
            })
            )}
        </View>
    )
}