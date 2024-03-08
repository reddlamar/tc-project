import {StyleSheet} from 'react-native';
import {MD2Colors} from 'react-native-paper';

export const styles = StyleSheet.create({
  container: {flex: 1},
  topContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: 12,
    marginVertical: 12,
    // flex: 1,
  },
  image: {borderRadius: 15},
  button: {
    borderWidth: 1,
    borderRadius: 12,
    borderColor: MD2Colors.grey500,
    paddingHorizontal: 12,
  },
  bottomContainer: {
    backgroundColor: MD2Colors.white,
    margin: 12,
    flex: 2,
    height: 600,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    alignItems: 'center',
  },
});
