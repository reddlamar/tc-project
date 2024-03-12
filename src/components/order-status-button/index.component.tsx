import React from 'react';
import {Button, MD2Colors} from 'react-native-paper';
import {styles} from './styles.component';

const OrderStatusButton = ({text, onPress}: any) => {
  return (
    <Button
      textColor={MD2Colors.white}
      style={styles.buttonStart}
      onPress={() => onPress()}>
      {text}
    </Button>
  );
};

export default OrderStatusButton;
