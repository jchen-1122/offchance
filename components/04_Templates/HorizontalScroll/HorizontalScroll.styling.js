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

    // different style titles for the horizontal card
    title: {
        marginBottom: '5%',
        fontWeight: 'normal',
    },
    title_dark: {
        color: 'white',
    },
    title_light: {
        color: 'black',
    },

    titleHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
})

export default styles
