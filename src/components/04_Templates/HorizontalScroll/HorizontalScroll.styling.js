import { StyleSheet, Dimensions } from 'react-native'

const containerHeight = 325; 
const containerWidth = Dimensions.get('window').width
const styles = StyleSheet.create({
    HorizontalScroll_dark: {
        height: containerHeight,
        width: containerWidth,
        backgroundColor: 'black',
        padding: '5%',
        paddingBottom: '10%',
    },
    HorizontalScroll_light: {
        height: containerHeight,
        width: containerWidth,
        backgroundColor: 'transparent',
        padding: '5%',
    },

    // different style titles for the horizontal card
    HorizontalScroll__title: {
        marginBottom: '5%',
        fontWeight: 'normal',
        fontSize: 15
    },
    HorizontalScroll__title_dark: {
        color: 'white',
    },
    HorizontalScroll__title_light: {
        color: 'black',
    },

})

export default styles
