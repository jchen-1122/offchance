import React, {useState} from 'react'
import { View, ScrollView, Text, Image } from 'react-native'
import BottomNav from '../../../02_Molecules/BottomNav/BottomNav'
import {utilities, fonts, colors} from '../../../../settings/all_settings';
import TextCollapser from '../../../01_Atoms/Buttons/TextCollapser/TextCollapser';

export default function FAQ({navigation}) {
    return (
        <View style={utilities.container}>
            <ScrollView>
                <TextCollapser
                headText="How do Off Chance drawings work?"
                bodyText="Off Chance hosts limited capacity drawings for coveted sneakers and streetwear. We give consumers the opportunity to donate small amounts of money for entries into drawings for a fair chance to win products. Raffles have a set donation goal price to ensure the cost of the product is covered, once it is reached the drawing timer begins and then a winner is chosen at random."
                 />

               <TextCollapser
               headText="Is the merchandise authentic?"
               bodyText="All merchandise is guaranteed authentic or we will pay 2x the resale value of the item won."
                />

                <TextCollapser
                headText="How do I participate in a drawing?"
                bodyText="You may enter any active drawing by selecting and making a donation. You may enter as many times as you'd like."
                 />

               <TextCollapser
               headText="What happens if I win? "
               bodyText="We will contact you for your mailing address and coordinate shipping with you for immediate delivery."
                />

                <TextCollapser
                headText="Are there any restrictions to participate in a drawing?"
                bodyText="You must be at least 13 years of age to enter and be in a qualified country to participate. please refer to our terms for details www.offchance.com/terms."
                 />

               <TextCollapser
               headText="How many times can I enter a drawing? "
               bodyText="You may enter as many times as you'd like and the total number of entries will depend on the donation amount."
                />

                <TextCollapser
                headText="How frequently do drawings happen?"
                bodyText="Drawings will be added based on demand for specific products, if a product drawing ends quickly you can expect another one to go live shortly after."
                 />

               <TextCollapser
               headText="How does it work if you don't have my size? "
               bodyText="You may select one of the sizes available in stock. If you win, feel free to trade with a friend, list on StockX or similar sites to acquire your preferred size."
                />

                <TextCollapser
                headText="What's your return policy?"
                bodyText="We don't offer returns on prizes won, sorry."
                 />

               <TextCollapser
               headText="Where do you ship? "
               bodyText="Worldwide, unless otherwise specified in drawing. We will cover all shipping costs."
                />

                <TextCollapser
                headText="Where do you get all the merchandise?"
                bodyText="Off Chance sources product from trusted resellers, consignment and retail partners. We've also been purchasing or recieving gifted mechandise over the last 10 years directly from brands."
                 />
           </ScrollView>
           <BottomNav navigation={navigation} active={'Account'}></BottomNav>
        </View>
    )
}
