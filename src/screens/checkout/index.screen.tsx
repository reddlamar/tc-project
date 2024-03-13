import {View, ScrollView} from 'react-native';
import React, {useState} from 'react';
import {TextInput, Text, Button, MD2Colors} from 'react-native-paper';
import {
  useAppDispatch,
  useAppSelector,
} from '../../services/api-services/redux/hooks';
import {useForm} from '../../hooks/useForm';
import {checkoutInitialValues} from '../../models/fomik-values.model';
import {checkoutSchema} from '../../services/api-services/yup/schemas.service';
import AddressForm from '../../components/address-form/index.component';
import {clearCart} from '../../services/api-services/redux/slices/cart.slice';
import {screenNames} from '../index.screens';
import Empty from '../../components/empty/index.component';
import {LatLng} from 'react-native-maps';
import geocoder from '@timwangdev/react-native-geocoder';
import {styles} from './styles.screen';
import {orderStatuses} from '../../constants/order-statuses';

const CheckoutScreen = ({navigation}: any) => {
  const dispatch = useAppDispatch();
  const {cart, totalPrice} = useAppSelector((state: any) => state.cartReducer);
  const {user} = useAppSelector((state: any) => state.userReducer);
  const [isAddressSubmitted, setIsAddressSubmitted] = useState(false);
  const [mapCoordinates, setMapCoordinates] = useState<LatLng>({
    latitude: 33.753746,
    longitude: -84.38633,
  });

  const form = useForm(checkoutInitialValues, checkoutSchema);

  if (cart.length === 0) {
    return <Empty text="Cart is empty!" />;
  }

  return (
    <>
      <ScrollView>
        <Text style={styles.total} variant="titleLarge">
          {cart.length > 1
            ? `You are buying ${cart.length} items`
            : `You are buying ${cart.length} item`}
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
            onPress={() => {
              setIsAddressSubmitted(true);
              geocoder
                .geocodeAddress(
                  `${form.values.street} ${form.values.city} ${form.values.state}`,
                )
                .then(geoAddresses => {
                  setMapCoordinates({
                    latitude: geoAddresses[0].position.lat,
                    longitude: geoAddresses[0].position.lng,
                  });
                });
            }}>
            Submit Address
          </Button>
          <Button
            style={styles.button}
            buttonColor={MD2Colors.green600}
            textColor={MD2Colors.white}
            disabled={!isAddressSubmitted}
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
                    latitude: mapCoordinates.latitude,
                    longitude: mapCoordinates.longitude,
                  },
                  status: orderStatuses.pending,
                  deliveryDate: new Date(),
                  estimatedTime: Date.now() + 1800000,
                  deliveryClerkTrackingLocation: {
                    latitude: 32.715736,
                    longitude: -117.161087,
                  },
                  deliveryClerkEmail: '',
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
