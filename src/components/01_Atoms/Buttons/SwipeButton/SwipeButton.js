import React from 'react';
import { Icon } from 'react-native-elements';
import {colors} from '../../../../settings/all_settings';
import SwipeButton from 'rn-swipe-button';

function Swipebutton(props) {
    return (
        <SwipeButton
        title={props.title}
        titleStyles={{color: colors.darkGreen, fontSize: 12}}
        width={300}
        railBackgroundColor={'transparent'}
        railBorderColor={colors.darkgreen}
        shouldResetAfterSuccess
        railFillBackgroundColor={colors.limeGreen}
        railFillBorderColor={'transparent'}
        thumbIconBackgroundColor={'transparent'}
        thumbIconBorderColor={'transparent'}
        thumbIconComponent={() => (<Icon name='arrow-right' type='material-community' color={colors.darkGreen}/>)}
        onSwipeSuccess={props.onSwipeSuccess}
      />
    )
}

export default Swipebutton;
