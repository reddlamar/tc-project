import {FlatList, View, ScrollView} from 'react-native';
import React from 'react';
import {useAppSelector} from '../../services/api-services/redux/hooks';
import {Text} from 'react-native-paper';
import {styles} from './styles.screen';
import {firebase} from '@react-native-firebase/firestore';

const OrderHistoryScreen = () => {
  const orders = useAppSelector((state: any) => state.orderReducer.orders);
  console.log('Order', orders);

  return (
    <>
      <Text variant="titleLarge" style={styles.title}>
        Order History
      </Text>
      <FlatList
        data={orders}
        renderItem={({item}) => {
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
                  <Text>Product Name: {ci.product.name}</Text>
                  <Text>Price: {ci.product.price}</Text>
                  <Text>Quantity Bought: {ci.quantity}</Text>
                </ScrollView>
              ))}
              <Text>Created At: {createdAt}</Text>
              <Text style={styles.totalPriceText}>
                Total Price: {item.totalPrice}
              </Text>
            </View>
          );
        }}
        contentContainerStyle={styles.container}
      />
    </>
  );
};

export default OrderHistoryScreen;
