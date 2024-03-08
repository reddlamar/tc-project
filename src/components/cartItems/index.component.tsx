import {FlatList, View} from 'react-native';
import React from 'react';
import {
  useAppDispatch,
  useAppSelector,
} from '../../services/api-services/redux/hooks';
import {Avatar, Card, Text, Button, MD2Colors} from 'react-native-paper';
import {styles} from './styles.component';

import {
  decrementQuantity,
  incrementQuantity,
} from '../../services/api-services/redux/slices/cart.slice';

const CartItems = () => {
  const {cart} = useAppSelector((state: any) => state.cartReducer);
  const dispatch = useAppDispatch();

  return (
    <FlatList
      data={cart}
      renderItem={({item}) => (
        <Card style={styles.card} key={item.product.id}>
          <Card.Title title={item.product.name} titleStyle={styles.title} />
          <Card.Content style={styles.content}>
            <Text style={styles.text}>Price: ${item.product.price}</Text>
            <View style={styles.cartItem}>
              <Text style={[styles.text]}>Quantity: </Text>
              <Button onPress={() => dispatch(decrementQuantity(item))}>
                <Avatar.Icon icon="minus" size={18} />
              </Button>
              <Text style={[styles.text, styles.quantity]}>
                {item.quantity}
              </Text>
              <Button
                disabled={item.quantity === item.product.quantity}
                onPress={() => dispatch(incrementQuantity(item))}>
                <Avatar.Icon icon="plus" size={18} />
              </Button>
            </View>
            <Text style={{color: MD2Colors.red600}}>
              {item.product.quantity - item.quantity} {item.product.name}s left
            </Text>
          </Card.Content>
        </Card>
      )}
    />
  );
};

export default CartItems;
