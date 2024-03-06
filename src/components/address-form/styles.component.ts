import {StyleSheet} from 'react-native';
import {MD2Colors} from 'react-native-paper';

export const styles = StyleSheet.create({
  buttonContainer: {
    rowGap: 9,
    justifyContent: 'flex-end',
    padding: 3,
  },
  buttonLabel: {fontSize: 21, fontWeight: '600'},
  invalidText: {color: MD2Colors.red500},
});
