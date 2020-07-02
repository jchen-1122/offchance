import React from 'react'
import { TouchableOpacity, Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import styles from './Card.styles'
import { ScrollView } from 'react-native-gesture-handler';
import Tooltip from '../../02_Molecules/Tooltip/Tooltip';
import LikeButton from '../../01_Atoms/Buttons/LikeButton/LikeButton';

function Card ({ selected, onPress, text}) {
    return (
/*        <TouchableOpacity 
            style={[styles.checkBox]} 
            onPress={onPress}>
            <Icon
                style={styles.checkbox__icon}
                size={24}
                color={'#211f30'}
                name={ selected ? 'check-box' : 'check-box-outline-blank'}
            />
            <Text style={styles.checkBox__text}> {text} </Text>
    </TouchableOpacity>
*/
          <ScrollView style={styles.card}>
              <View style={styles.likeButton}>
                <LikeButton />
              </View>
          </ScrollView>
    )
}

export default Card