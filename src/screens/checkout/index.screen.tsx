import {View, ScrollView} from 'react-native';
import React from 'react';
import {TextInput, Text, Button, MD2Colors} from 'react-native-paper';
import {
  useAppDispatch,
  useAppSelector,
} from '../../services/api-services/redux/hooks';
import {useForm} from '../../hooks/useForm';
import {checkoutInitialValues} from '../../models/fomik-values.model';
import {checkoutSchema} from '../../services/api-services/Yup/schemas.service';
import AddressForm from '../../components/address-form/index.componenet';
import {clearCart} from '../../services/api-services/redux/slices/cart.slice';
import {screenNames} from '../index.screens';
import Empty from '../../components/empty/index.component';
import {styles} from './styles.screen';

const CheckoutScreen = ({navigation}: any) => {
  const dispatch = useAppDispatch();
  const {cart, totalPrice} = useAppSelector((state: any) => state.cartReducer);
  const {user} = useAppSelector((state: any) => state.userReducer);

  const form = useForm(checkoutInitialValues, checkoutSchema);

  form.values.email = user.email;

  if (cart.length === 0) {
    return <Empty text="Cart is empty!" />;
  }

  return (
    <>
      <ScrollView>
        <Text style={styles.total} variant="titleLarge">
          You are buying {cart.length} items
        </Text>
        <Text style={styles.total} variant="titleLarge">
          Total Price: ${totalPrice}
        </Text>
        <TextInput
          label="Email"
          onChangeText={form.handleChange('email')}
          onBlur={form.handleBlur('email')}
          value={form.values.email}
          autoCapitalize="none"
        />
        <Text style={styles.invalidText}>
          {form.errors.email && form.touched && form.errors.email}
        </Text>
        <AddressForm form={form} />
        <View style={styles.actionTotal}>
          <Button
            style={styles.button}
            buttonColor={MD2Colors.green600}
            textColor={MD2Colors.white}
            onPress={() => {
              dispatch({
                type: 'createOrder',
                payload: {
                  cart,
                  totalPrice,
                  customerEmail: form.values.email,
                  customerID: user.id,
                  createdAt: new Date(),
                  updatedAt: new Date(),
                  deliveryAddress: {
                    street: form.values.street,
                    city: form.values.city,
                    state: form.values.state,
                    postalCode: form.values.postalCode,
                    latitude: -84.386205,
                    longitude: 33.7683818,
                  },
                  status: 'pending',
                  deliveryDate: new Date(),
                  estimatedTime: Date.now() + 1800000,
                  deliveryBoyTrackingLocation: {
                    longitude: -84.386205,
                    latitude: 33.7683818,
                  },
                },
              });

              dispatch(clearCart());

              navigation.navigate(screenNames.home);
            }}>
            Buy Items
          </Button>
        </View>
      </ScrollView>
    </>
  );
};

export default CheckoutScreen;
