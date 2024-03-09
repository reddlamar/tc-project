import {View, ScrollView, Modal, Pressable} from 'react-native';
import React, {useEffect, useState} from 'react';
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
import MapView, {LatLng, Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {styles} from './styles.screen';

const CheckoutScreen = ({navigation}: any) => {
  const dispatch = useAppDispatch();
  const {cart, totalPrice} = useAppSelector((state: any) => state.cartReducer);
  const {user} = useAppSelector((state: any) => state.userReducer);
  const [modalVisible, setModalVisible] = useState(false);
  const [mapCoordinates, setMapCoordinates] = useState<LatLng>({
    latitude: 33.753746,
    longitude: -84.38633,
  });

  useEffect(() => {
    console.log('Map Coords', mapCoordinates);
  }, [mapCoordinates]);

  const form = useForm(checkoutInitialValues, checkoutSchema);

  form.values.email = user.email;

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
          <Pressable
            style={[styles.pressableButton, styles.buttonOpen, styles.button]}
            onPress={() => setModalVisible(true)}>
            <Text style={styles.textStyle}>Show Map</Text>
          </Pressable>
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
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <MapView
                provider={PROVIDER_GOOGLE}
                initialRegion={{
                  latitudeDelta: 0,
                  longitudeDelta: 0,
                  latitude: 33.753746,
                  longitude: -84.38633,
                }}
                style={{width: 300, height: 300}}>
                <Marker
                  draggable
                  coordinate={mapCoordinates}
                  onDragEnd={e =>
                    setMapCoordinates({
                      latitude: e.nativeEvent.coordinate.latitude,
                      longitude: e.nativeEvent.coordinate.longitude,
                    })
                  }
                />
              </MapView>
              <Pressable
                style={[styles.pressableButton, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>Hide Modal</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    </>
  );
};

export default CheckoutScreen;
