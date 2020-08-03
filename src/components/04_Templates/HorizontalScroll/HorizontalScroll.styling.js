import { StyleSheet, Dimensions } from 'react-native'

const styles = StyleSheet.create({
    HorizontalScroll: {
        height: Dimensions.get('window').height * 0.45,
        width: Dimensions.get('window').width,
        backgroundColor: 'black',
        padding: '5%'
    },
    title: {
        color: 'white',
         marginBottom: '5%'
    }
})

export default styles
