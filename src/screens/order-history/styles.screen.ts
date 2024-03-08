import {StyleSheet} from 'react-native';
import {MD2Colors} from 'react-native-paper';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    rowGap: 9,
    paddingVertical: 9,
  },
  itemContainer: {
    borderWidth: 1,
    borderRadius: 9,
    padding: 3,
    width: 300,
    alignItems: 'center',
    rowGap: 6,
    backgroundColor: MD2Colors.red700,
  },
  infoContainer: {alignItems: 'center', rowGap: 3, padding: 9},
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 3,
    textAlign: 'center',
  },
  divider: {
    borderColor: MD2Colors.grey600,
    width: '100%',
  },
  totalPriceText: {marginBottom: 9},
});
