import {StyleSheet, Dimensions} from 'react-native';

let imageSize = 14;

const styles = StyleSheet.create({
    container: {
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center'
    },
    image: {
        height: imageSize,
        width: imageSize,
        borderRadius: imageSize
    },
    image_overlapped: {
        marginRight: -8,
    }
})

export default styles;