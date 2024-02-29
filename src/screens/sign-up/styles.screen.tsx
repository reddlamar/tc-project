import {StyleSheet} from 'react-native';
import {MD2Colors} from 'react-native-paper';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    rowGap: 9,
    margin: 12,
    padding: 12,
    borderWidth: 1,
    borderRadius: 12,
  },
  buttonContainer: {
    flexDirection: 'row',
    columnGap: 9,
    marginHorizontal: 6,
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 3,
  },
  invalidText: {color: MD2Colors.red500},
});
