import {StyleSheet, Dimensions} from 'react-native';


const styles = StyleSheet.create({
    slidingSheet__header: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },

    slidingSheet__content: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'stretch',
    },
    
    slidingSheet__hiding_content: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex_end',
    },
})

export default styles;
