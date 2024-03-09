import {View} from 'react-native';
import {Button, MD2Colors, Text} from 'react-native-paper';
import React from 'react';
import {styles} from './styles.screen';
import {useAppDispatch} from '../../services/api-services/redux/hooks';
import {orderStatuses} from '../../constants/oderStatuses';

const OrderDetailsScreen = ({route}: any) => {
  const {order} = route.params;
  const dispatch = useAppDispatch();

  return (
    <View style={styles.container}>
      <Text variant="titleLarge" style={[styles.text, styles.orderTitle]}>
        Order Status: {order.status}
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
          <View style={styles.addressInnerContainer}>
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
              Postal Code: {order.deliveryAddress.postalCode}
            </Text>
          </View>
        </View>
        <Button
          textColor={MD2Colors.white}
          style={styles.buttonStart}
          onPress={() =>
            dispatch({
              type: 'updateOrder',
              payload: {order, status: orderStatuses.inProgress},
            })
          }>
          Start Delivery Process
        </Button>
      </View>
    </View>
  );
};

export default OrderDetailsScreen;
