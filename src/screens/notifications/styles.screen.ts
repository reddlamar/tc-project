import {StyleSheet} from 'react-native';
import {MD2Colors} from 'react-native-paper';

export const styles = StyleSheet.create({
  container: {flex: 1},
  item: {
    backgroundColor: MD2Colors.red700,
    margin: 9,
    padding: 9,
    borderRadius: 9,
  },
  flatList: {rowGap: 6},
  createdAt: {alignSelf: 'flex-end'},
});
