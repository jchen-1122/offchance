import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    checkBox: {
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'row',
        width: 300,
        marginTop: 5,
        marginBottom: 5

    },
    checkBox__icon: {
        backgroundColor: 'red'
    },
    checkBox__text: {
        width: 300-25
    }
})

export default styles