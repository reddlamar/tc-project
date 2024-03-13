import {View, Text, FlatList, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {firebase} from '@react-native-firebase/firestore';
import {styles} from './styles.screen';
import {getOrderCollectionByStatus} from '../../services/api-services/firebase/firestore.service';
import {orderStatuses} from '../../constants/order-statuses';

const DeliveriesScreen = () => {
  const [inProgressOrders, setInProgressOrders] = useState([]);
  useEffect(() => {
    const getInProgressOrders = async () => {
      const orders: any = await getOrderCollectionByStatus(
        orderStatuses.inProgress,
      );
      console.log('Orders', orders);
      if (orders) {
        setInProgressOrders(orders);
      }
    };
    getInProgressOrders();
  }, []);

  if (inProgressOrders?.length > 0) {
    return (
      <View>
        <FlatList
          data={inProgressOrders}
          renderItem={({item}: any) => {
            const createdAt = new firebase.firestore.Timestamp(
              item.createdAt.seconds,
              item.createdAt.nanoseconds,
            )
              .toDate()
              .toLocaleDateString();
            return (
              <View style={styles.itemContainer}>
                {item.cart.map((ci: any) => (
                  <ScrollView
                    key={ci.product.id}
                    contentContainerStyle={styles.infoContainer}>
                    <Text style={styles.text}>
                      Product Name: {ci.product.name}
                    </Text>
                    <Text style={styles.text}>Price: {ci.product.price}</Text>
                    <Text style={styles.text}>
                      Quantity Bought: {ci.quantity}
                    </Text>
                  </ScrollView>
                ))}
                <Text style={styles.text}>Status: {item.status}</Text>
                <Text style={styles.text}>Created At: {createdAt}</Text>
                <Text style={[styles.text, styles.totalPriceText]}>
                  Total Price: {item.totalPrice}
                </Text>
              </View>
            );
          }}
          contentContainerStyle={styles.container}
        />
      </View>
    );
  }
};

export default DeliveriesScreen;
