import {StyleSheet} from 'react-native';
import {MD2Colors} from 'react-native-paper';

export const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    top: 4,
    right: 0,
    backgroundColor: MD2Colors.red700,
  },
  signUpButton: {color: MD2Colors.blue900, fontWeight: 'bold'},
  logoutButton: {
    width: 'auto',
    paddingBottom: 18,
    position: 'relative',
    left: 15,
  },
});
