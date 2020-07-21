import React, {useState} from 'react'
import { View, ScrollView, Text, Image } from 'react-native'
import BottomNav from '../../../02_Molecules/BottomNav/BottomNav'
import {utilities, fonts, colors} from '../../../../settings/all_settings';
import { set } from 'react-native-reanimated';
import { get_user } from '../../../fake_users/stub-users';

import { Collapse, CollapseHeader, CollapseBody } from "accordion-collapse-react-native";
import { Thumbnail, List, ListItem, Separator } from 'native-base';
import TextCollapser from '../../../01_Atoms/Buttons/TextCollapser/TextCollapser';

export default function FAQ({navigation}) {

    return (
            <ScrollView>
                <TextCollapser
                headText="How do Off Chance drawings work?"
                bodyText="Off Chance hosts limited capacity drawings for coveted sneakers and streetwear. We give consumers the opportunity to donate small amounts of money for entries into drawings for a fair chance to win products. Raffles have a set donation goal price to ensure the cost of the product is covered, once it is reached the drawing timer begins and then a winner is chosen at random."
                 />

               <TextCollapser
               headText="Is the merchandise authentic?"
               bodyText="** Hidden Text ** (Only smart people can see)"
                />

                <TextCollapser
                headText="How do I participate in a drawing?"
                bodyText="** Hidden Text ** (Only smart people can see)"
                 />

               <TextCollapser
               headText=" What happens if I win? "
               bodyText="** Hidden Text ** (Only smart people can see)"
                />

                <TextCollapser
                headText="Are there any restrictions to participate in a drawing?"
                bodyText="** Hidden Text ** (Only smart people can see)"
                 />

               <TextCollapser
               headText="How many times can I enter a drawing? "
               bodyText="** Hidden Text ** (Only smart people can see)"
                />

                <TextCollapser
                headText="How frequently do drawings happen?"
                bodyText="** Hidden Text ** (Only smart people can see)"
                 />

               <TextCollapser
               headText="How does it work if you don't have my size? "
               bodyText="** Hidden Text ** (Only smart people can see)"
                />

                <TextCollapser
                headText="What's your return policy?"
                bodyText="** Hidden Text ** (Only smart people can see)"
                 />

               <TextCollapser
               headText="Where do you ship? "
               bodyText="** Hidden Text ** (Only smart people can see)"
                />
           </ScrollView>
    )
}
