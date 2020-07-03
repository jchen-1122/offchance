import React from 'react'
import { Text, View, Image } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import styles from './Card.styles'
import { ScrollView } from 'react-native-gesture-handler';
import ProgressBar from '../../02_Molecules/ProgressBar/ProgressBar';
import LikeButton from '../../01_Atoms/Buttons/LikeButton/LikeButton';
import {colors, fonts, utilities} from '../../../settings/all_settings';

function Card ({ selected, onPress, text, imageURI}) {
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
              <View style={styles.itemDesc}>
                <Image style={styles.image} source={imageURI}/>
                <Text>{text}</Text>
                <ProgressBar progress={230 / 500} color='orange' raised={230} goal={500} ></ProgressBar>
              </View>
          </ScrollView>
    )
}

export default Card