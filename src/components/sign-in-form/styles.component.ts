import {StyleSheet} from 'react-native';
import {MD2Colors} from 'react-native-paper';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    padding: 3,
    backgroundColor: MD2Colors.white,
    // rowGap: 3,
  },
  buttonContainer: {
    columnGap: 9,
    // flexDirection: 'row',
    rowGap: 3,
    // justifyContent: 'flex-end',
    // marginHorizontal: 3,
    padding: 9,
    width: '100%',
  },
  textInput: {width: '100%', backgroundColor: MD2Colors.grey300},
  buttonText: {color: MD2Colors.white, fontSize: 21, padding: 9},
  invalidText: {color: MD2Colors.red500, width: '100%', fontSize: 18},
  content: {
    borderRadius: 12,
    width: '100%',
    flex: 2,
    backgroundColor: MD2Colors.white,
    padding: 12,
    rowGap: 12,
    // borderWidth: 1,
    // borderColor: MD2Colors.white,
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
    width: '100%',
    height: 200,
    objectFit: 'cover',
    // marginTop: 12,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: MD2Colors.red700,
  },
  employeeCheckbox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
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
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
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
});
