import {View} from 'react-native';
import React from 'react';
import {useAppSelector} from '../../services/api-services/redux/hooks';
import {Text, Button, MD2Colors} from 'react-native-paper';
import {styles} from './styles.screen';

import CartItems from '../../components/cartItems/index.component';
import Empty from '../../components/empty/index.component';
import {screenNames} from '../index.screens';

const CartScreen = ({navigation}: any) => {
  const {cart, totalPrice} = useAppSelector((state: any) => state.cartReducer);
  // const user = useAppSelector((state: any) => state.userReducer.user);

  const renderComponent = () => {
    if (cart.length > 0) {
      return (
        <View style={styles.container}>
          <CartItems />
          <View style={styles.cartItemsContainer}>
            <Text style={styles.total} variant="titleLarge">
              Total: ${totalPrice}
            </Text>
            <Button
              style={styles.button}
              buttonColor={MD2Colors.green600}
              textColor={MD2Colors.white}
              onPress={() => {
                navigation.navigate(screenNames.checkout);
              }}>
              Checkout Items
            </Button>
          </View>
        </View>
      );
    }
    return <Empty text="Your cart is empty!" />;
  };

  return <View style={styles.container}>{renderComponent()}</View>;
};

export default CartScreen;
