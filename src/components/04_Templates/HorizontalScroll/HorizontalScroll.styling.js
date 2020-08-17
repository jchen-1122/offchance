import { StyleSheet, Dimensions } from 'react-native'

const styles = StyleSheet.create({
    HorizontalScroll_dark: {
        height: 330,
        width: Dimensions.get('window').width,
        backgroundColor: 'black',
        padding: '5%',
        paddingBottom: '10%'
    },
    HorizontalScroll_light: {
        height: 325,
        width: Dimensions.get('window').width,
        backgroundColor: 'transparent',
        padding: '5%',
        // paddingBottom: '10%'
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
