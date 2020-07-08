import {StyleSheet, Dimensions} from 'react-native';

let imageSize = 20;

const styles = StyleSheet.create({
    container: {
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
        width: Dimensions.get('window').width * 0.6
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