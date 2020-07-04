import React from 'react'
import { View, Text, Footer, FooterTab, Button, Icon } from 'native-base';
import { styles } from './GridView.styling';
import { fonts } from '../../../settings/all_settings';
import GridCard from '../../03_Organisms/GridCard/GridCard';

function GridView(props) {
    return (
      <View style={{backgroundColor: props.bgColor}}>
            <Text style={[fonts.h1, {textAlign: 'center'}]}>{props.title}</Text>
            <GridCard />
            {/* <UsernameDisplay /> */}
      </View>
    );
}

export default GridView;