import {StyleSheet} from 'react-native';
import {MD2Colors} from 'react-native-paper';

export const styles = StyleSheet.create({
  container: {},

  cardContent: {
    height: 350,
    // flex: 1,
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
