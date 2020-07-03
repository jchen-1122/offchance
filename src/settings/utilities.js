import {StyleSheet} from 'react-native';

const utilities = StyleSheet.create({
    flexCenter: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    flexEndX: {
        flex: 0,
        alignItems: 'flex-end'
    },
    scrollview: {
        flexGrow: 1,
        justifyContent: 'center'
    },
    container: {
        flex: 1,
        justifyContent: 'space-between'
    }

})

export {utilities};