import {StyleSheet, Dimensions} from 'react-native';
import {colors} from '../../../../settings/all_settings';


const styles = StyleSheet.create({
    buttonContainer: {
        width: '95%', 
        marginLeft: '5%', 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between'
    },
    dropdownContainer: {
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        width: '90%'
    },
    sizeCarouselContainer: {
        height: 75, 
        width: Dimensions.get('window').width*0.9
    }

})

export {styles};