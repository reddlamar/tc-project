import {StyleSheet} from 'react-native';
import {MD2Colors} from 'react-native-paper';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 12,
    rowGap: 9,
    backgroundColor: MD2Colors.black,
  },
  scrollView: {rowGap: 9},
  topContainer: {
    flex: 1,
    width: '100%',
    borderWidth: 1,
    borderColor: MD2Colors.white,
    backgroundColor: MD2Colors.grey900,
    padding: 6,
    paddingTop: 12,
    borderRadius: 12,
    rowGap: 12,
  },
  topContainerText: {fontSize: 30},
  bottomContainer: {
    flex: 4,
    width: '100%',
    padding: 9,
    color: MD2Colors.white,
  },
  text: {color: MD2Colors.white, padding: 6},
  orderTitle: {
    fontSize: 21,
    fontWeight: 'bold',
    color: MD2Colors.white,
    textAlign: 'center',
  },
  flatListOrder: {rowGap: 9},
  textTotal: {
    fontSize: 30,
    fontWeight: 'bold',
    color: MD2Colors.white,
  },
  orderContainer: {
    borderWidth: 1,
    padding: 6,
    borderRadius: 6,
    borderColor: MD2Colors.white,
    backgroundColor: MD2Colors.grey900,
    width: 300,
  },
  orderText: {fontSize: 15, fontWeight: '600'},
  cartDetailsButton: {
    fontSize: 18,
    borderWidth: 1,
    borderColor: MD2Colors.white,
    width: 200,
  },
  content: {
    borderRadius: 12,
    width: '100%',
    flex: 2,
    padding: 12,
    rowGap: 12,
    borderWidth: 1,
    borderColor: MD2Colors.white,
  },
  totalText: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 6,
  },
});
