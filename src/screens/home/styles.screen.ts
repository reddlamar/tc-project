import {StyleSheet} from 'react-native';
import {MD2Colors} from 'react-native-paper';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 12,
  },
  scrollView: {rowGap: 9},
  topContainer: {
    flex: 1,
    width: '100%',
    borderWidth: 1,
    backgroundColor: MD2Colors.red700,
    padding: 12,
    borderRadius: 12,
    rowGap: 12,
  },
  bottomContainer: {
    flex: 2,
    width: '100%',
    borderWidth: 1,
    borderRadius: 12,
    backgroundColor: MD2Colors.red700,
  },
  expenseText: {color: MD2Colors.black},
  textTotal: {
    fontSize: 30,
    fontWeight: 'bold',
    color: MD2Colors.black,
  },
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
  contentTitle: {
    color: MD2Colors.white,
    fontSize: 24,
    fontWeight: 'bold',
  },
  button: {
    height: 60,
    borderRadius: 3,
    width: '100%',
    justifyContent: 'center',
  },
  buttonLabel: {fontSize: 21, fontWeight: '900'},
  cartDetailsText: {color: MD2Colors.white},
  cartIcon: {width: 9, backgroundColor: MD2Colors.transparent, height: 12},
  image: {
    objectFit: 'contain',
    marginTop: 12,
  },
});
