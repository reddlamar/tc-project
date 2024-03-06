import React from 'react';
import {Button, MD2Colors} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import {addToCart} from '../../services/api-services/redux/slices/cart.slice';

const AddCartButton = ({product}: any) => {
  const dispatch = useDispatch();

  const addCartItemToCart = () => {
    const cartItem = {product, quantity: 1};
    dispatch(addToCart(cartItem));
  };

  return (
    <Button
      icon="cart"
      buttonColor={MD2Colors.blue300}
      textColor={MD2Colors.white}
      onPress={() => addCartItemToCart()}>
      Add To Cart
    </Button>
  );
};

export default AddCartButton;
