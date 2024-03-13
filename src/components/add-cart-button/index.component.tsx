import React from 'react';
import {Button, MD2Colors} from 'react-native-paper';
import {
  useAppDispatch,
  useAppSelector,
} from '../../services/api-services/redux/hooks';
import {useNavigation} from '@react-navigation/native';
import {addToCart} from '../../services/api-services/redux/slices/cart.slice';
import {View} from 'react-native';
import {screenNames} from '../../screens/index.screens';
import {styles} from './styles.component';

const AddCartButton = ({product}: any) => {
  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch();
  const {cart} = useAppSelector((state: any) => state.cartReducer);

  const addCartItemToCart = () => {
    const cartItem = {product, quantity: 1};
    dispatch(addToCart(cartItem));
  };

  const checkInCart = (): boolean | undefined =>
    cart.some((ci: any) => ci.product.id === product.id);

  return (
    <View style={styles.buttonContainer}>
      {checkInCart() && (
        <Button
          icon="currency-usd"
          buttonColor={MD2Colors.red700}
          textColor={MD2Colors.white}
          onPress={() => navigation.navigate(screenNames.checkout)}>
          Checkout
        </Button>
      )}
      <Button
        icon="cart"
        buttonColor={MD2Colors.red700}
        textColor={MD2Colors.white}
        disabled={checkInCart()}
        onPress={() => addCartItemToCart()}>
        {checkInCart() ? 'Added To Cart' : 'Add To Cart'}
      </Button>
    </View>
  );
};

export default AddCartButton;
