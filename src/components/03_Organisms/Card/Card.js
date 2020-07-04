import React from 'react'
import { Text, View, Image, Dimensions } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import styles from './Card.styles'
import { ScrollView } from 'react-native-gesture-handler';
import ProgressBar from '../../02_Molecules/ProgressBar/ProgressBar';
import LikeButton from '../../01_Atoms/Buttons/LikeButton/LikeButton';
import BlockButton from '../../01_Atoms/Buttons/BlockButton/BlockButton';
import {colors, fonts, utilities} from '../../../settings/all_settings';

function Card ({ navigation, onPress, text, imageURI }) {
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
                <Text>Hosted by somedude</Text>
                <Text>Drawing starts when I feel like it</Text>
                <Text>Entered by @yourbestfriend</Text>
                <ProgressBar progress={230 / 500} color='orange' raised={230} goal={500} width={Dimensions.get('window').width * 0.6} ></ProgressBar>
                <BlockButton 
                    title="Enter Drawing" 
                    color="primary"
                    onPress={() => navigation.navigate('Raffle')}/>
              </View>
          </ScrollView>
    )
}

export default Card