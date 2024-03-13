import {View, Modal} from 'react-native';
import React from 'react';
import {Button, MD2Colors} from 'react-native-paper';
import {styles} from './style.component';

const CustomModal = ({children, modalVisible, setModalVisible}: any) => {
  return (
    <View>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {children}
            <Button
              style={[styles.button, styles.buttonClose]}
              textColor={MD2Colors.white}
              onPress={() => setModalVisible(!modalVisible)}>
              Close
            </Button>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CustomModal;
