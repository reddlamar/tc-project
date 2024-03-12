import {View} from 'react-native';
import {Text} from 'react-native-paper';
import React, {useState} from 'react';
import OrderStatusButton from '../../components/order-status-button/index.component';
import {useAppDispatch} from '../../services/api-services/redux/hooks';
import {orderStatuses} from '../../constants/order-statuses';
import {firebase} from '@react-native-firebase/firestore';
import {styles} from './styles.screen';

const OrderDetailsScreen = ({route}: any) => {
  const {order} = route.params;
  const dispatch = useAppDispatch();
  const [status, setStatus] = useState(order.status);

  const createdAtOrder = new firebase.firestore.Timestamp(
    order.createdAt.seconds,
    order.createdAt.nanoseconds,
  )
    .toDate()
    .toLocaleDateString();

  const startOrder = () => {
    setStatus(orderStatuses.inProgress);
    dispatch({
      type: 'updateOrder',
      payload: {order, status: orderStatuses.inProgress},
    });
    dispatch({
      type: 'sendNotification',
      payload: {
        email: 'reddlamar1@gmail.com',
        text: 'Your order will be there in 30 minutes',
        createdAt: new Date(),
        read: false,
      },
    });
  };

  const rejectOrder = () => {
    setStatus(orderStatuses.reject);
    dispatch({
      type: 'updateOrder',
      payload: {order, status: orderStatuses.reject},
    });
    dispatch({
      type: 'sendNotification',
      payload: {
        email: 'reddlamar1@gmail.com',
        text: 'We are out of stock. We apologize for the inconvenience',
        createdAt: new Date(),
        read: false,
      },
    });
  };

  const updateOrderAsDelivered = () => {
    setStatus(orderStatuses.delivered);
    dispatch({
      type: 'updateOrder',
      payload: {order, status: orderStatuses.delivered},
    });
    dispatch({
      type: 'sendNotification',
      payload: {
        email: 'reddlamar1@gmail.com',
        text: 'Your order was delivered',
        createdAt: new Date(),
        read: false,
      },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.orderTitle]}>Order ID: {order.id}</Text>
      <View style={styles.orderContainer}>
        <Text style={[styles.text, styles.orderText]}>Status: {status}</Text>
        <Text style={[styles.text, styles.orderText]}>
          Email: {order.customerEmail}
        </Text>
        <Text style={[styles.text, styles.orderText]}>
          Created At: {createdAtOrder}
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
        <View style={styles.buttonContainer}>
          {status === orderStatuses.pending && (
            <OrderStatusButton
              order={order}
              onPress={startOrder}
              text="Start Delivery Process"
            />
          )}
          {status === orderStatuses.pending && (
            <OrderStatusButton
              order={order}
              onPress={rejectOrder}
              text="Reject Order"
            />
          )}
          {status === orderStatuses.inProgress && (
            <OrderStatusButton
              order={order}
              onPress={() => updateOrderAsDelivered()}
              text="Update Order as Delivered"
            />
          )}
        </View>
      </View>
    </View>
  );
};

export default OrderDetailsScreen;
