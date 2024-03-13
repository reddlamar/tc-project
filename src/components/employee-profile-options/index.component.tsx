import {View} from 'react-native';
import React, {useEffect} from 'react';
import {Button, Divider} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {screenNames} from '../../screens/index.screens';
import {useAppDispatch} from '../../services/api-services/redux/hooks';
import {orderStatuses} from '../../constants/order-statuses';
import {styles} from './styles.component';

const EmployeeProfileOptions = () => {
  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch({
      type: 'getInProgressOrders',
      payload: {status: orderStatuses.inProgress},
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <Button
        labelStyle={styles.container}
        onPress={() => navigation.navigate(screenNames.deliveries)}>
        Deliveries
      </Button>
      <Divider />
      <Button
        labelStyle={styles.container}
        onPress={() => navigation.navigate(screenNames.customerReviews)}>
        Customer Reviews
      </Button>
      <Divider />
    </View>
  );
};

export default EmployeeProfileOptions;
