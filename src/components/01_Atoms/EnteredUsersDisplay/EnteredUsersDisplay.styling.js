import {StyleSheet, Dimensions} from 'react-native';

let imageSize = 14;

const styles = StyleSheet.create({
    EnteredUsersDisplay: {
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center'
    },
    EnteredUsersDisplay__image: {
        height: imageSize,
        width: imageSize,
        borderRadius: imageSize
    },
    EnteredUsersDisplay__image_overlapped: {
        marginRight: -8,
    },
    EnteredUsersDisplay__image_single: { 
        height: 20, 
        width: 20, 
        marginRight: 5 
    }
})

export default styles;