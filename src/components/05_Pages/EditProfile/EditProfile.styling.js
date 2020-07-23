import {StyleSheet, Dimensions} from 'react-native';

const styles = StyleSheet.create({
    profilePic: {
        width: Dimensions.get('window').width * 0.3, 
        height: Dimensions.get('window').width * 0.3,
        borderRadius: Dimensions.get('window').width * 0.3 / 2, 
        alignSelf: 'center',
        marginTop: Dimensions.get('window').height * 0.015,
        marginBottom: Dimensions.get('window').height * 0.015
    },
    description: {
        fontWeight: '300', 
        fontSize: 17, 
        marginBottom: Dimensions.get('window').height * 0.03
    },
    inputs: {
        marginLeft: Dimensions.get('window').width * 0.08
    }

})

export {styles};