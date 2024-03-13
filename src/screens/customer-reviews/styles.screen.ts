import {StyleSheet} from 'react-native';
import {MD2Colors} from 'react-native-paper';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 12,
    padding: 3,
    borderRadius: 12,
    rowGap: 6,
  },
  text: {
    fontSize: 21,
    fontWeight: '600',
    color: MD2Colors.grey100,
  },
  reviewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reviewerText: {color: MD2Colors.white},
  totalReviews: {
    fontSize: 18,
    margin: 12,
    fontStyle: 'italic',
    color: MD2Colors.grey300,
  },
  reviewer: {
    fontSize: 15,
    color: MD2Colors.green300,
    fontStyle: 'italic',
  },
  createdAt: {
    fontSize: 12,
    color: MD2Colors.grey200,
    alignSelf: 'flex-end',
  },
});
