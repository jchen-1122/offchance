import { StyleSheet, Dimensions } from 'react-native'

var progLength = Dimensions.get('window').width * 0.6;

const styles = StyleSheet.create({
    bar: {
        alignSelf: 'center'
    },
    view: {
        flexDirection: 'row',
        marginTop: 7
    },
    raised: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    goal: {
        paddingTop: 5
    },
    progressBar: {
        width: progLength
    }
})

export default styles