import {StyleSheet} from 'react-native';
import {MD2Colors} from 'react-native-paper';

export const styles = StyleSheet.create({
  container: {flex: 1},
  cardContainer: {flex: 1, height: '100%', borderWidth: 1, margin: 12},
  cardContent: {
    height: 600,
    borderWidth: 1,
    backgroundColor: MD2Colors.grey100,
    margin: 9,
  },
  cardActions: {
    height: 100,
    width: '100%',
    justifyContent: 'flex-end',
  },
  title: {fontSize: 21, fontWeight: 'bold'},
});
