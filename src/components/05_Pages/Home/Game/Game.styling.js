import {StyleSheet, Dimensions} from 'react-native';
import {colors} from '../../../../settings/all_settings';

const styles = StyleSheet.create({
    choice: {
        width: Dimensions.get('window').width * 0.8,
        height:Dimensions.get('window').height * 0.2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        backgroundColor: '#DDDDDD'
    },
    image: {
        width: '50%',
        height: '75%', 
        resizeMode: 'contain', 
        // marginTop: 40, 
        // marginLeft: 120, 
        // marginBottom: 40
    },
    label: {
        fontSize: 18,
        textAlign: 'center'
    },
    message: {
        textAlign:'center', 
        fontSize:16, 
        fontWeight:'700', 
        marginVertical: 15
    },
    message_tie: {
        color: 'purple'
    },
    message_win: {
        color: 'green'
    },
    message_lose: {
        color: 'red'
    },
    text_light: {
        fontWeight: '600',
        fontSize: 9,
        textAlign: 'center'
    },
    nextButton: {
        position: 'absolute',
        bottom: Dimensions.get('window').height * 0.03,
        right: Dimensions.get('window').width * 0.13
    },
    GameBar__stat: {
        flexDirection: 'column',
        justifyContent: 'flex-start', 
        padding: 15,
        paddingHorizontal: '10%'
    },

})

export {styles};