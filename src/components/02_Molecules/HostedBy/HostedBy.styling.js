import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    hostedby: {
        flexDirection:'row', 
        alignItems:'center', 
        justifyContent: 'space-between', 
        height: 25
    },
    hostedby__profile: {
        flex: 0, 
        flexDirection:'row', 
        alignItems: 'center'
    },
    hostedby__image: {
        width:20, 
        height: 20, 
        borderRadius: 20 / 2,
        marginRight: 5
    }
})

export default styles