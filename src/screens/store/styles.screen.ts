import {StyleSheet} from 'react-native';
import {MD2Colors} from 'react-native-paper';

export const styles = StyleSheet.create({
  price: {fontSize: 21, fontWeight: '700', color: MD2Colors.red700},
  flatList: {margin: 9, backgroundColor: MD2Colors.red700},
  card: {margin: 12, rowGap: 21, backgroundColor: MD2Colors.white},
  cover: {margin: 12},
  cardActions: {columnGap: 12},
  moreDetailsButton: {borderColor: MD2Colors.red700},
});
