import {StyleSheet, Dimensions} from 'react-native';

const styles = StyleSheet.create({
    profilePic: {
        width: 120, 
        height: 120,
        borderRadius: 120 / 2, 
        alignSelf: 'center',
        marginTop: 10
    },
    header_name: {
        fontSize: 25, 
        textAlign: 'center', 
        fontWeight: '700', 
        marginTop: 15
    },
    header_username: {
        fontSize: 20, 
        textAlign: 'center', 
        fontWeight: '300', 
        marginTop: 5, 
        marginBottom: 20
    },
    followButton: {
        alignItems: 'center',
        marginTop: "5%"
    }
})

export {styles};