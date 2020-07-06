import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    compChoice: {
        width: 180, 
        height: 180, 
        resizeMode: 'contain', 
        marginTop: 40, 
        marginLeft: 120, 
        marginBottom: 40
    },
    playerChoice: {
        width: 180, 
        height: 180, 
        resizeMode: 'contain', 
        marginTop: 30, 
        marginLeft: 120
    },
    message: {
        textAlign:'center', 
        fontSize:20, 
        fontWeight:'700', 
        color: 'green'
    }
})

export {styles};