import {View, FlatList, Image} from 'react-native';
import React, {useEffect} from 'react';
import {Text, Button} from 'react-native-paper';
import {useAppSelector} from '../../services/api-services/redux/hooks';
import {useAppDispatch} from '../../services/api-services/redux/hooks';
import {styles} from './styles.screen';
import LinearGradient from 'react-native-linear-gradient';
import {screenNames} from '../index.screens';
import LoadingIndicator from '../../components/loading-indicator/index.component';

const EmployeeHomeScreen = ({navigation}: any) => {
  const {orders} = useAppSelector((state: any) => state.orderReducer);
  const {user} = useAppSelector((state: any) => state.userReducer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch({
      type: 'getOrders',
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orders]);

  if (!user) {
    <LoadingIndicator text="Getting EMployee Info" />;
  }

  if (user) {
    return (
      <LinearGradient
        colors={['#0260FB', '#0343AE', '#000000']}
        start={{x: 0.6, y: 0.3}}
        end={{x: 0.3, y: 0.6}}
        style={styles.container}>
        <View style={styles.topContainer}>
          <Text variant="titleLarge" style={[styles.text]}>
            Hello {user.firstName}
          </Text>
          <View style={styles.totalText}>
            <Text
              variant="titleLarge"
              style={[styles.text, styles.topContainerText]}>
              Total Orders:
            </Text>
            <Text variant="titleLarge" style={styles.textTotal}>
              {orders.length}
            </Text>
          </View>
        </View>
        <View style={styles.bottomContainer}>
          <Text variant="titleLarge" style={[styles.text, styles.orderTitle]}>
            Orders:
          </Text>
          <FlatList
            data={orders}
            contentContainerStyle={styles.flatListOrder}
            renderItem={({item}) => {
              return (
                <Button
                  onPress={() =>
                    navigation.navigate(screenNames.orderDetails, {order: item})
                  }>
                  <View style={styles.orderContainer}>
                    <Text style={[styles.text, styles.orderText]}>
                      Order ID: {item.id}
                    </Text>
                    <Text style={[styles.text, styles.orderText]}>
                      Email: {item.customerEmail}
                    </Text>
                  </View>
                </Button>
              );
            }}
          />
        </View>
        <Image
          source={require('../../../assets/LR.png')}
          style={styles.image}
        />
      </LinearGradient>
    );
  }
};
export default EmployeeHomeScreen;
