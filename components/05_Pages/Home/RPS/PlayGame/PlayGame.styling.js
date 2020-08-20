import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../../../../settings/all_settings';

const styles = StyleSheet.create({
    timer: {
        textAlign: 'center',
        fontWeight: '700',
        fontSize: 50,
    },
    button: {
        alignItems: 'center'
    },

    // rock paper scissors options
    rpsView: {
        flex: 1,
    },
    rpsView__row: {
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    rps__choice: {
        width: Dimensions.get('window').width * 0.45,
        height: Dimensions.get('window').height * 0.2,
        margin: Dimensions.get('window').width * 0.025,
        marginBottom: 0,
        resizeMode: 'contain'
    },
    label: {
        fontSize: 16,
        textAlign: 'center',
        // marginBottom: Dimensions.get('window').width * 0.025,
    },
    label_active: {
        color: colors.highlightColor
    },

    optionsContainer: {
        height: '90%',
        width: Dimensions.get('window').width,
        justifyContent: 'center',
        alignItems: 'center'
    },
    option: {
        height: Dimensions.get('window').height * 0.16,
        width: Dimensions.get('window').width * 0.69,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        backgroundColor: 'white',
        marginVertical: '2%',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    option__image: {
        height: '90%',
        width: '50%',
        resizeMode: 'contain'
    },

})

export { styles };