// Based on: https://www.npmjs.com/package/accordion-collapse-react-native

import React, {useState} from 'react';
import { Text, View, Image } from 'react-native';
import {utilities, fonts, colors} from '../../../../settings/all_settings';
import {styles} from "./TextCollapser.styling";
import { Collapse, CollapseHeader, CollapseBody } from "accordion-collapse-react-native";
import { Thumbnail, List, ListItem, Separator } from 'native-base';
import {Icon} from 'react-native-elements'

function TextCollapser(props){
    const [expanded, setExpanded] = useState(false);

    return (
          <View>
              {/* black lines above and below the expandable box */}
              <Collapse onToggle={() => setExpanded(!expanded)}>

                  {/* Expandable Title Part */}
                  <CollapseHeader style={styles.FAQ__header}>
                      <View style={{width:'80%'}}>
                          <Text style={fonts.h3}>{props.headText}</Text>
                      </View>
                      <View style={{width:'20%', alignItems:'flex-end'}}>
                          <Icon name={expanded ? 'chevron-up' : 'chevron-down'} type="material-community"size={25}/>
                      </View>
                  </CollapseHeader>
                  {/* Title Part Ends */}

                  {/* Expandable Text Part */}
                  <CollapseBody>
                      <Text style={[fonts.p, styles.FAQ__body]}>{props.bodyText}</Text>
                  </CollapseBody>
                  {/* Expandable Text Part Ends */}

              </Collapse>
              {/* This object ends */}
         </View>
    )
}

export default TextCollapser;
