import React, {useEffect} from 'react';
import {Button, MD2Colors, Text} from 'react-native-paper';
import {Image, View, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {styles} from './styles.component';
import {screenNames} from '../../screens/index.screens';
import {useAppDispatch} from '../../services/api-services/redux/hooks';

const Profile = ({profile, imageUri}: any) => {
  const {firstName, lastName, email, userType /*, phone, address*/} = profile;
  // const {street, city, state, postalCode} = address;

  const navigation = useNavigation<any>();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (userType === 'customer') {
      dispatch({type: 'getOrderHistory', payload: {email}});
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Image
          source={{uri: imageUri}}
          width={120}
          height={100}
          style={styles.image}
        />
        <Text variant="titleLarge">
          {firstName} {lastName}
        </Text>
        <Button
          buttonColor={MD2Colors.grey100}
          style={styles.button}
          textColor={MD2Colors.black}>
          Edit Profile
        </Button>
      </View>
      {userType === 'customer' && (
        <View style={styles.bottomContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate(screenNames.orderHistory)}>
            <Text>Order History</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Profile;
