import {View} from 'react-native';
import React from 'react';
import {screenNames} from '../../screens/index.screens';
import {useNavigation} from '@react-navigation/native';
import {Button, Divider, MD2Colors} from 'react-native-paper';
import {styles} from './styles.component';

const CustomerProfileOptions = () => {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <Button
        labelStyle={styles.button}
        textColor={MD2Colors.red700}
        onPress={() => navigation.navigate(screenNames.orderHistory)}>
        Order History
      </Button>
      <Divider />
      <Button
        labelStyle={styles.button}
        textColor={MD2Colors.red700}
        onPress={() => navigation.navigate(screenNames.notifications)}>
        Notifications
      </Button>
      <Divider />
    </View>
  );
};

export default CustomerProfileOptions;
