import {StyleSheet} from 'react-native';
import {MD2Colors} from 'react-native-paper';

export const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'space-between'},
  cartItemsContainer: {justifyContent: 'space-between', rowGap: 3, margin: 12},
  total: {alignSelf: 'center'},
  button: {width: 250, alignSelf: 'center'},
  actionTotal: {rowGap: 9, marginBottom: 3},
  invalidText: {color: MD2Colors.red500},
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    rowGap: 6,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  pressableButton: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: MD2Colors.blue700,
  },
  buttonClose: {
    backgroundColor: MD2Colors.black,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  mapView: {width: 300, height: 300},
});
