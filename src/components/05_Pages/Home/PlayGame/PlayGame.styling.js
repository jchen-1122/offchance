import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    timer: {
        textAlign:'center', 
        fontWeight: '700', 
        fontSize: 70
    },
    rpsView: {
        flexDirection: 'row',
        marginTop: -80
    },
    rock: {
        width:100, 
        height:100, 
        resizeMode: 'contain', 
        marginLeft: 25
    },
    paper: {
        width:100, 
        height:100, 
        resizeMode: 'contain', 
        marginLeft: 30
    },
    button: {
        alignItems: 'center'
    }
})

export {styles};