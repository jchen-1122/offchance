import { StyleSheet, Dimensions } from 'react-native'

const styles = StyleSheet.create({
    host_description: {
        color: 'gray'
    },
    host_text: {
        marginTop: 5, 
        marginBottom: 15
    },
    host_license: {
        margin: Dimensions.get('window').width * 0.05,
        width: Dimensions.get('window').width * 0.8,
        height: Dimensions.get('window').width * 0.6
    },
    bottom_margin: {
        marginBottom: Dimensions.get('window').width * 0.05
    }
})

export default styles
