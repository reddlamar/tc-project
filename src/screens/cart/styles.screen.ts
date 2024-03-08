import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'space-between'},
  cartItemsContainer: {justifyContent: 'space-between', rowGap: 3, margin: 12},
  total: {alignSelf: 'center'},
  button: {width: 250, alignSelf: 'center'},
  actionTotal: {rowGap: 9, marginBottom: 12},
});
