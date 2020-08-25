import {StyleSheet, Dimensions} from 'react-native';

const pictureSize = Dimensions.get('window').width * 0.3
const styles = StyleSheet.create({
  EditProfile__picture: {
        width: pictureSize,
        height: pictureSize,
        borderRadius: pictureSize,
        alignSelf: 'center',
        marginTop: pictureSize / 8,
        marginBottom: pictureSize / 8
    },
})

export {styles};
