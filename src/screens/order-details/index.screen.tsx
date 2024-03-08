import {View} from 'react-native';
import {Button, MD2Colors, Text} from 'react-native-paper';
import React from 'react';
import {styles} from './styles.screen';

const OrderDetailsScreen = ({route}: any) => {
  const {order} = route.params;

  return (
    <View style={styles.container}>
      <Text variant="titleLarge" style={[styles.text, styles.orderTitle]}>
        Order:
      </Text>
      <View style={styles.orderContainer}>
        <Text style={[styles.text, styles.orderText]}>
          Order ID: {order.id}
        </Text>
        <Text style={[styles.text, styles.orderText]}>
          Email: {order.customerEmail}
        </Text>
        <View>
          <Text style={[styles.text, styles.orderText]}>Address:</Text>
          <View style={{paddingLeft: 9}}>
            <Text style={[styles.text, styles.orderText]}>
              Street: {order.deliveryAddress.street}
            </Text>
            <Text style={[styles.text, styles.orderText]}>
              City: {order.deliveryAddress.city}
            </Text>
            <Text style={[styles.text, styles.orderText]}>
              State: {order.deliveryAddress.state}
            </Text>
            <Text style={[styles.text, styles.orderText]}>
              Postal Code: {order.deliveryAddress.PostalCode}
            </Text>
          </View>
        </View>
        <Button textColor={MD2Colors.white} style={styles.buttonStart}>
          Start Delivery Process
        </Button>
      </View>
    </View>
  );
};

export default OrderDetailsScreen;
