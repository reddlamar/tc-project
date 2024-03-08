import {StyleSheet} from 'react-native';
import {MD2Colors} from 'react-native-paper';

export const styles = StyleSheet.create({
  card: {margin: 12},
  cover: {margin: 12, borderWidth: 3},
  details: {marginBottom: 15},
  content: {borderWidth: 1, margin: 9, padding: 3, borderRadius: 9},
  extraDetail: {justifyContent: 'space-between'},
  price: {fontWeight: '800', marginBottom: 9, fontSize: 24},
  text: {fontSize: 18, fontWeight: '500'},
  rating: {color: MD2Colors.red600},
  quantity: {color: MD2Colors.blueGrey600},
  icon: {backgroundColor: MD2Colors.red700},
});
