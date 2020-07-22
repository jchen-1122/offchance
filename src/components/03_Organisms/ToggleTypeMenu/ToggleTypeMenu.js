import React, { useState, useContext } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { colors } from '../../../settings/all_settings';
import { styles } from "./ToggleTypeMenu.styling";
import { Icon } from 'react-native-elements'
import BlockButton from '../../01_Atoms/Buttons/BlockButton/BlockButton'

function ToggleTypeMenu(props) {
    const activeMap = ['all', 'donate', 'buy']
    const [activeItem, setActiveItem] = useState(activeMap[props.viewType])

    return (
        <View style={styles.ToggleTypeMenu}>

            {/* DONATE TO ENTER DRAWINGS */}
            <TouchableOpacity style={styles.ToggleTypeMenu__item} 
                onPress={()=>{
                    setActiveItem('donate')
                    props.setViewType(1)
                    props.setToggleMenuOpen(false)
                }}>
                <Icon
                    name='gift-outline'
                    type='material-community'
                    color={activeItem == 'donate' ? 'white' : colors.gray}
                    size={25} />
                <Text
                    style={[styles.ToggleTypeMenu__label,
                    activeItem == 'donate' ? styles.ToggleTypeMenu__labelActive : '']}>
                    DONATE TO ENTER DRAWINGS
                    </Text>
            </TouchableOpacity>

            {/* ENTER TO BUY DRAWINGS */}
            <TouchableOpacity style={styles.ToggleTypeMenu__item} 
                onPress={()=>{
                    setActiveItem('buy')
                    props.setViewType(2)
                    props.setToggleMenuOpen(false)
                }}>
                <Icon
                    name='currency-usd'
                    type='material-community'
                    color={activeItem == 'buy' ? 'white' : colors.gray}
                    size={25} />
                <Text
                    style={[styles.ToggleTypeMenu__label,
                    activeItem == 'buy' ? styles.ToggleTypeMenu__labelActive : '']}>
                    ENTER TO BUY DRAWINGS
                    </Text>
            </TouchableOpacity>

            {/* ALL DRAWINGS */}
            <TouchableOpacity style={styles.ToggleTypeMenu__item} 
                onPress={()=>{
                    setActiveItem('all')
                    props.setViewType(0)
                    props.setToggleMenuOpen(false)
                }}>
                <Icon
                    name='check-circle-outline'
                    type='material-community'
                    color={activeItem == 'all' ? 'white' : colors.gray}
                    size={25} />
                <Text
                    style={[styles.ToggleTypeMenu__label,
                    activeItem == 'all' ? styles.ToggleTypeMenu__labelActive : '']}>
                    ALL DRAWINGS
                    </Text>
            </TouchableOpacity>

            <View style={{alignItems: 'center'}}>
                <BlockButton title='CLOSE' color="tertiary" onPress={()=>props.setToggleMenuOpen(false)}/>
            </View>
        </View>

    )
}

export default ToggleTypeMenu;
