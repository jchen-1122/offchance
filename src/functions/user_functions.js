import { Platform } from 'react-native';
import { StyleSheet, Dimensions } from 'react-native';

// returns true if someone is logged in, false if not
export function user_logged_in(user) {
  if (Object.keys(user).length === 0 && user.constructor === Object) {
    return false
  }
  return true
}

// checks if devide is an iPhone 10
export function isIphoneX() {
  const dim = Dimensions.get('window');
  return (
    Platform.OS === 'ios' &&
    (isIPhoneXSize(dim) || isIPhoneXrSize(dim))
  );
}
export function isIPhoneXSize(dim) {
  return dim.height == 812 || dim.width == 812;
}
export function isIPhoneXrSize(dim) {
  return dim.height == 896 || dim.width == 896;
}