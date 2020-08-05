import { StyleSheet, Dimensions } from 'react-native'

const styles = StyleSheet.create({
    HorizontalScroll_dark: {
        height: Dimensions.get('window').height * 0.45,
        width: Dimensions.get('window').width,
        backgroundColor: 'black',
        padding: '5%'
    },
    HorizontalScroll_light: {
        height: Dimensions.get('window').height * 0.5,
        width: Dimensions.get('window').width,
        backgroundColor: 'transparent',
        padding: '5%'
    },
    title_dark: {
        color: 'white',
        marginBottom: '5%'
    },
    title_light: {
        color: 'black',
        marginBottom: '5%'
    },

    titleHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
})

export default styles
