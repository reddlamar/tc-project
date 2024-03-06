import {View} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Text, Button, MD2Colors} from 'react-native-paper';
import {styles} from './styles.screen';

import {clearCart} from '../../services/api-services/redux/slices/cart.slice';

import CartItems from '../../components/cartItems/index.component';

const CartScreen = () => {
  const {cart, totalPrice} = useSelector((state: any) => state.cartReducer);
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      {cart.length > 0 ? (
        <View style={{flex: 1, justifyContent: 'space-between'}}>
          <View style={styles.cartItemsContainer}>
            <CartItems />
          </View>
          <View style={{rowGap: 9, marginBottom: 12}}>
            <Text style={styles.total} variant="titleLarge">
              Total: ${totalPrice}
            </Text>
            <Button
              style={styles.button}
              buttonColor={MD2Colors.red600}
              textColor={MD2Colors.white}
              onPress={() => dispatch(clearCart())}>
              Clear Cart
            </Button>
            <Button
              style={styles.button}
              buttonColor={MD2Colors.green600}
              textColor={MD2Colors.white}
              onPress={() => null}>
              Buy Items
            </Button>
          </View>
        </View>
      ) : (
        <Text>Cart is empty</Text>
      )}
    </View>
  );
};

export default CartScreen;
