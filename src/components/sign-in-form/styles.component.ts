import {StyleSheet} from 'react-native';
import {MD2Colors} from 'react-native-paper';

export const styles = StyleSheet.create({
  buttonContainer: {
    columnGap: 9,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginHorizontal: 3,
  },
  buttonText: {color: MD2Colors.white, fontSize: 21, padding: 9},
});
