import {StyleSheet} from 'react-native';
import {MD2Colors} from 'react-native-paper';

export const styles = StyleSheet.create({
  listSection: {
    flex: 1,
    width: '100%',
    padding: 3,
    alignItems: 'center',
  },
  listSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    color: MD2Colors.black,
  },
  flatList: {
    columnGap: 6,
    paddingHorizontal: 15,
  },
  flatListView: {
    height: 100,
    rowGap: 6,
    borderWidth: 1,
    borderRadius: 6,
    width: 90,
    alignItems: 'center',
    backgroundColor: MD2Colors.white,
  },
  imageList: {objectFit: 'contain'},
  textList: {fontSize: 12, fontWeight: '600'},
});
