import {StyleSheet} from 'react-native';
import {MD2Colors} from 'react-native-paper';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    // backgroundColor: MD2Colors.black,
    rowGap: 9,
  },
  contentTop: {
    // width: '100%',
    flex: 1,
    borderWidth: 1,
    backgroundColor: MD2Colors.red700,
    padding: 12,
    borderRadius: 12,
    justifyContent: 'center',
  },
  expenseText: {color: MD2Colors.white},
  textTotal: {fontSize: 30, fontWeight: 'bold', color: MD2Colors.white},
  cartDetailsButton: {
    fontSize: 18,
    borderWidth: 1,
    borderColor: MD2Colors.white,
    width: 200,
    marginTop: 66,
    height: 40,
    backgroundColor: MD2Colors.transparent,
    alignItems: 'center',
    justifyContent: 'center',
    columnGap: 9,
  },
  content: {
    borderRadius: 12,
    width: '100%',
    flex: 2,
    // backgroundColor: MD2Colors.black,
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
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
