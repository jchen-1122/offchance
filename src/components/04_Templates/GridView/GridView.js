import React from 'react'
import { View, Text, Footer, FooterTab, Button, Icon } from 'native-base';
import { fonts } from '../../../settings/all_settings';
import styles from './GridView.styling';
import GridCard from '../../03_Organisms/GridCard/GridCard';

function GridView(props) {
    return (
      <View style={{backgroundColor: props.bgColor}}>
            <Text style={[fonts.h1, {textAlign: 'center'}]}>{props.title}</Text>
            <View style={styles.GridView__row}>
              <GridCard title="Air Jordan 1 Retro High OG ‘Court Purple 2.0’" navigation={props.navigation}/>
              <GridCard title="Air Jordan 1 Retro High OG ‘Court Purple 2.0’" navigation={props.navigation}/>
            </View>
            <View style={styles.GridView__row}>
              <GridCard title="Air Jordan 1 Retro High OG ‘Court Purple 2.0’" navigation={props.navigation}/>
              <GridCard title="Air Jordan 1 Retro High OG ‘Court Purple 2.0’" navigation={props.navigation}/>
            </View>

      </View>
    );
}

export default GridView;