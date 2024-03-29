import {FlatList, View, ScrollView} from 'react-native';
import React from 'react';
import {useAppSelector} from '../../services/api-services/redux/hooks';
import {Button, MD2Colors, Text} from 'react-native-paper';
import {firebase} from '@react-native-firebase/firestore';
import Empty from '../../components/empty/index.component';
import {styles} from './styles.screen';
import {orderStatuses} from '../../constants/order-statuses';
import {useNavigation} from '@react-navigation/native';
import {screenNames} from '../index.screens';

const OrderHistoryScreen = () => {
  const orders = useAppSelector((state: any) => state.orderReducer.orders);
  const navigation = useNavigation<any>();

  if (orders.length === 0) {
    return <Empty text="You do not have any order history" />;
  }

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
          console.log('Order History Delivery Email', item.deliveryClerkEmail);
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
              <Text>Status: {item.status}</Text>
              <Text>Created At: {createdAt}</Text>
              <Text style={styles.totalPriceText}>
                Total Price: {item.totalPrice}
              </Text>
              {item.status === orderStatuses.delivered && (
                <Button
                  onPress={() =>
                    navigation.navigate(screenNames.addReview, {
                      deliveryClerkEmail: item.deliveryClerkEmail,
                    })
                  }
                  textColor={MD2Colors.white}
                  buttonColor={MD2Colors.black}>
                  Add A Review
                </Button>
              )}
            </View>
          );
        }}
        contentContainerStyle={styles.container}
      />
    </>
  );
};

export default OrderHistoryScreen;
