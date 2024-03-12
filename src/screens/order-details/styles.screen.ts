import {StyleSheet} from 'react-native';
import {MD2Colors} from 'react-native-paper';

export const styles = StyleSheet.create({
  container: {
    flex: 2,
    width: '100%',
    borderWidth: 1,
    borderRadius: 12,
    padding: 9,
  },
  text: {color: MD2Colors.white, padding: 6},
  orderTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: MD2Colors.blue700,
    textAlign: 'center',
  },
  orderContainer: {
    borderWidth: 1,
    padding: 6,
    borderRadius: 12,
    borderColor: MD2Colors.white,
    backgroundColor: MD2Colors.blue700,
  },
  orderText: {fontSize: 15, fontWeight: '600'},
  totalText: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 6,
  },
  addressInnerContainer: {paddingLeft: 9},
  buttonContainer: {
    alignItems: 'center',
  },
});
