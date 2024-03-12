import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import {useAppSelector} from '../../services/api-services/redux/hooks';
import Geolocation from 'react-native-geolocation-service';
import {styles} from './styles.screen';
import {userTypes} from '../../constants/user-types';

const MapScreen = () => {
  const {orders} = useAppSelector((state: any) => state.orderReducer);
  const {user} = useAppSelector((state: any) => state.userReducer);
  const [coords, setcoords] = useState<any>(null);

  useEffect(() => {
    Geolocation.watchPosition(
      position => {
        setcoords({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      error => {
        console.log('Watch Position Error:', error);
      },
      {
        interval: 5000,
      },
    );
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        showsUserLocation={true}
        showsMyLocationButton={true}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}>
        {coords && (
          <Marker coordinate={{latitude: coords.lat, longitude: coords.lng}} />
        )}
        {user?.userType === userTypes.employee &&
          orders.map((o: any) => (
            <Marker
              key={o.id}
              coordinate={{
                latitude: o.deliveryAddress.latitude,
                longitude: o.deliveryAddress.longitude,
              }}
            />
          ))}
      </MapView>
    </View>
  );
};

export default MapScreen;
