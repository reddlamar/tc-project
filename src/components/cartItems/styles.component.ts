import {StyleSheet} from 'react-native';
import {MD2Colors} from 'react-native-paper';

export const styles = StyleSheet.create({
  container: {justifyContent: 'center'},
  card: {margin: 12},
  cover: {margin: 12},
  details: {marginBottom: 15},
  content: {
    borderWidth: 1,
    margin: 9,
    padding: 3,
    borderRadius: 9,
    // flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: 21,
  },
  extraDetail: {flexDirection: 'row', justifyContent: 'space-between'},
  price: {fontWeight: '600', textDecorationLine: 'underline', marginBottom: 9},
  text: {fontSize: 21, fontWeight: '500'},
  rating: {color: MD2Colors.red600},
  quantity: {fontSize: 27, paddingBottom: 6},
  flatListContainer: {justifyContent: 'center'},
  total: {alignSelf: 'flex-end'},
  cartItem: {flexDirection: 'row', alignItems: 'center'},
  title: {fontSize: 30, fontWeight: 'bold', textAlign: 'center'},
});
