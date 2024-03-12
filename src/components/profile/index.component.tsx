import React, {useEffect} from 'react';
import {Button, MD2Colors, Text} from 'react-native-paper';
import {Image, View} from 'react-native';

import {styles} from './styles.component';
import {useAppDispatch} from '../../services/api-services/redux/hooks';
import CustomerProfileOptions from '../customer-profile-options/index.component';
import EmployeeProfileOptions from '../employee-profile-options/index.component';

const Profile = ({profile, imageUri}: any) => {
  const {firstName, lastName, email, userType /*, phone, address*/} = profile;
  // const {street, city, state, postalCode} = address;

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (userType === 'customer') {
      dispatch({type: 'getOrderHistory', payload: {email}});
      dispatch({type: 'getNotifications', payload: {email}});
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
      <View style={styles.bottomContainer}>
        {userType === 'customer' ? (
          <CustomerProfileOptions />
        ) : (
          <EmployeeProfileOptions />
        )}
      </View>
    </View>
  );
};

export default Profile;
