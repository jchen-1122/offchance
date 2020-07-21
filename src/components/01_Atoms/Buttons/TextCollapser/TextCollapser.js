// Based on: https://www.npmjs.com/package/accordion-collapse-react-native

import React, {useState} from 'react';
import { Text, View, Image } from 'react-native';
import {utilities, fonts, colors} from '../../../../settings/all_settings';
import {styles} from "./TextCollapser.styling";
import { Collapse, CollapseHeader, CollapseBody } from "accordion-collapse-react-native";
import { Thumbnail, List, ListItem, Separator } from 'native-base';

function TextCollapser(props){

    let buttonStyle = [styles.TextCollapser_primary];
    let buttonHeaderStyle=[styles.TextCollapser__header_primary];
    let buttonBodyStyle=[styles.TextCollapser__body_primary];

    let headerTextStyle=[styles.TextCollapser__header_text_primary];
    let bodyTextStyle=[styles.TextCollapser__body_text_primary];

    const down_arrow = require('../../../../../assets/images/down-arrow-icon.png');
    const up_arrow = require('../../../../../assets/images/up-arrow-icon.png');

    const [expanded, setExpanded] = useState(false);

    // //
    // switch(props.){
    //     case "":
    //         buttonStyle.push(styles.TextCollapser__);
    //         break;
    // }
    //
    // //
    // switch(props.){
    //     case "":
    //         buttonHeaderStyle.push(styles.TextCollapser__);
    //         break;
    //
    // //
    // switch(props.){
    //     case "":
    //         buttonBodyStyle.push(styles.TextCollapser__);
    //         break;
    // }

    return (
          <View>
              {/* black lines above and below the expandable box */}
              <Collapse onToggle={() => setExpanded(!expanded)}>

                  {/* Expandable Title Part */}
                  <CollapseHeader style={buttonHeaderStyle}>

                      <View style={{width:'80%'}}>
                          <Text style={[fonts.p, headerTextStyle]}>{props.headText}</Text>
                      </View>

                      <View style={{width:'15%',alignItems:'flex-end'}}>
                          <Image source={(expanded) ? up_arrow : down_arrow} />
                      </View>

                  </CollapseHeader>
                  {/* Title Part Ends */}

                  {/* Expandable Text Part */}
                  <CollapseBody style={buttonBodyStyle}>

                      <Text style={[fonts.p, bodyTextStyle]}>{props.bodyText}</Text>

                  </CollapseBody>
                  {/* Expandable Text Part Ends */}

              </Collapse>
              {/* This object ends */}
         </View>
    )
}

export default TextCollapser;
