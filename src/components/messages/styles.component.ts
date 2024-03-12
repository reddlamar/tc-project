import {StyleSheet} from 'react-native';
import {MD2Colors} from 'react-native-paper';

export const styles = StyleSheet.create({
  senderPlacement: {alignItems: 'flex-end'},
  senderTextColor: {color: MD2Colors.red900},
  recipientPlacement: {alignItems: 'flex-start'},
  recipientTextColor: {color: MD2Colors.green400},
  flatList: {backgroundColor: MD2Colors.grey100},
  text: {fontSize: 21, fontWeight: 'bold', color: MD2Colors.white},
});
